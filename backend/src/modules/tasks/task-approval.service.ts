import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PendingApprovalDto } from 'src/modules/tasks/dto/pending-approval.dto';
import { TaskAssignment } from 'src/modules/tasks/entities/task-assignment.entity';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { TaskApproval } from './entities/task-approval.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskApprovalService {
  constructor(
    @InjectRepository(TaskAssignment)
    private taskAssignmentRepository: Repository<TaskAssignment>,
    @InjectRepository(TaskApproval)
    private taskApprovalRepository: Repository<TaskApproval>,
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
  ): Promise<TaskApproval> {
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

    // Find the assignment
    const assignment = await this.taskAssignmentRepository.findOne({
      where: { task: { id: taskId }, user: { id: userId } },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Task assignment with ID "${taskId}" not found`,
      );
    }

    // Check if there's already a pending approval for this task/user combination
    const existingApproval = await this.taskApprovalRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        status: 'PENDING_APPROVAL',
      },
    });

    if (existingApproval) {
      throw new BadRequestException(
        'This task is already pending approval. Cannot submit again.',
      );
    }

    // Update assignment status
    assignment.status = 'PENDING_APPROVAL';
    await this.taskAssignmentRepository.save(assignment);

    // Create a new approval record
    const taskAproval = new TaskApproval();
    taskAproval.task = task;
    taskAproval.user = user;
    taskAproval.completedAt = new Date();
    taskAproval.pointsPossible = pointsPossible;
    taskAproval.note = note || '';

    // Save the new record in the approvals table
    return this.taskApprovalRepository.save(taskAproval);
  }

  async getApprovals(
    filters?: Partial<TaskApproval>,
  ): Promise<PendingApprovalDto[]> {
    const queryOptions = {
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
          category: true,
          pointValue: true,
        },
        user: {
          id: true,
        },
      },
    };

    // Add where clause if filters provided
    if (filters) {
      queryOptions['where'] = filters;
    }

    const approvals = await this.taskApprovalRepository.find(queryOptions);
    return approvals.map((approval) => new PendingApprovalDto(approval));
  }

  async getAllApprovals(): Promise<PendingApprovalDto[]> {
    return this.getApprovals();
  }

  async getPendingApprovals(): Promise<PendingApprovalDto[]> {
    return this.getApprovals({ status: 'PENDING_APPROVAL' });
  }

  async getPendingApprovalsByUser(
    userId: string,
  ): Promise<PendingApprovalDto[]> {
    const approvals = this.taskApprovalRepository.find({
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
          category: true,
          pointValue: true,
        },
        user: {
          id: true,
        },
      },
    });
    return (await approvals).map(
      (approval) => new PendingApprovalDto(approval),
    );
  }

  async approveTask(
    approvalId: string,
    parentId: string,
    note?: string,
  ): Promise<TaskApproval> {
    // Find the task to be approved
    const approval = await this.taskApprovalRepository.findOne({
      where: { id: approvalId },
      relations: ['task', 'user'],
    });

    if (!approval) {
      throw new NotFoundException(`Error: "${approvalId}" not found`);
    }

    if (approval.status !== 'PENDING_APPROVAL') {
      throw new BadRequestException(`Status is not PENDING_APPROVAL`);
    }

    // Find and update the corresponding assignment
    const assignment = await this.taskAssignmentRepository.findOne({
      where: {
        task: { id: approval.task.id },
        user: { id: approval.user.id },
      },
    });

    // Set the assignment status to COMPLETED
    if (assignment) {
      assignment.status = 'COMPLETED';
      await this.taskAssignmentRepository.save(assignment);
    }

    // Find the parent user
    const parent = await this.usersRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    // Update the approval fields
    approval.status = 'APPROVED';
    approval.approvedBy = parent;
    approval.approvedAt = new Date();

    // Handle points
    // TODO: #154 - Create the structure for bonus points being awarded.
    if (approval.pointsPossible) {
      approval.pointsAwarded = approval.pointsPossible;
    } else if (approval.task.pointValue) {
      approval.pointsAwarded = approval.task.pointValue;
    }

    if (note) {
      approval.note = note;
    }

    // Use the transactional entity manager to update user profile with points awarded
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      // Save approval
      await transactionalEntityManager.save(approval);

      // Update user profile with awarded points
      const userProfile = await transactionalEntityManager.findOne(
        UserProfile,
        {
          where: { userId: approval.user.id },
        },
      );
      if (userProfile) {
        userProfile.pointTotal =
          (userProfile.pointTotal || 0) + approval.pointsAwarded;
        await transactionalEntityManager.save(userProfile);
      }
    });

    // Save the approval record
    return this.taskApprovalRepository.save(approval);
  }

  async rejectTask(
    approvalId: string,
    parentId: string,
    note?: string,
  ): Promise<TaskApproval> {
    // Find the approval
    const approval = await this.taskApprovalRepository.findOne({
      where: { id: approvalId },
      relations: ['task', 'user'],
    });

    if (!approval) {
      throw new NotFoundException(`Error:"${approvalId}" not found`);
    }

    if (approval.status !== 'PENDING_APPROVAL') {
      throw new BadRequestException(`Task is not pending approval`);
    }

    // Find and update the corresponding assignment
    const assignment = await this.taskAssignmentRepository.findOne({
      where: {
        task: { id: approval.task.id },
        user: { id: approval.user.id },
      },
    });

    // Set the assignment status to REJECTED
    if (assignment) {
      assignment.status = 'REJECTED';
      await this.taskAssignmentRepository.save(assignment);
    }

    // Find the parent user
    const parent = await this.usersRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    // Update the task
    approval.status = 'REJECTED';
    approval.note = note;

    // Save the approval record
    return this.taskApprovalRepository.save(approval);
  }
}
