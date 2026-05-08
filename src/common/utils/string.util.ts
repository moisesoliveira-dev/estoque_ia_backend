export function toSlug(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

export function capitalize(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function truncate(value: string, maxLength: number, suffix = '...'): string {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength - suffix.length) + suffix;
}

export function maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    const masked = local.charAt(0) + '*'.repeat(Math.max(local.length - 2, 1)) + local.charAt(local.length - 1);
    return `${masked}@${domain}`;
}
