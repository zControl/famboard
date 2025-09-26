import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/health/health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  exports: [TerminusModule],
})
export class HealthModule {}
