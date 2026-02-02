import { Skill } from "@/entities/skills/model";

export type UserRole = 'volunteer' | 'needy' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'blocked' | 'rejected';

export interface City {
    id: string;
    name: string;
    latitude: string | number;
    longitude: string | number;
    location?: { type: "Point"; coordinates: [number, number] };
    [key: string]: unknown;
}

export interface BaseUser {
    id: string;
    phone: string | null;
    email: string | null;
    role: UserRole;
    status: UserStatus;
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
    about: string | null;
    city?: City;
    lastLoginAt: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface VolunteerProfile {
    id: string;
    userId: string;
    points: number;
    completedTasksCount: number;
    rating: number | null;
    cityId?: string;
    city?: {
        id: string;
        name: string;
        latitude: number | string;
        longitude: number | string;
        location?: {
            type: "Point";
            coordinates: [number, number];
        };
        [key: string]: unknown;
    };
    programs?: Array<{
        id: string;
        name: string;
        description?: string;
        ownerId?: string;
        isActive?: boolean;
        createdAt?: string | Date;
        updatedAt?: string | Date;
        [key: string]: unknown;
    }>;
    skills?: Array<{
        id: string;
        name: string;
        iconSvg?: string;
        categoryId?: string;
        createdAt?: string | Date;
        updatedAt?: string | Date;
        [key: string]: unknown;
    }>;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface NeedyProfile {
    id: string;
    userId: string;
    programId: string;
    creatorId: string;
    cityId?: string;
    address?: string;
    city?: {
        id: string;
        name: string;
        latitude: number;
        longitude: number;
    };
    program?: {
        id: string;
        name: string;
        [key: string]: unknown;
    };
    creator?: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        [key: string]: unknown;
    };
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface AdminProfile {
    id: string;
    userId: string;
    ownedPrograms?: Array<{
        id: string;
        name: string;
        [key: string]: unknown;
    }>;
    createdByAdmin?: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        [key: string]: unknown;
    };
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface UserWithVolunteerData extends BaseUser {
    role: 'volunteer';
    profile: VolunteerProfile;
}

export interface UserWithNeedyData extends BaseUser {
    role: 'needy';
    profile: NeedyProfile;
}

export interface UserWithAdminData extends BaseUser {
    role: 'admin';
    profile: AdminProfile;
}

export type UserWithProfile = {
    id: string;
    phone: string | null;
    city?: City;
    email: string | null;
    role: "volunteer" | "needy" | "admin";
    status: "approved" | "pending" | "rejected" | "blocked";
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
    about: string | null;
    lastLoginAt: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    profile: {
        id: string;
        userId: string;
        cityId?: string;
        programId?: string;
        program?: {
            id: string;
            name: string;
            [key: string]: unknown;
        };
        creatorId?: string;
        address?: string;
        creator?: {
            id: string;
            firstName: string | null;
            lastName: string | null;
            [key: string]: unknown;
        };
        points?: number;
        completedTasksCount?: number;
        rating?: number | null;
        createdAt: string | Date;
        updatedAt: string | Date;
        skills?: Skill[];
        programs?: Array<{
            id: string;
            name: string;
            description?: string;
            ownerId?: string;
            isActive?: boolean;
            createdAt?: string | Date;
            updatedAt?: string | Date;
            [key: string]: unknown;
        }>;
        city?: {
            id: string;
            name: string;
            latitude: string | number;
            longitude: string | number;
            location?: {
                type: "Point";
                coordinates: [number, number];
            };
            createdAt?: string;
            updatedAt?: string;
            [key: string]: unknown;
        };
    };
};

export type Review = {
    id: number;
    authorName: string;
    rating: number;
    text: string;
};

export type UserWithRoleData =
    | UserWithVolunteerData
    | UserWithNeedyData
    | UserWithAdminData
    | UserWithProfile;

export type User = BaseUser;
