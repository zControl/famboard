import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskToMultipleUsersDto } from './dto/task-to-multiple-users.dto';
import { TasksToUserDto } from './dto/tasks-to-user.dto';
import { TaskAssignmentsService } from './task-assignments.service';

@ApiTags('Task Assignments')
@Controller('task-assignments')
export class TaskAssignmentsController {
  constructor(
    private readonly taskAssignmentsService: TaskAssignmentsService,
  ) {}

  @Get('assigned-users/:taskId')
  @ApiOperation({ summary: 'Get all users that are assigned to a task' })
  @ApiResponse({
    status: 200,
    description: 'Assigned users retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  getAssignedUsers(@Param('taskId') taskId: string) {
    return this.taskAssignmentsService.findAssignedUsersByTask(taskId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('assigned-tasks/:userId')
  @ApiOperation({ summary: 'Get task assignment details for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Task assignments retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getAssignedTasks(@Param('userId') userId: string) {
    const tasks = await this.taskAssignmentsService.findAssignedTasksByUser(userId);
    return {
      count: tasks.length,
      data: tasks,
    };
  }

  @Get('user/:userId/tasks')
  @ApiOperation({ summary: 'Get an array of task objects for a specific user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getTasksByUser(@Param('userId') userId: string) {
    return this.taskAssignmentsService.findTasksByUser(userId);
  }

  @Post('tasks/:taskId/assign')
  @ApiOperation({ summary: 'Assign multiple users to a task' })
  @ApiBody({ type: TaskToMultipleUsersDto })
  async assignUsersToTask(
    @Param('taskId') taskId: string,
    @Body() body: { userIds: string[] },
  ) {
    return this.taskAssignmentsService.assignUsersToTask(taskId, body.userIds);
  }

  @Post('users/:userId/assign-tasks')
  @ApiOperation({ summary: 'Assign multiple tasks to a user' })
  @ApiBody({ type: TasksToUserDto })
  @ApiResponse({ status: 200, description: 'Tasks assigned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async assignTasksToUser(
    @Param('userId') userId: string,
    @Body() body: TasksToUserDto,
  ) {
    return this.taskAssignmentsService.assignTasksToUser(userId, body.taskIds);
  }
}
