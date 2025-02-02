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
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<User>) {
    try {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      // Update the last login time
      await this.usersService.updateLastLogin(user.id);

      const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        group: user.group,
      };
      // Remove undefined properties
      Object.keys(userResponse).forEach(
        (key) => userResponse[key] === undefined && delete userResponse[key],
      );
      return {
        accessToken,
        user: userResponse,
      };
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Failed to generate access token');
    }
  }

  async register(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersService.checkUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    try {
      // Create new user
      const newUser = await this.usersService.create(createUserDto);
      return {
        message: 'User registered successfully',
        user: {
          username: newUser.username,
          email: newUser.email,
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
