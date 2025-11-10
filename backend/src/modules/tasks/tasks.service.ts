import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedUserDto } from 'src/modules/tasks/dto/assigned-user.dto';
import { TaskAssignmentDetailDto } from 'src/modules/tasks/dto/task-assignment-detail.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { TaskAssignment } from 'src/modules/tasks/entities/task-assignment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
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

  async findUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException(`User with ID "${userId}" not found`);
    return user;
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
    // First, delete all task assignments related to this task
    await this.taskAssignmentRepository.delete({ task: { id: taskId } });

    // Then delete the task and return appropriate message
    const result = await this.tasksRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return { message: `Task with ID ${taskId} successfully deleted` };
  }

  async assignUsersToTask(taskId: string, userIds: string[]): Promise<Task> {
    const task = await this.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Get existing assignments
    const existingAssignments = await this.taskAssignmentRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
    });

    // Determine users to add and remove
    const existingUserIds = existingAssignments.map(
      (assignment) => assignment.user.id,
    );
    const usersToAdd = userIds.filter((id) => !existingUserIds.includes(id));
    const usersToRemove = existingUserIds.filter((id) => !userIds.includes(id));

    // Remove old assignments
    if (usersToRemove.length > 0) {
      await this.taskAssignmentRepository.delete({
        task: { id: taskId },
        user: { id: In(usersToRemove) },
      });
    }

    // Add new assignments
    if (usersToAdd.length > 0) {
      const newAssignments = await Promise.all(
        usersToAdd.map(async (userId) => {
          const user = await this.findUserById(userId);
          const assignment = new TaskAssignment();
          assignment.task = task;
          assignment.user = user;
          assignment.assignedAt = new Date();
          return assignment;
        }),
      );

      await this.taskAssignmentRepository.save(newAssignments);
    }

    // Fetch and return the updated task
    return this.findTaskById(taskId);
  }

  async findAssignedUsers(taskId: string): Promise<AssignedUserDto[]> {
    const task = await this.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const assignments = await this.taskAssignmentRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
    });

    return assignments.map((assignment) => ({
      id: assignment.user.id,
      username: assignment.user.username,
    }));
  }

  async findAssignedTasks(userId: string): Promise<TaskAssignmentDetailDto[]> {
    // First check if the user exists
    // If user doesn't exist, findUserById will throw a NotFoundException
    // Otherwise, continue with finding tasks
    await this.findUserById(userId);

    const assignments = await this.taskAssignmentRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    });

    return assignments.map(
      (assignment) => new TaskAssignmentDetailDto(assignment),
    );
  }

  async findUsersByTask(taskId: string): Promise<User[]> {
    const task = await this.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const assignments = await this.taskAssignmentRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
    });

    return assignments.map((assignment) => assignment.user);
  }

  async findTasksByUser(userId: string): Promise<Task[]> {
    // First check if the user exists
    // If user doesn't exist, findUserById will throw a NotFoundException
    // Otherwise, continue with finding tasks
    await this.findUserById(userId);

    const assignments = await this.taskAssignmentRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    });

    return assignments.map((assignment) => assignment.task);
  }
}
