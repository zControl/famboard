import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskApproval } from '../task-approvals/entities/task-approval.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { AssignedUserDto } from './dto/assigned-user.dto';
import { TaskAssignmentDetailDto } from './dto/task-assignment-detail.dto';
import { TaskAssignment } from './entities/task-assignment.entity';

@Injectable()
export class TaskAssignmentsService {
  constructor(
    @InjectRepository(TaskAssignment)
    private taskAssignmentRepository: Repository<TaskAssignment>,
    @InjectRepository(TaskApproval)
    private taskApprovalRepository: Repository<TaskApproval>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

    for (const userId of usersToRemove) {
      // Delete the assignment
      await this.taskAssignmentRepository.delete({
        task: { id: taskId },
        user: { id: userId },
      });

      // Also update any approvals related to this assignment.
      await this.taskApprovalRepository.update(
        {
          task: { id: taskId },
          user: { id: userId },
          status: 'PENDING_APPROVAL'
        },
        { status: 'REJECTED', note: 'User unassigned from task' }
      );
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

  async findAssignedUsersByTask(taskId: string): Promise<AssignedUserDto[]> {
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

  async findAssignedTasksByUser(
    userId: string,
  ): Promise<TaskAssignmentDetailDto[]> {
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
    await this.findUserById(userId);

    const assignments = await this.taskAssignmentRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    });

    return assignments.map((assignment) => assignment.task);
  }

  async assignTasksToUser(userId: string, taskIds: string[]): Promise<User> {
    const user = await this.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create assignments for all requested tasks
    const newAssignments = await Promise.all(
      taskIds.map(async (taskId) => {
        const task = await this.findTaskById(taskId);
        const assignment = new TaskAssignment();
        assignment.task = task;
        assignment.user = user;
        assignment.assignedAt = new Date();
        return assignment;
      }),
    );

    // Save all assignments (database will handle duplicates gracefully)
    await this.taskAssignmentRepository.save(newAssignments);

    // Return the updated user
    return this.findUserById(userId);
  }

  async deleteAssignmentsByTask(taskId: string): Promise<void> {
    await this.taskAssignmentRepository.delete({ task: { id: taskId } });
  }
}
