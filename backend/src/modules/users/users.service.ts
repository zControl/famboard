import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileDto } from 'src/modules/users/dto/user-profile.dto';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserGroup } from './entities/user.entity';

const USER_SELECT_FIELDS: (keyof User)[] = ['id', 'username', 'email'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Partial<User[]>> {
    return this.usersRepository.find({
      select: USER_SELECT_FIELDS,
    });
  }

  findOne(id: string): Promise<Partial<User | null>> {
    return this.usersRepository.findOne({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'group'],
    });
  }

  async findByGroup(group: UserGroup): Promise<User[]> {
    return this.usersRepository.find({
      where: { group },
      select: ['id', 'username'],
    });
  }

  async checkUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['username'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  /**
   * Creates a new user in the database. This method starts a transaction to
   * ensure that either both the user and the user profile are created, or
   * neither are created if an error occurs.
   *
   * @param createUserDto - The data to create a new user with.
   * @returns The newly created user.
   * @throws If an error occurs while creating the user or user profile.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create the user, get the savedUser data
      const user = this.usersRepository.create(createUserDto);
      const savedUser = await queryRunner.manager.save(user);

      // Create the user profile from savedUser with default values
      const defaultProfile = {
        user: savedUser,
        firstName: '',
        bio: 'Not specified...',
        theme: 'light',
        avatarUrl: '/avatars/avatar-default.jpg',
      };
      const profile = this.userProfileRepository.create(defaultProfile);
      await queryRunner.manager.save(profile);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return savedUser;
    } catch (error) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const profile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return {
      userId: profile.user.id,
      username: profile.user.username,
      email: profile.user.email,
      firstName: profile.firstName,
      birthDate: profile.birthDate,
      bio: profile.bio,
      theme: profile.theme,
      avatarUrl: profile.avatarUrl,
    };
  }

  async updateProfile(
    userId: string,
    updatedProfile: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    Object.assign(profile, updatedProfile);
    return this.userProfileRepository.save(profile);
  }
}
