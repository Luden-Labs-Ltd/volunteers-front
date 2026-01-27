import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CreateTaskDto } from '@/entities/task/model/types';

interface CreateTaskState {
    categoryId: string;
    skillIds: string[];
    aiGeneratedData?: Partial<CreateTaskDto>;
    setCategoryId: (id: string) => void;
    setSkillIds: (ids: string[]) => void;
    setAiGeneratedData: (data: Partial<CreateTaskDto> | undefined) => void;
    reset: () => void;
}

export const useCreateTaskStore = create<CreateTaskState>()(
    devtools((set) => ({
        categoryId: "",
        skillIds: [],
        aiGeneratedData: undefined,
        setCategoryId: (id) => set({ categoryId: id }),
        setSkillIds: (ids) => set({ skillIds: ids }),
        setAiGeneratedData: (data) => set({ aiGeneratedData: data }),
        reset: () => set({ categoryId: "", skillIds: [], aiGeneratedData: undefined }),
    }))
);