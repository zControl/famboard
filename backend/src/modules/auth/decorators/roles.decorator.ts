import { SetMetadata } from '@nestjs/common';
import { UserGroup } from 'src/modules/users/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserGroup[]) => SetMetadata(ROLES_KEY, roles);
