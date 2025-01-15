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

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
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

  async assignUserToTask(taskId: string, userId: string): Promise<Task> {
    const task = await this.findTaskById(taskId);
    const user = await this.findUserById(userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!task.assignedUserIds.includes(userId)) {
      task.assignedUserIds = [...task.assignedUserIds, userId];
      await this.tasksRepository.save(task);

      const assignment = new TaskAssignment();
      assignment.task = task;
      assignment.user = user;
      await this.taskAssignmentRepository.save(assignment);
    }

    return task;
  }

  async assignMultipleUsersToTask(
    taskId: string,
    userIds: string[],
  ): Promise<Task> {
    const task = await this.findTaskById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Find all users (both to be added and removed)
    const allRelevantUsers = await this.usersRepository.find({
      where: { id: In([...task.assignedUserIds, ...userIds]) },
    });

    // Update the task's assignedUserIds
    task.assignedUserIds = userIds;
    await this.tasksRepository.save(task);

    // Remove old assignments
    await this.taskAssignmentRepository.delete({
      task: { id: taskId },
      user: {
        id: In(task.assignedUserIds.filter((id) => !userIds.includes(id))),
      },
    });

    // Add new assignments
    const newAssignments = userIds
      .filter((id) => !task.assignedUserIds.includes(id))
      .map((id) => {
        const user = allRelevantUsers.find((u) => u.id === id);
        const assignment = new TaskAssignment();
        assignment.task = task;
        assignment.user = user;
        return assignment;
      });

    if (newAssignments.length > 0) {
      await this.taskAssignmentRepository.save(newAssignments);
    }

    return task;
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
      select: ['id', 'username'], // Only select the fields we need
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
