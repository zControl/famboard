import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from '../users/users.service';

export type ValidatedUser = Omit<User, 'password'> | null;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    console.log('Found user:', user ? 'Yes' : 'No');
    if (user) {
      console.log('Stored hashed password:', user.password);
      console.log('Provided password:', password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);
      if (isPasswordValid) {
        const { ...result } = user;
        return result;
      }
    }
    /*     if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      console.log(result);
      return result;
    } */
    return null;
  }

  async login(user: Partial<User>) {
    try {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Failed to generate access token');
    }
  }

  async register(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    try {
      // Create new user
      const newUser = await this.usersService.create(createUserDto);
      return {
        message: 'User registered successfully',
        user: {
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
          group: newUser.group,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while registering user: ${error.message}`,
      );
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
