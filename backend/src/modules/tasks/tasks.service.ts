import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedUserDto } from 'src/modules/tasks/dto/assigned-user.dto';
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

  async findByTaskCode(taskCode: string): Promise<Task> {
    const sequenceNumber = parseInt(taskCode.split('-')[1], 10);
    return this.tasksRepository.findOne({ where: { sequenceNumber } });
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
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

  remove(id: string) {
    return `This action removes a #${id} task`;
  }

  async assignUsersToTask(taskId: string, userIds: string[]): Promise<Task> {
    const task = await this.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Update the task's assignedUserIds
    task.assignedUserIds = [...new Set(userIds)]; // Ensure uniqueness
    await this.tasksRepository.save(task);

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

  async getAssignedUsers(taskId: string): Promise<AssignedUserDto[]> {
    const task = await this.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const users = await this.usersRepository.find({
      where: {
        id: In(task.assignedUserIds),
      },
      select: ['id', 'username'],
    });

    return users.map((user) => ({
      id: user.id,
      username: user.username,
    }));
  }

  async findUsersByTask(taskId: string): Promise<User[]> {
    const task = await this.findTaskById(taskId);
    console.log('Task:', task);
    console.log('Assigned User IDs:', task.assignedUserIds);

    if (!task.assignedUserIds || task.assignedUserIds.length === 0) {
      return []; // Return an empty array if no users are assigned
    }
    const users = await this.usersRepository.find({
      where: {
        id: In(task.assignedUserIds),
      },
    });

    console.log('Found Users:', users);

    return users;
  }

  async findTasksByUser(userId: string): Promise<Task[]> {
    const assignments = await this.taskAssignmentRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    });

    return assignments.map((assignment) => assignment.task);
  }

  // This was the old method of assigning a task to multiple users...might not be needed anymore.
  /*   async assignTask(
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
  } */
}
