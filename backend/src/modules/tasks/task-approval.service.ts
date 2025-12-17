import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ApprovalDto } from 'src/modules/tasks/dto/approval.dto';
import { TaskAssignment } from 'src/modules/tasks/entities/task-assignment.entity';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { EntityManager, MoreThanOrEqual, Repository } from 'typeorm';
import { User, UserGroup } from '../users/entities/user.entity';
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

    // Make sure there is no existing pending approval
    const existingApproval = await this.taskApprovalRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        status: 'PENDING_APPROVAL',
      },
    });

    const existingAssignment = await this.taskAssignmentRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        status: 'PENDING_APPROVAL',
      },
    });

    if (existingAssignment || existingApproval) {
      throw new BadRequestException(
        'This task is already pending approval.',
      );
    }

    // Update assignment status
    assignment.status = 'PENDING_APPROVAL';
    await this.taskAssignmentRepository.save(assignment);

    // Create a new approval record
    const taskApproval = new TaskApproval();
    taskApproval.task = task;
    taskApproval.user = user;
    taskApproval.completedAt = new Date();
    taskApproval.pointsPossible = pointsPossible;
    taskApproval.note = note || '';

    // Save the new record in the approvals table
    return this.taskApprovalRepository.save(taskApproval);
  }

  async getApprovals(
    filters?: Partial<TaskApproval>,
  ): Promise<ApprovalDto[]> {
    const queryOptions = {
      relations: ['task', 'user', 'user.profile', 'approvedBy', 'approvedBy.profile'],
      select: {
        id: true,
        status: true,
        approvedBy: {
          id: true,
          profile: {
            avatarUrl: true
          }
        },
        approvedAt: true,
        completedAt: true,
        user: {
          id: true,
          profile: {
            avatarUrl: true
          }
        },
        task: {
          id: true,
          title: true,
          description: true,
          category: true,
        },
        pointsPossible: true,
        pointsAwarded: true,
        note: true,
      },
    };

    // Add where clause if filters provided
    if (filters) {
      queryOptions['where'] = filters;
    }

    const approvals = await this.taskApprovalRepository.find(queryOptions);
    return approvals.map((approval) => new ApprovalDto(approval));
  }

  async getAllApprovals(): Promise<ApprovalDto[]> {
    return this.getApprovals();
  }

  async getPendingApprovals(): Promise<ApprovalDto[]> {
    return this.getApprovals({ status: 'PENDING_APPROVAL' });
  }

  async getApprovalCountsByPeriod(period: 'daily' | 'weekly' | 'monthly', userId?: string): Promise<number> {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
    }

    // Build where clause
    const whereClause: any = {
      status: 'APPROVED',
      approvedAt: MoreThanOrEqual(startDate)
    };

    // Add user filter if provided
    if (userId) {
      whereClause.user = { id: userId };
    }

    return this.taskApprovalRepository.count({
      where: whereClause
    });
  }

  async getPendingApprovalsByUser(
    userId: string,
  ): Promise<ApprovalDto[]> {
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
      (approval) => new ApprovalDto(approval),
    );
  }

  async approveTask(
    approvalId: string,
    parentId: string,
    bonusPoints?: number,
    note?: string,
  ): Promise<TaskApproval> {
    // 1. Fetch and validate the approval and parent
    const { approval, parent } = await this.validateApprovalRequest(
      approvalId,
      parentId,
    );

    // 2. Update the approval record
    await this.updateApprovalRecord(approval, parent, bonusPoints, note);

    // 3. Process the task assignment based on frequency
    await this.processTaskAssignment(approval);

    // 4. Return the updated approval
    return approval;
  }

  private async validateApprovalRequest(approvalId: string, parentId: string) {
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

    // Find the parent user
    const parent = await this.usersRepository.findOne({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID "${parentId}" not found`);
    }

    return { approval, parent };
  }

  private async updateApprovalRecord(
    approval: TaskApproval,
    parent: User,
    bonusPoints?: number,
    note?: string,
  ) {
    // Update the approval fields
    approval.status = 'APPROVED';
    approval.approvedBy = parent;
    approval.approvedAt = new Date();

    // Handle points awarded and bonus
    if (bonusPoints > 0) {
      approval.bonusAwarded = true;
      approval.bonusValue = bonusPoints;
      approval.pointsAwarded = approval.pointsPossible + bonusPoints;
    } else {
      approval.bonusValue = 0;
      approval.pointsAwarded = approval.task.pointValue;
    }

    if (note) {
      approval.note = note;
    }

    // Save the updated approval
    await this.taskApprovalRepository.save(approval);
  }

  private async processTaskAssignment(approval: TaskApproval) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        // Find the current assignment
        const currentAssignment = await transactionalEntityManager.findOne(
          TaskAssignment,
          {
            where: {
              task: { id: approval.task.id },
              user: { id: approval.user.id },
            },
            relations: ['task', 'user'],
          },
        );

        if (!currentAssignment) {
          throw new NotFoundException(
            `Assignment not found for task ${approval.task.id}`,
          );
        }

        // Update user profile with awarded points
        await this.updateUserPoints(transactionalEntityManager, approval);

        // Handle the assignment based on task frequency
        if (approval.task.frequency === 'ONCE') {
          await this.handleOneTimeTask(
            transactionalEntityManager,
            currentAssignment,
          );
        } else if (
          ['DAILY', 'WEEKLY', 'MONTHLY', 'REPEAT'].includes(approval.task.frequency)
        ) {
          await this.handleRecurringTask(
            transactionalEntityManager,
            currentAssignment,
            approval.task.frequency,
          );
        } else {
          // TODO: Ensure all task frequencies are handled
          console.log(`Unexpected frequency: ${approval.task.frequency}`);
        }
      },
    );
  }

  private async updateUserPoints(
    manager: EntityManager,
    approval: TaskApproval,
  ) {
    if (approval.user.group !== UserGroup.KID) {
      throw new BadRequestException('Only kid users can be awarded points.');
    }

    // Find the user profile
    const userProfile = await manager.findOne(UserProfile, {
      where: { user: { id: approval.user.id } },
    });

    if (!userProfile) {
      throw new NotFoundException(
        `User profile for user ${approval.user.id} not found`,
      );
    }

    // Update points
    if (approval.pointsAwarded) {
      userProfile.pointTotal = (userProfile.pointTotal ?? 0) + approval.pointsAwarded;
      await manager.save(userProfile);
    }
  }

  private async handleOneTimeTask(
    manager: EntityManager,
    assignment: TaskAssignment,
  ) {
    await manager.remove(assignment);
  }

  private async handleRecurringTask(
    manager: EntityManager,
    currentAssignment: TaskAssignment,
    frequency: string,
  ) {
    // Create a new assignment for the next occurrence
    const newAssignment = new TaskAssignment();

    newAssignment.task = currentAssignment.task;
    newAssignment.user = currentAssignment.user;
    newAssignment.status = 'ASSIGNED';

    // Calculate the next due date based on frequency
    const nextDueDate = this.calculateNextDueDate(frequency);
    newAssignment.assignedAt = nextDueDate;

    // Remove the old assignment
    await manager.remove(currentAssignment);

    // Save the new assignment
    await manager.save(newAssignment);
  }

  private calculateNextDueDate(frequency: string): Date {
    const today = new Date();
    const nextDueDate = new Date();

    switch (frequency) {
      case 'DAILY':
        nextDueDate.setDate(today.getDate() + 1);
        nextDueDate.setHours(0, 0, 0, 0);
        break;
      case 'WEEKLY':
        const daysUntilMonday = (8 - today.getDay()) % 7;
        // If today is Monday, go to next Monday
        nextDueDate.setDate(today.getDate() + (daysUntilMonday || 7));
        nextDueDate.setHours(0, 0, 0, 0);
        break;
      case 'MONTHLY':
        nextDueDate.setMonth(today.getMonth() + 1, 1);
        nextDueDate.setHours(0, 0, 0, 0);
        break;
      default:
        // Fallback to today
        nextDueDate.setDate(today.getDate());
    }

    return nextDueDate;
  }

  async rejectTask(approvalId: string, note?: string): Promise<TaskApproval> {
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

    // Update the approval fields
    approval.status = 'REJECTED';
    approval.note = note;

    // Find and update the corresponding assignment
    const assignment = await this.taskAssignmentRepository.findOne({
      where: {
        task: { id: approval.task.id },
        user: { id: approval.user.id },
      },
    });

    if (!assignment) {
      throw new NotFoundException(`Error:"${assignment}" not found`);
    }

    // Update assignment status
    assignment.status = 'ASSIGNED';
    await this.taskAssignmentRepository.save(assignment);

    // Save the approval record
    return this.taskApprovalRepository.save(approval);
  }
}
