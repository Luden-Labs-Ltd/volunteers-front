// features/select-subcategory-list/ui/SelectSubcategoryListItems.tsx
import { SubcategoryList } from "@/entities/category/ui/subcategoryList";
import { categoryApi } from "@/entities/category/api";
import { Category } from "@/entities/category/model";
import { useQueryWithErrorHandling } from "@/shared/api/hook/use-query-with-error-handling";
import { validateApiResponse, isArray } from "@/shared/lib/validation";

type SelectSubcategoryListItemsType = {
    selectedIds: string[];
    onToggle: (skillId: string) => void;
    className?: string;
}

export const SelectSubcategoryListItems = ({ selectedIds, onToggle, className }: SelectSubcategoryListItemsType) => {
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

    return (
        <div className={`flex flex-col gap-8 ${className}`}>
            {categories?.map((category: Category) => (
                <SubcategoryList
                    key={category.id}
                    categoryName={category.name}
                    skills={category.skills}
                    selectedSkillIds={selectedIds}
                    onSkillClick={onToggle}
                    onMissingClick={() => console.log('Open request form')}
                />
            ))}
        </div>
    );
}
