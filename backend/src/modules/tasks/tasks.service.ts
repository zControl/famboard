import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskApprovalsService } from '../task-approvals/task-approvals.service';
import { TaskAssignmentsService } from '../task-assignments/task-assignments.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private taskAssignmentsService: TaskAssignmentsService,
    private taskApprovalsService: TaskApprovalsService,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({
      relations: ['assignments', 'assignments.user'],
      select: {
        id: true,
        sequenceNumber: true,
        title: true,
        description: true,
        pointValue: true,
        category: true,
        frequency: true,
        note: true,
        createdAt: true,
        updatedAt: true,
        assignments: {
          id: true,
          assignedAt: true,
          status: true,
          user: {
            id: true,
          },
        },
      },
    });
  }

  async findTaskBySequenceNumber(sequenceNumber: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { sequenceNumber: parseInt(sequenceNumber, 10) },
    });
    if (!task)
      throw new NotFoundException(
        `Task with sequence number "${sequenceNumber}" not found`,
      );
    return task;
  }

  async findTaskById(taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task)
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Merge the updateTaskDto with the existing task
    const updatedTask = this.tasksRepository.merge(task, updateTaskDto);

    // Save the updated task
    return await this.tasksRepository.save(updatedTask);
  }

  async remove(taskId: string): Promise<{ message: string }> {
    // First, delete all task assignments and approvals related to this task
    await this.taskAssignmentsService.deleteAssignmentsByTask(taskId);
    await this.taskApprovalsService.deleteApprovalsByTask(taskId);

    // Then delete the task and return appropriate message
    const result = await this.tasksRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return { message: `Task with ID ${taskId} successfully deleted` };
  }
}
