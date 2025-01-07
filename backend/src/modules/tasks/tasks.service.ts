import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignTaskDto } from 'src/modules/tasks/dto/assign-task.dto';
import { TaskAssignedUsersDto } from 'src/modules/tasks/dto/task-assigned-users.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { UserAssignedTasksDto } from 'src/modules/tasks/dto/user-assigned-tasks.dto';
import { TaskAssignment } from 'src/modules/tasks/entities/task-assignment.entity';
import { User, UserGroup } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(TaskAssignment)
    private taskAssignmentRepository: Repository<TaskAssignment>,
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

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
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

  async findTasksByUser(userId: string): Promise<UserAssignedTasksDto[]> {
    const taskAssignments = await this.taskAssignmentRepository
      .createQueryBuilder('taskAssignment')
      .innerJoinAndSelect('taskAssignment.task', 'task')
      .where('taskAssignment.userId = :userId', { userId })
      .getMany();

    return taskAssignments.map((assignment) => ({
      taskId: assignment.task.id,
      taskTitle: assignment.task.title,
    }));
  }

  async findUsersByTask(taskId: string): Promise<TaskAssignedUsersDto[]> {
    const userAssignments = await this.taskAssignmentRepository
      .createQueryBuilder('taskAssignment')
      .innerJoinAndSelect('taskAssignment.user', 'user')
      .where('taskAssignment.taskId = :taskId', { taskId })
      .getMany();

    return userAssignments.map((assignment) => ({
      assignmentId: assignment.id,
      userId: assignment.user.id,
      userName: assignment.user.username,
    }));
  }

  async assignTask(
    assignTaskDto: AssignTaskDto,
    assignerId: string,
  ): Promise<{ message: string }> {
    const task = await this.tasksRepository.findOne({
      where: { id: assignTaskDto.taskId },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const assigner = await this.usersRepository.findOne({
      where: { id: assignerId },
    });
    if (
      !assigner ||
      (assigner.group !== UserGroup.ADMIN &&
        assigner.group !== UserGroup.PARENT)
    ) {
      throw new ForbiddenException('You are not authorized to assign tasks');
    }

    const users = await this.usersRepository.findByIds(assignTaskDto.userIds);
    const kidUsers = users.filter((user) => user.group === UserGroup.KID);

    if (kidUsers.length !== assignTaskDto.userIds.length) {
      throw new BadRequestException(
        'All assigned users must be in the KID group',
      );
    }

    const assignments = kidUsers.map((user) => {
      const assignment = new TaskAssignment();
      assignment.task = task;
      assignment.user = user;
      return assignment;
    });

    await this.taskAssignmentRepository.save(assignments);

    return {
      message: 'Task assigned successfully',
    };
  }
}
