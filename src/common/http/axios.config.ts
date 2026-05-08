import { AxiosRequestConfig } from 'axios';

export const defaultAxiosConfig: AxiosRequestConfig = {
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};
