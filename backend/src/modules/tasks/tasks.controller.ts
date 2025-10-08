import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskCompletionResponseDto } from 'src/modules/tasks/dto/complete-task-response.dto';
import { CompleteTaskDto } from 'src/modules/tasks/dto/complete-task.dto';
import { PendingApprovalDto } from 'src/modules/tasks/dto/pending-approval.dto';
import { TaskActionBodyDto } from 'src/modules/tasks/dto/task-action-body.dto';
import { TaskToMultipleUsersDto } from 'src/modules/tasks/dto/task-to-multiple-users.dto';
import { TaskApprovalService } from 'src/modules/tasks/task-approval.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskApprovalService: TaskApprovalService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService
      .create(createTaskDto)
      .then((task) => {
        return { message: 'Task created successfully', task };
      })
      .catch((error) => {
        throw error;
      });
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tasks not found' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('taskId') taskId: string) {
    return this.tasksService.findTaskById(taskId);
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  update(@Param('taskId') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Get(':taskId/assigned-users')
  @ApiOperation({ summary: 'Get all users that are assigned to a task' })
  async getAssignedUsers(@Param('taskId') taskId: string) {
    return this.tasksService.getAssignedUsers(taskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks assigned to a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  findTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.findTasksByUser(userId);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('taskId') id: string) {
    return this.tasksService.remove(id);
  }

  @Post(':taskId/assign')
  @ApiOperation({ summary: 'Assign multiple users to a task' })
  @ApiBody({ type: TaskToMultipleUsersDto })
  async assignUsersToTask(
    @Param('taskId') taskId: string,
    @Body() body: { userIds: string[] },
  ) {
    return this.tasksService.assignUsersToTask(taskId, body.userIds);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':taskId/complete')
  @ApiOperation({ summary: 'Mark a task as complete (by kid)' })
  @ApiResponse({
    status: 201,
    description: 'Task completion approved!',
    type: TaskCompletionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiBody({ type: CompleteTaskDto })
  async completeTask(
    @Param('taskId') taskId: string,
    @Body() completeTaskDto: CompleteTaskDto,
  ) {
    const completion = await this.taskApprovalService.completeTask(
      taskId,
      completeTaskDto.userId,
      completeTaskDto.pointsPossible,
      completeTaskDto.note,
    );
    return {
      message: 'Task marked as complete!',
      data: new TaskCompletionResponseDto(completion),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('approvals')
  @ApiOperation({ summary: 'Get tasks that are pending approval' })
  @ApiResponse({
    status: 200,
    description: 'Returns all tasks that are pending approval',
    type: PendingApprovalDto,
    isArray: true,
  })
  async getPendingApprovals() {
    const approvals = await this.taskApprovalService.getPendingApprovals();
    return {
      count: approvals.length,
      data: approvals.map((approval) => new PendingApprovalDto(approval)),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('approvals/user/:userId')
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

  @Patch('approvals/:approvalId/approve')
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
    const approval = await this.taskApprovalService.approveTask(
      approvalId,
      approveDto.parentId,
      approveDto.note,
    );

    return {
      message: 'Task approved!',
      data: new TaskCompletionResponseDto(approval),
    };
  }

  @Patch('approvals/:approvalId/reject')
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
    const rejection = await this.taskApprovalService.rejectTask(
      approvalId,
      rejectDto.parentId,
      rejectDto.note,
    );

    return {
      message: 'Task rejected',
      data: new TaskCompletionResponseDto(rejection),
    };
  }
}
