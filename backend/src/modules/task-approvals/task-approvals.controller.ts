import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApprovalDto } from './dto/approval.dto';
import { TaskActionBodyDto } from './dto/task-action-body.dto';
import { TaskApprovalsService } from './task-approvals.service';

@ApiTags('Task Approvals')
@Controller('task-approvals')
export class TaskApprovalsController {
  constructor(private readonly taskApprovalsService: TaskApprovalsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get all approvals' })
  @ApiResponse({
    status: 200,
    description: 'Returns all approvals',
    type: ApprovalDto,
    isArray: true,
  })
  async getAllApprovals() {
    const approvals = await this.taskApprovalsService.getAllApprovals();
    return {
      count: approvals.length,
      data: approvals.map((approval) => new ApprovalDto(approval)),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('pending')
  @ApiOperation({ summary: 'Get tasks that are pending approval' })
  @ApiResponse({
    status: 200,
    description: 'Returns all tasks that are pending approval',
    type: ApprovalDto,
    isArray: true,
  })
  async getPendingApprovals() {
    const approvals = await this.taskApprovalsService.getPendingApprovals();
    return {
      count: approvals.length,
      data: approvals.map((approval) => new ApprovalDto(approval)),
    };
  }

  @Get('counts/:period/:userId')
  @ApiOperation({ summary: 'Get count of approved within specified period for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Returns approval counts for the specified period',
  })
  async getApprovalCounts(
    @Param('period') period: 'daily' | 'weekly' | 'monthly',
    @Param('userId') userId: string
  ) {
    return this.taskApprovalsService.getApprovalCountsByPeriod(period, userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get tasks that are pending approval for a specific user',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns all pending task pending approvals for a specific user',
    type: ApprovalDto,
    isArray: true,
  })
  async getPendingCompletionsByUser(@Param('userId') userId: string) {
    const approvals =
      await this.taskApprovalsService.getPendingApprovalsByUser(userId);
    return {
      count: approvals.length,
      data: approvals.map((approval) => new ApprovalDto(approval)),
    };
  }

  @Patch(':approvalId/approve')
  @ApiOperation({ summary: 'Approve a task' })
  @ApiResponse({
    status: 200,
    description: 'Task has been approved',
  })
  @ApiBody({ type: TaskActionBodyDto })
  async approveTask(
    @Param('approvalId') approvalId: string,
    @Body() approveDto: TaskActionBodyDto,
  ) {
    await this.taskApprovalsService.approveTask(
      approvalId,
      approveDto.parentId,
      approveDto.bonusPoints,
      approveDto.note,
    );

    return {
      message: 'Task approved!',
    };
  }

  @Patch(':approvalId/reject')
  @ApiOperation({ summary: 'Reject a task' })
  @ApiResponse({
    status: 200,
    description: 'Task rejected',
  })
  @ApiBody({ type: TaskActionBodyDto })
  async rejectTask(
    @Param('approvalId') approvalId: string,
    @Body() rejectDto: TaskActionBodyDto,
  ) {
    await this.taskApprovalsService.rejectTask(approvalId, rejectDto.note);

    return {
      message: 'Task rejected',
    };
  }
}
