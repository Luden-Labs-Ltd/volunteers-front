import { CategoryCard } from "@/entities/category/ui/CategoryCard";
import { categoryApi } from "@/entities/category/api";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";
import { Category } from "@/entities/category/model/types";

type CategorySelectorType = {
    selectedId: string
    onSelect: (id: string) => void;
}

export const CategorySelector = ({ selectedId, onSelect }: CategorySelectorType) => {
    const { data: categories } = useQueryWithErrorHandling<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await categoryApi.getCategories();
            // Валидация ответа
            return validateApiResponse(
                response,
                (data): data is Category[] => isArray(data),
                'Invalid categories response format'
            );
        },
    });

    if (!categories) return null;

    return (
        <div className="grid grid-cols-2 gap-3 px-5 mt-3">
            {categories.map((cat) => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    isSelected={selectedId === cat.id}
                    onClick={() => onSelect(cat.id)}
                />
            ))}
        </div>
    );
};
