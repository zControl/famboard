import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowanceService } from 'src/modules/allowance/allowance.service';

@ApiTags('Allowance')
@Controller('allowance')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post('cashout')
  @ApiOperation({ summary: 'Convert current kid points into whole-dollar allowance' })
  @ApiResponse({ status: 200, description: 'Allowance cashout executed' })
  async cashout() {
    const results = await this.allowanceService.cashoutAllKids();
    return {
      count: results.length,
      data: results,
    };
  }

  @Post('cashout/:userId')
  @ApiOperation({ summary: 'Convert current points for a single kid into whole-dollar allowance' })
  @ApiResponse({ status: 200, description: 'Allowance cashout executed for the specified user' })
  async cashoutKid(@Param('userId') userId: string) {
    const result = await this.allowanceService.cashoutKid(userId);
    return {
      data: result,
    };
  }
}
