import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PartialUserProfileDto } from 'src/modules/users/dto/user-profile.dto';
import { User, UserGroup } from 'src/modules/users/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('group/:group')
  @ApiOperation({ summary: 'Get the ids of all users in the specified group' })
  @ApiParam({ name: 'group', description: 'User group' })
  async getIdsByGroup(@Param('group') group: string): Promise<User[]> {
    if (!Object.values(UserGroup).includes(group as UserGroup)) {
      throw new BadRequestException(`Invalid user group: ${group}`);
    }
    return this.usersService.findByGroup(group as UserGroup);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/profile')
  @ApiOperation({ summary: 'Update a user profile' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    type: PartialUserProfileDto,
    description: 'Partial user profile data to update',
    examples: {
      partialUpdate: {
        value: {
          firstName: 'John',
          status: 'Available',
          theme: 'dark',
        },
      },
    },
  })
  updateProfile(
    @Param('id') id: string,
    @Body() updatedProfile: PartialUserProfileDto,
  ) {
    return this.usersService.updateProfile(id, updatedProfile);
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get a user profile by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  getProfile(@Param('id') userId: string) {
    return this.usersService.getProfile(userId);
  }
}
