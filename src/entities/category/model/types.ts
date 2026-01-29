import { Skill } from "@/entities/skills/model";

export type Category = {
    id: string;
    name: string;
    iconSvg?: string; // Deprecated, use imageId/image
    imageId?: string;
    image?: {
        id: string;
        url: string;
        filename: string;
    };
    createdAt: string;
    updatedAt: string;
    skills: Skill[];
}