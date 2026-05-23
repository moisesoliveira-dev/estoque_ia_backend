import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Dev bypass: full admin access in development
        if (process.env.APP_ENV === 'development') {
            return true;
        }

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user?.roles?.some((role: string) => requiredRoles.includes(role))) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}
