import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string()
        .min(1)
        .max(50),
    description: z.string()
        .min(5)
        .max(500),
    firstResponseMode: z.boolean(),
    categoryId: z.string(),
    skillIds: z.array(z.string()),
});