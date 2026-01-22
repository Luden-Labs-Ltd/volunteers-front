import { SubcategoryList } from "@/entities/category/ui/subcategoryList";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/entities/category/api";
import {Category} from "@/entities/category/model";

type SelectSubcategoryListItemsType = {
    onSelect: (skillId: string) => void;
    className?:string;
}

export const SelectSubcategoryListItems = ({ onSelect, className }: SelectSubcategoryListItemsType) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories(),
    });

    return (
        <div className={`flex flex-col gap-8 ${className}`}>
            {categories?.map((category: Category) => (
                <SubcategoryList
                    key={category.id}
                    categoryName={category.name}
                    skills={category.skills}
                    onSkillClick={onSelect}
                    onMissingClick={() => console.log('Open custom request form')}
                />
            ))}
        </div>
    );
}
