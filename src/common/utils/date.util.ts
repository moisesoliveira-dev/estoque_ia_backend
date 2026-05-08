import { format, parseISO, isValid, differenceInDays, addDays } from 'date-fns';

export function formatDate(date: Date | string, pattern = 'yyyy-MM-dd'): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
}

export function isValidDate(value: unknown): boolean {
    if (value instanceof Date) return isValid(value);
    if (typeof value === 'string') return isValid(parseISO(value));
    return false;
}

export function daysBetween(start: Date, end: Date): number {
    return differenceInDays(end, start);
}

export function addDaysToDate(date: Date, days: number): Date {
    return addDays(date, days);
}

export function nowUtc(): Date {
    return new Date();
}
