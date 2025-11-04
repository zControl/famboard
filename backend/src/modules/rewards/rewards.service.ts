import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from 'src/modules/rewards/entities/reward.entity';
import { Repository } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const newReward = this.rewardsRepository.create(createRewardDto);
    return await this.rewardsRepository.save(newReward);
  }

  async findAll(): Promise<Reward[]> {
    return await this.rewardsRepository.find();
  }

  async findRewardById(rewardId: string): Promise<Reward> {
    const reward = await this.rewardsRepository.findOne({
      where: { id: rewardId },
    });
    if (!reward)
      throw new NotFoundException(`Reward with ID "${rewardId}" not found`);
    return reward;
  }

  async update(
    rewardId: string,
    updateTaskDto: UpdateRewardDto,
  ): Promise<Reward> {
    const reward = await this.findRewardById(rewardId);

    if (!reward) {
      throw new NotFoundException(`Reward with ID "${rewardId}" not found`);
    }

    // Merge the updateTaskDto with the existing task
    const updatedReward = this.rewardsRepository.merge(reward, updateTaskDto);

    // Save the updated task
    return await this.rewardsRepository.save(updatedReward);
  }

  async remove(rewardId: string): Promise<{ message: string }> {
    const result = await this.rewardsRepository.delete(rewardId);

    if (result.affected === 0) {
      throw new NotFoundException(`Reward with ID "${rewardId}" not found`);
    }

    return { message: `Reward with ID ${rewardId} deleted successfully` };
  }
}
