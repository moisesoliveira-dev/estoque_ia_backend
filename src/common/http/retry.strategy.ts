import { Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RetryConfig {
    maxRetries: number;
    delayMs: number;
    retryOn?: number[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    delayMs: 1_000,
    retryOn: [500, 502, 503, 504],
};

const logger = new Logger('RetryStrategy');

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    config: RetryConfig = DEFAULT_RETRY_CONFIG,
): Promise<AxiosResponse<T>> {
    let lastError: AxiosError;

    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
        try {
            return await requestFn();
        } catch (err) {
            const error = err as AxiosError;
            lastError = error;

            const status = error.response?.status;
            const shouldRetry = config.retryOn?.includes(status ?? 0) ?? true;

            if (!shouldRetry || attempt > config.maxRetries) {
                throw error;
            }

            logger.warn(`Attempt ${attempt} failed (${status}). Retrying in ${config.delayMs}ms...`);
            await sleep(config.delayMs * attempt);
        }
    }

    throw lastError!;
}
