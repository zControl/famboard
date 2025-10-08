import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskApproval } from 'src/modules/tasks/entities/task-approval.entity';
import { TaskApprovalService } from 'src/modules/tasks/task-approval.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { TaskAssignment } from './entities/task-assignment.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User, TaskAssignment, TaskApproval]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskApprovalService],
  exports: [TasksService],
})
export class TasksModule {}
