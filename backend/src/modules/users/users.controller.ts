import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /*   @Post(':id/profile')
  @ApiOperation({ summary: 'Create a user profile' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        theme: { type: 'string' },
        avatarUrl: { type: 'string' },
      },
    },
  })
  createProfile(
    @Param('id') id: string,
    @Body('theme') theme: string,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.usersService.createProfile(+id, theme, avatarUrl);
  } */

  @Patch(':id/profile')
  @ApiOperation({ summary: 'Update a user profile' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        theme: { type: 'string' },
        avatarUrl: { type: 'string' },
      },
    },
  })
  updateProfile(
    @Param('id') id: string,
    @Body('theme') theme: string,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.usersService.updateProfile(+id, { theme, avatarUrl });
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get a user profile by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(+id);
  }
}
