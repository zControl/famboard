import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskApproval } from '../task-approvals/entities/task-approval.entity';
import { TaskAssignment } from '../task-assignments/entities/task-assignment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { TaskCompletionsController } from './task-completions.controller';
import { TaskCompletionsService } from './task-completions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskApproval, TaskAssignment, Task, User]),
  ],
  controllers: [TaskCompletionsController],
  providers: [TaskCompletionsService],
  exports: [TaskCompletionsService],
})
export class TaskCompletionsModule {}
