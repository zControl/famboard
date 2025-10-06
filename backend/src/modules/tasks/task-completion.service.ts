import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PendingCompletionResponseDto } from 'src/modules/tasks/dto/pending-completion-response.dto';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { TaskCompletion } from './entities/task-completion.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskCompletionService {
  constructor(
    @InjectRepository(TaskCompletion)
    private taskCompletionRepository: Repository<TaskCompletion>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async completeTask(
    taskId: string,
    userId: string,
    pointsPossible?: number,
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
    taskCompletion.pointsPossible = pointsPossible;
    taskCompletion.note = note || '';

    // Save and return the task completion
    return this.taskCompletionRepository.save(taskCompletion);
  }

  // Get all task completions with PENDING_APPROVAL status
  async getPendingApprovals(): Promise<PendingCompletionResponseDto[]> {
    const completions = this.taskCompletionRepository.find({
      where: { status: 'PENDING_APPROVAL' },
      relations: ['task', 'user'],
      select: {
        id: true,
        completedAt: true,
        note: true,
        status: true,
        pointsPossible: true,
        task: {
          id: true,
          title: true,
          description: true,
          pointValue: true,
        },
        user: {
          id: true,
        },
      },
    });
    return (await completions).map(
      (completion) => new PendingCompletionResponseDto(completion),
    );
  }

  /**
   * Approve a task completion
   * @param completionId ID of the task completion to approve
   * @param parentId ID of the parent approving the task
   * @param pointsAwarded Optional points to award (defaults to task's point value)
   * @param note Optional note from the parent
   */
  async approveTaskCompletion(
    approvalId: string,
    parentId: string,
    note?: string,
  ): Promise<TaskCompletion> {
    // Find the task completion
    const completion = await this.taskCompletionRepository.findOne({
      where: { id: approvalId },
      relations: ['task', 'user'],
    });

    if (!completion) {
      throw new NotFoundException(
        `Task completion with ID "${approvalId}" not found`,
      );
    }

    if (completion.status !== 'PENDING_APPROVAL') {
      throw new BadRequestException(`Task completion is not pending approval`);
    }

    // Find the parent user
    const parent = await this.usersRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    // Update the task completion
    completion.status = 'APPROVED';
    completion.approvedBy = parent;
    completion.approvedAt = new Date();

    // Handle points
    // TODO: #154 - Create the structure for bonus points being awarded.
    if (completion.pointsPossible) {
      completion.pointsAwarded = completion.pointsPossible;
    } else if (completion.task.pointValue) {
      completion.pointsAwarded = completion.task.pointValue;
    }

    if (note) {
      completion.note = note;
    }

    // Use the transactional entity manager to update user profile with points awarded
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      // Save completion
      await transactionalEntityManager.save(completion);

      // Update user profile
      const userProfile = await transactionalEntityManager.findOne(
        UserProfile,
        {
          where: { userId: completion.user.id },
        },
      );
      if (userProfile) {
        userProfile.pointTotal =
          (userProfile.pointTotal || 0) + completion.pointsAwarded;
        await transactionalEntityManager.save(userProfile);
      }
    });

    // Save the updated completion
    return this.taskCompletionRepository.save(completion);
  }

  /**
   * Reject a task completion
   * @param approvalId ID of the task completion to reject
   * @param parentId ID of the parent rejecting the task
   * @param note Reason for rejection
   */
  async rejectTaskCompletion(
    approvalId: string,
    parentId: string,
    note: string,
  ): Promise<TaskCompletion> {
    // Find the task completion
    const completion = await this.taskCompletionRepository.findOne({
      where: { id: approvalId },
      relations: ['task', 'user'],
    });

    if (!completion) {
      throw new NotFoundException(
        `Task completion with ID "${approvalId}" not found`,
      );
    }

    if (completion.status !== 'PENDING_APPROVAL') {
      throw new BadRequestException(`Task completion is not pending approval`);
    }

    // Find the parent user
    const parent = await this.usersRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    // Update the task completion
    completion.status = 'REJECTED';
    completion.note = note;

    // Save the updated completion
    return this.taskCompletionRepository.save(completion);
  }

  async getPendingApprovalsByUser(
    userId: string,
  ): Promise<PendingCompletionResponseDto[]> {
    const completions = this.taskCompletionRepository.find({
      where: {
        status: 'PENDING_APPROVAL',
        user: { id: userId },
      },
      relations: ['task', 'user'],
      select: {
        id: true,
        completedAt: true,
        note: true,
        status: true,
        pointsPossible: true,
        task: {
          id: true,
          title: true,
          description: true,
          pointValue: true,
        },
        user: {
          id: true,
        },
      },
    });
    return (await completions).map(
      (completion) => new PendingCompletionResponseDto(completion),
    );
  }
}
