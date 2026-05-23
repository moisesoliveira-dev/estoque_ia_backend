import {
    All,
    Body,
    Controller,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AgnoService } from './agno.service';

@Controller('agno')
@UseGuards(JwtAuthGuard)
export class AgnoController {
    constructor(private readonly agnoService: AgnoService) { }

    @All('*path')
    async proxy(
        @Req() req: Request,
        @Param('path') path: string | string[],
        @Body() body: unknown,
    ): Promise<unknown> {
        const target = Array.isArray(path) ? path.join('/') : path;
        return this.agnoService.proxy(req.method, `/${target}`, body);
    }
}
