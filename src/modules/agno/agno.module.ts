import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgnoController } from './agno.controller';
import { AgnoService } from './agno.service';

@Module({
    imports: [ConfigModule],
    controllers: [AgnoController],
    providers: [AgnoService],
    exports: [AgnoService],
})
export class AgnoModule { }
