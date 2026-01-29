export const formatDate = (dateInput: string | Date, locale = 'en-US'): string => {
    if (!dateInput) return "";

    const date = dateInput instanceof Date
      ? dateInput
      : new Date(
        typeof dateInput === 'string'
          ? dateInput.replace(' ', 'T') // временный костыль если приходит "2026-01-28 14:30:00"
          : dateInput
      );

    if (isNaN(date.getTime())) return "Invalid date";
    console.log(date)

    return date.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
};
