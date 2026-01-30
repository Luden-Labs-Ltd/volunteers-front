export const formatDate = (dateString: string | Date, locale = 'en-US'): string => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
};
