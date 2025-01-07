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
import { AssignTaskDto } from 'src/modules/tasks/dto/assign-task.dto';
import { TaskAssignedUsersDto } from 'src/modules/tasks/dto/task-assigned-users.dto';
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

  @Get(':taskId/users')
  @ApiOperation({ summary: 'Get users assigned to a specific task' })
  async getUsersForTask(
    @Param('taskId') taskId: string,
  ): Promise<TaskAssignedUsersDto[]> {
    return this.tasksService.findUsersByTask(taskId);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post('assign')
  @ApiOperation({ summary: 'Assign a task to a user' })
  @ApiResponse({ status: 200, description: 'Task assigned successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: AssignTaskDto })
  assignTask(@Body() assignTaskDto: AssignTaskDto) {
    /* if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated');
    } */
    /* for now, we are just manually assigning the admin user id for the assigner.
     */
    const testAssignerId = 'e62046b0-282f-429e-b6c5-c01740fc5502';
    return this.tasksService.assignTask(assignTaskDto, testAssignerId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks assigned to a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  findTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.findTasksByUser(userId);
  }
}
