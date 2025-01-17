import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskToMultipleUsersDto } from 'src/modules/tasks/dto/task-to-multiple-users.dto';
import { TaskToSingleUserDto } from 'src/modules/tasks/dto/task-to-single-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /*   @Get(':taskId/users')
  @ApiOperation({ summary: 'Get users assigned to a specific task' })
  async getUsersForTask(
    @Param('taskId') taskId: string,
  ): Promise<TaskAssignedUsersDto[]> {
    return this.tasksService.findUsersByTask(taskId);
  } */

  @Get(':taskId/assigned-users')
  async getAssignedUsers(@Param('taskId') taskId: string) {
    return this.tasksService.getAssignedUsers(taskId);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post(':taskId/assign-single')
  @ApiOperation({ summary: 'Assign a user to a task' })
  @ApiBody({ type: TaskToSingleUserDto })
  async assignUserToTask(
    @Param('taskId') taskId: string,
    @Body('userId') userId: string,
  ) {
    return this.tasksService.assignUserToTask(taskId, userId);
  }

  @Post(':taskId/assign-multiple')
  @ApiOperation({ summary: 'Assign multiple users to a task' })
  @ApiBody({ type: TaskToMultipleUsersDto })
  async assignMultipleUsersToTask(
    @Param('taskId') taskId: string,
    @Body('userIds') userIds: string[],
  ) {
    return this.tasksService.assignMultipleUsersToTask(taskId, userIds);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks assigned to a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  findTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.findTasksByUser(userId);
  }
}
