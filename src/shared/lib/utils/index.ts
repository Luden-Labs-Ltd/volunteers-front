export * from "./cn";

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("ru-RU");
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(
      4,
      7
    )}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  return phone;
};
