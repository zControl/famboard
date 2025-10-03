import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCompletion } from 'src/modules/tasks/entities/task-completion.entity';
import { TaskCompletionService } from 'src/modules/tasks/task-completion.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { TaskAssignment } from './entities/task-assignment.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User, TaskAssignment, TaskCompletion]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskCompletionService],
  exports: [TasksService],
})
export class TasksModule {}
