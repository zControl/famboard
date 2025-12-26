import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { AllowanceLedger } from 'src/modules/allowance/entities/allowance-ledger.entity';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import { UserGroup } from 'src/modules/users/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

export type CashoutResult = {
  userId: string;
  pointsBefore: number;
  pointsConverted: number;
  pointsAfter: number;
  amountCents: number;
  ratePointsPerDollar: number;
};

@Injectable()
export class AllowanceService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(AllowanceLedger)
    private allowanceLedgerRepository: Repository<AllowanceLedger>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  private getRatePointsPerDollar(): number {
    // TODO: Make this configurable in the UI. (store in db)
    const raw = process.env.ALLOWANCE_POINTS_PER_DOLLAR;
    const parsed = raw ? Number.parseInt(raw, 10) : NaN;
    const rate = Number.isFinite(parsed) ? parsed : 100;

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new BadRequestException('Invalid ALLOWANCE_POINTS_PER_DOLLAR');
    }

    return rate;
  }

  async cashoutAllKids(): Promise<CashoutResult[]> {
    const rate = this.getRatePointsPerDollar();

    const profiles = await this.userProfileRepository.find({
      relations: ['user'],
      where: {
        user: { group: UserGroup.KID },
      },
    });

    const results: CashoutResult[] = [];

    for (const profile of profiles) {
      const result = await this.cashoutUserProfile(profile.userId, rate);
      if (result) {
        results.push(result);
      }
    }

    return results;
  }

  async cashoutKid(userId: string): Promise<CashoutResult | null> {
    const rate = this.getRatePointsPerDollar();

    const profile = await this.userProfileRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }

    if (profile.user?.group !== UserGroup.KID) {
      throw new BadRequestException('Only kid users can be cashed out.');
    }

    return this.cashoutUserProfile(userId, rate);
  }

  private async cashoutUserProfile(
    userId: string,
    ratePointsPerDollar: number,
  ): Promise<CashoutResult | null> {
    return this.entityManager.transaction(async (manager) => {
      const profile = await manager.findOne(UserProfile, {
        where: { userId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!profile) {
        return null;
      }

      const pointsBefore = profile.pointTotal ?? 0;
      if (pointsBefore <= 0) {
        return null;
      }

      const dollars = Math.floor(pointsBefore / ratePointsPerDollar);
      const amountCents = dollars * 100;
      const pointsConverted = dollars * ratePointsPerDollar;
      const pointsAfter = pointsBefore - pointsConverted;

      if (amountCents <= 0) {
        return null;
      }

      profile.piggyBankCents = (profile.piggyBankCents ?? 0) + amountCents;
      profile.pointTotal = pointsAfter;

      await manager.save(profile);

      const ledgerRepo = manager.getRepository(AllowanceLedger);
      const ledger = ledgerRepo.create({
        user: { id: userId } as any,
        pointsBefore,
        pointsConverted,
        pointsAfter,
        ratePointsPerDollar,
        amountCents,
      });
      await ledgerRepo.save(ledger);

      return {
        userId,
        pointsBefore,
        pointsConverted,
        pointsAfter,
        amountCents,
        ratePointsPerDollar,
      };
    });
  }
}
