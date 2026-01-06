import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { HealthModule } from 'src/modules/health/health.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { AppController } from './app.controller';
import { AllowanceModule } from './modules/allowance/allowance.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { TaskApprovalsModule } from './modules/task-approvals/task-approvals.module';
import { TaskAssignmentsModule } from './modules/task-assignments/task-assignments.module';
import { TaskCompletionsModule } from './modules/task-completions/task-completions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    TasksModule,
    TaskAssignmentsModule,
    TaskApprovalsModule,
    TaskCompletionsModule,
    CommentsModule,
    RewardsModule,
    AllowanceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
