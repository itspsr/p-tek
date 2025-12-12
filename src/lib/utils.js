import { formatDistanceToNow, parseISO } from 'date-fns';

export function timeAgo(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
        return 'Recently';
    }
}

export function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
