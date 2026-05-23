import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

const DEV_USER = {
    id: 'dev-admin',
    email: 'dev@local',
    roles: ['admin', 'user'],
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Dev bypass: when APP_ENV=development, inject a fake admin user
        if (process.env.APP_ENV === 'development') {
            const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
            request.user = DEV_USER;
            return true;
        }
        return super.canActivate(context);
    }
}
