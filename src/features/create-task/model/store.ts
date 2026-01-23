import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CreateTaskState {
    categoryId: string;
    skillIds: string[];
    setCategoryId: (id: string) => void;
    setSkillIds: (ids: string[]) => void;
    reset: () => void;
}

export const useCreateTaskStore = create<CreateTaskState>()(
    devtools((set) => ({
        categoryId: "",
        skillIds: [],
        setCategoryId: (id) => set({ categoryId: id }),
        setSkillIds: (ids) => set({ skillIds: ids }),
        reset: () => set({ categoryId: "", skillIds: [] }),
    }))
);