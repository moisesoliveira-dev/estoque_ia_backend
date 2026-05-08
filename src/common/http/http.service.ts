import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { defaultAxiosConfig } from './axios.config';
import { withRetry } from './retry.strategy';

@Injectable()
export class HttpService {
    private readonly logger = new Logger(HttpService.name);
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create(defaultAxiosConfig);
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await withRetry<T>(() => this.client.get<T>(url, config));
        return response.data;
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await withRetry<T>(() => this.client.post<T>(url, data, config));
        return response.data;
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await withRetry<T>(() => this.client.put<T>(url, data, config));
        return response.data;
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await withRetry<T>(() => this.client.patch<T>(url, data, config));
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await withRetry<T>(() => this.client.delete<T>(url, config));
        return response.data;
    }
}
