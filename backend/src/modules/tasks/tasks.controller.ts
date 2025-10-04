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
import { ApproveTaskCompletionDto } from 'src/modules/tasks/dto/approve-task-completion.dto';
import { TaskCompletionResponseDto } from 'src/modules/tasks/dto/complete-task-response.dto';
import { CompleteTaskDto } from 'src/modules/tasks/dto/complete-task.dto';
import { PendingCompletionResponseDto } from 'src/modules/tasks/dto/pending-completion-response.dto';
import { RejectTaskCompletionDto } from 'src/modules/tasks/dto/reject-task-completion.dto';
import { TaskToMultipleUsersDto } from 'src/modules/tasks/dto/task-to-multiple-users.dto';
import { TaskCompletionService } from 'src/modules/tasks/task-completion.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskCompletionService: TaskCompletionService,
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

  @Get(':sequenceNumber')
  @ApiOperation({ summary: 'Get a task by Sequence Number' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findBySequenceNumber(@Param('sequenceNumber') sequenceNumber: string) {
    return this.tasksService.findTaskBySequenceNumber(sequenceNumber);
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
    const completion = await this.taskCompletionService.completeTask(
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

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks assigned to a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  findTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.findTasksByUser(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('completions/pending')
  @ApiOperation({ summary: 'Get tasks that are pending approval.' })
  @ApiResponse({
    status: 200,
    description: 'Returns all pending task completions',
    type: PendingCompletionResponseDto,
    isArray: true,
  })
  async getPendingCompletions() {
    const completions = await this.taskCompletionService.getPendingApprovals();
    return {
      count: completions.length,
      data: completions.map(
        (completion) => new PendingCompletionResponseDto(completion),
      ),
    };
  }

  @Patch('completions/:approvalId/approve')
  @ApiOperation({ summary: 'Approve a task completion' })
  @ApiResponse({
    status: 200,
    description: 'Task completion approved',
  })
  @ApiBody({ type: ApproveTaskCompletionDto })
  async approveTaskCompletion(
    @Param('approvalId') approvalId: string,
    @Body() approveDto: ApproveTaskCompletionDto,
  ) {
    const completion = await this.taskCompletionService.approveTaskCompletion(
      approvalId,
      approveDto.parentId,
      approveDto.note,
    );

    return {
      message: 'Task completion approved!',
      data: new TaskCompletionResponseDto(completion),
    };
  }

  @Patch('completions/:completionId/reject')
  @ApiOperation({ summary: 'Reject a task completion' })
  @ApiResponse({
    status: 200,
    description: 'Task completion rejected',
  })
  @ApiBody({ type: RejectTaskCompletionDto })
  async rejectTaskCompletion(
    @Param('completionId') completionId: string,
    @Body() rejectDto: RejectTaskCompletionDto,
  ) {
    const completion = await this.taskCompletionService.rejectTaskCompletion(
      completionId,
      rejectDto.parentId,
      rejectDto.note,
    );

    return {
      message: 'Task completion rejected',
      data: new TaskCompletionResponseDto(completion),
    };
  }
}
