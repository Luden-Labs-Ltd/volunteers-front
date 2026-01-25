import { useQuery } from '@tanstack/react-query';
import { skillsApi } from '@/entities/skills/api';
import { Skill } from '@/entities/category/model';

export const useGetSkills = () => {
    return useQuery<Skill[]>({
        queryKey: ['skills'],
        queryFn: () => skillsApi.getSkills(),
        staleTime: 5 * 60 * 1000, // 5 минут
    });
};
