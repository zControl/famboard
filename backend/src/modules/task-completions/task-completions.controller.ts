import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { TaskCompletionsService } from './task-completions.service';

@ApiTags('Task Completions')
@Controller('task-completions')
export class TaskCompletionsController {
  constructor(
    private readonly taskCompletionsService: TaskCompletionsService,
  ) {}

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
    await this.taskCompletionsService.completeTask(
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
