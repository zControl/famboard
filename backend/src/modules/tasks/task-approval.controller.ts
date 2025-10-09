import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PendingApprovalDto } from 'src/modules/tasks/dto/pending-approval.dto';
import { TaskActionBodyDto } from 'src/modules/tasks/dto/task-action-body.dto';
import { TaskApprovalService } from 'src/modules/tasks/task-approval.service';

@ApiTags('Task Approval')
@Controller('approvals')
export class TaskApprovalController {
  constructor(private readonly taskApprovalService: TaskApprovalService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get tasks that are pending approval' })
  @ApiResponse({
    status: 200,
    description: 'Returns all tasks that are pending approval',
    type: PendingApprovalDto,
    isArray: true,
  })
  async getApprovals() {
    const approvals = await this.taskApprovalService.getPendingApprovals();
    return {
      count: approvals.length,
      data: approvals.map((approval) => new PendingApprovalDto(approval)),
    };
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
    type: PendingApprovalDto,
    isArray: true,
  })
  async getPendingCompletionsByUser(@Param('userId') userId: string) {
    const approvals =
      await this.taskApprovalService.getPendingApprovalsByUser(userId);
    return {
      count: approvals.length,
      data: approvals.map((approval) => new PendingApprovalDto(approval)),
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
    await this.taskApprovalService.approveTask(
      approvalId,
      approveDto.parentId,
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
    await this.taskApprovalService.rejectTask(
      approvalId,
      rejectDto.parentId,
      rejectDto.note,
    );

    return {
      message: 'Task rejected',
    };
  }
}
