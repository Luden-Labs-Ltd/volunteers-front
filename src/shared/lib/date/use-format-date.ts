export const formatDate = (input: string | Date, locale = 'en-US'): string => {
    if (!input) return "";

    let date: Date | null =null

    if (input instanceof Date) {
        date = input
    } else if (typeof input === "number") {
        date = new Date(input)
    } else if (typeof input === "string") {
        let value = input.trim()
        value = value.replace(/\s*\(.*?\)\s*$/, "");
        date = new Date(value);
    }

    if (!date || isNaN(date.getTime())) {
        console.error("Invalid date:", input);
        return "Invalid date";
    }

    return date.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
};
