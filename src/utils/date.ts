export function formatTime(dateTime: string): string {
    return new Intl.DateTimeFormat('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateTime));
}