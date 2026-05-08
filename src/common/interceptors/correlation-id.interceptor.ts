import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const correlationId =
            (request.headers[CORRELATION_ID_HEADER] as string) ?? randomUUID();

        request.headers[CORRELATION_ID_HEADER] = correlationId;

        return next.handle().pipe(
            tap(() => {
                response.setHeader(CORRELATION_ID_HEADER, correlationId);
            }),
        );
    }
}
