import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(newTask);
  }

  async findByTaskCode(taskCode: string): Promise<Task> {
    const sequenceNumber = parseInt(taskCode.split('-')[1], 10);
    return this.tasksRepository.findOne({ where: { sequenceNumber } });
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { sequenceNumber: id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Merge the updateTaskDto with the existing task
    const updatedTask = this.tasksRepository.merge(task, updateTaskDto);

    // Save the updated task
    return await this.tasksRepository.save(updatedTask);
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
