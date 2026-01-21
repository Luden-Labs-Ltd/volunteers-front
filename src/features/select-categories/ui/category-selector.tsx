import {CategoryCard} from "@/entities/category/ui/CategoryCard";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {categoryApi} from "@/entities/category/api";

export const CategorySelector = () => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories(),
    });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const toggleCategory = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };
    if (!categories) return null;

    return (
        <div className="grid grid-cols-2 gap-3 px-5 pb-10 mt-3">
            {categories.map((cat) => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    isSelected={selectedIds.includes(cat.id)}
                    onClick={() => toggleCategory(cat.id)}
                />
            ))}
        </div>
    );
};
