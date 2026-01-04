import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsService } from '../rewards/points.service';
import { TaskAssignment } from '../task-assignments/entities/task-assignment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { TaskApproval } from './entities/task-approval.entity';
import { TaskApprovalsController } from './task-approvals.controller';
import { TaskApprovalsService } from './task-approvals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskApproval, TaskAssignment, Task, User]),
  ],
  controllers: [TaskApprovalsController],
  providers: [TaskApprovalsService, PointsService],
  exports: [TaskApprovalsService, TypeOrmModule],
})
export class TaskApprovalsModule {}
