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
import { CompleteTaskDto } from 'src/modules/tasks/dto/complete-task.dto';
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
  async getAllTasks() {
    const tasks = await this.tasksService.findAll();
    return {
      count: tasks.length,
      data: tasks,
    };
  }

  @Get('by-sequence/:sequenceNumber')
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

  @Get('assigned-users/:taskId')
  @ApiOperation({ summary: 'Get all users that are assigned to a task' })
  @ApiResponse({
    status: 200,
    description: 'Assigned tasks retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getAssignedUsers(@Param('taskId') taskId: string) {
    return this.tasksService.getAssignedUsers(taskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks assigned to a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
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
    description: 'Task marked as complete!',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiBody({ type: CompleteTaskDto })
  async completeTask(
    @Param('taskId') taskId: string,
    @Body() completeTaskDto: CompleteTaskDto,
  ) {
    console.log('Received DTO:', completeTaskDto);
    await this.taskApprovalService.completeTask(
      taskId,
      completeTaskDto.userId,
      completeTaskDto.pointsPossible,
      completeTaskDto.note,
    );
    return {
      message: 'Task marked as complete!',
    };
  }
}
