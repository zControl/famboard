import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RewardsService } from './rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rewards' })
  @ApiResponse({ status: 200, description: 'Rewards retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Rewards not found' })
  async getAllRewards() {
    const rewards = await this.rewardsService.findAll();
    return {
      count: rewards.length,
      data: rewards,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new reward' })
  @ApiResponse({ status: 201, description: 'Reward created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get(':rewardId')
  @ApiOperation({ summary: 'Get a reward by ID' })
  @ApiResponse({ status: 200, description: 'Reward retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Reward not found' })
  findOne(@Param('rewardId') id: string) {
    return this.rewardsService.findRewardById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reward by ID' })
  @ApiResponse({ status: 200, description: 'Reward updated successfully' })
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reward by ID' })
  @ApiResponse({ status: 200, description: 'Reward deleted successfully' })
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }
}
