export function formatTime(
    dateTime: string,
): string {
    return new Intl.DateTimeFormat('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateTime));
}

export function formatDate(
    dateTime: string,
): string {
    return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(dateTime));
}

export function formatShortDate(
    dateTime: string,
): string {
    return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(dateTime));
}