import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowanceController } from 'src/modules/allowance/allowance.controller';
import { AllowanceService } from 'src/modules/allowance/allowance.service';
import { AllowanceLedger } from 'src/modules/allowance/entities/allowance-ledger.entity';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, AllowanceLedger])],
  controllers: [AllowanceController],
  providers: [AllowanceService],
  exports: [AllowanceService],
})
export class AllowanceModule {}
