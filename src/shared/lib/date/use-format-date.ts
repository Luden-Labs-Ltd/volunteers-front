import {formatter} from "@/shared/modal/formatter.ts";

export const formatDate = (dateString: string | Date): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
   return formatter.format(date)
};
