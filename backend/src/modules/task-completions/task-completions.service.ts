import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskApproval } from '../task-approvals/entities/task-approval.entity';
import { TaskAssignment } from '../task-assignments/entities/task-assignment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskCompletionsService {
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
}
