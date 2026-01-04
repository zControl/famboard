import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/modules/rewards/entities/reward.entity';
import { PointsService } from './points.service';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardsController],
  providers: [RewardsService, PointsService],
  exports: [RewardsService, PointsService],
})
export class RewardsModule {}
