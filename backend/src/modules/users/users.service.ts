import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const USER_SELECT_FIELDS: (keyof User)[] = ['id', 'name', 'username', 'group'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      select: USER_SELECT_FIELDS,
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
}
