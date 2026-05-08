import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export interface HealthStatus {
    status: 'ok' | 'error';
    uptime: number;
    timestamp: string;
    database: 'ok' | 'error';
}

@Injectable()
export class HealthService {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    async check(): Promise<HealthStatus> {
        const dbStatus = await this.checkDatabase();

        return {
            status: dbStatus === 'ok' ? 'ok' : 'error',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: dbStatus,
        };
    }

    private async checkDatabase(): Promise<'ok' | 'error'> {
        try {
            await this.dataSource.query('SELECT 1');
            return 'ok';
        } catch {
            return 'error';
        }
    }
}
