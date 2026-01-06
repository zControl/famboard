import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserProfile } from '../users/entities/user-profile.entity';
import { User, UserGroup } from '../users/entities/user.entity';

@Injectable()
export class PointsService {
  async awardPoints(
    manager: EntityManager,
    user: User,
    pointsAwarded: number,
  ): Promise<void> {
    if (user.group !== UserGroup.KID) {
      throw new BadRequestException('Only kid users can be awarded points.');
    }

    // Find the user profile
    const userProfile = await manager.findOne(UserProfile, {
      where: { user: { id: user.id } },
    });

    if (!userProfile) {
      throw new NotFoundException(
        `User profile for user ${user.id} not found`,
      );
    }

    // Update points
    if (pointsAwarded) {
      userProfile.pointTotal = (userProfile.pointTotal ?? 0) + pointsAwarded;
      await manager.save(userProfile);
    }
  }
}
