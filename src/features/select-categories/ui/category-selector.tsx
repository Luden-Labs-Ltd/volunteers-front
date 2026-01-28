import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "@/entities/category/ui/CategoryCard";
import { categoryApi } from "@/entities/category/api";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";
import { Category } from "@/entities/category/model/types";

type CategorySelectorType = {
    selectedId: string
    onSelect: (id: string) => void;
    searchQuery?: string;
}

export const CategorySelector = ({ selectedId, onSelect, searchQuery = "" }: CategorySelectorType) => {
    const { t } = useTranslation();
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

    // Фильтруем категории по поисковому запросу
    const filteredCategories = useMemo(() => {
        if (!categories) return [];
        if (!searchQuery.trim()) return categories;
        
        const query = searchQuery.toLowerCase().trim();
        return categories.filter((cat) => 
            cat.name.toLowerCase().includes(query)
        );
    }, [categories, searchQuery]);

    if (!categories) return null;

    if (filteredCategories.length === 0 && searchQuery.trim()) {
        return (
            <div className="px-5 mt-3 text-center text-gray-500">
                {categories.length === 0 
                    ? t("categoriesNeedy.noCategories")
                    : t("categoriesNeedy.noCategoriesFound")
                }
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 px-5 mt-3">
            {filteredCategories.map((cat) => (
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
