import {UserWithProfile} from "@/entities/user";

export interface ApproveCandidateSheetProps {
    isOpen: boolean;
    onClose: () => void;
    volunteer: UserWithProfile;
    taskId: string;
}