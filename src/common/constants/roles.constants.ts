import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export enum Role {
    Admin = 'admin',
    User = 'user',
    Moderator = 'moderator',
}

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
