import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskApprovalsModule } from 'src/modules/task-approvals/task-approvals.module';
import { TasksModule } from '../tasks/tasks.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { TaskAssignment } from './entities/task-assignment.entity';
import { TaskAssignmentsController } from './task-assignments.controller';
import { TaskAssignmentsService } from './task-assignments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskAssignment, User]),
    forwardRef(() => TasksModule),
    forwardRef(() => TaskApprovalsModule),
    UsersModule,
  ],
  controllers: [TaskAssignmentsController],
  providers: [TaskAssignmentsService],
  exports: [TaskAssignmentsService, TypeOrmModule],
})
export class TaskAssignmentsModule {}
