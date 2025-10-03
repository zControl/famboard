// backend/src/modules/tasks/task-completion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { TaskCompletion } from './entities/task-completion.entity';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Injectable()
export class TaskCompletionService {
  constructor(
    @InjectRepository(TaskCompletion)
    private taskCompletionRepository: Repository<TaskCompletion>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tasksService: TasksService,
  ) {}

  async completeTask(
    taskId: string,
    userId: string,
    note?: string,
  ): Promise<TaskCompletion> {
    // Find the task
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }

    // Find the user
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Create a new task completion record
    const taskCompletion = new TaskCompletion();
    taskCompletion.task = task;
    taskCompletion.user = user;
    taskCompletion.completedAt = new Date();
    taskCompletion.status = 'PENDING_APPROVAL';
    taskCompletion.note = note;

    // Save and return the task completion
    return this.taskCompletionRepository.save(taskCompletion);
  }
}
