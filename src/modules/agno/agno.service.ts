import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class AgnoService {
    private readonly logger = new Logger(AgnoService.name);
    private readonly client: AxiosInstance;

    constructor(private readonly configService: ConfigService) {
        const baseURL = this.configService.get<string>('AGNO_BASE_URL') ?? 'http://agno:8000';
        this.client = axios.create({ baseURL, timeout: 30_000 });
    }

    async proxy<T>(method: string, path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.request<T>({
                method,
                url: path,
                data: body,
                ...config,
            });
            return response.data;
        } catch (error) {
            this.logger.error(`Agno proxy failed [${method} ${path}]`, error);
            throw error;
        }
    }
}
