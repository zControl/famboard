import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { HealthModule } from 'src/modules/health/health.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    DatabaseModule,
    HealthModule,
    UsersModule,
    AuthModule,
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
