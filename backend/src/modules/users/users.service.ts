import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const USER_SELECT_FIELDS: (keyof User)[] = ['id', 'name', 'username', 'group'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  findAll(): Promise<Partial<User[]>> {
    return this.usersRepository.find({
      select: USER_SELECT_FIELDS,
    });
  }

  findOne(id: number): Promise<Partial<User | null>> {
    return this.usersRepository.findOne({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'name', 'username', 'group', 'password'],
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async createProfile(
    userId: number,
    theme: string,
    avatarUrl: string,
  ): Promise<UserProfile> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    const profile = this.userProfileRepository.create({
      user,
      theme,
      avatarUrl,
    });
    return this.userProfileRepository.save(profile);
  }

  async getProfile(userId: number): Promise<UserProfile> {
    return this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      select: ['id', 'theme', 'avatarUrl'],
    });
  }
}
