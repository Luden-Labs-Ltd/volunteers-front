import {Category} from "@/entities/category/model";

type CategoryCardType = {
    category: Category;
    isSelected: boolean;
    onClick: () => void;
}

export const CategoryCard = ({ category, isSelected, onClick }: CategoryCardType) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col bg-white rounded-3xl 
                        border
                        overflow-hidden w-[170px] h-[180px] text-left ${isSelected ?
                "opacity-100 border-[#004573] shadow-[1px_1px_0_0_#004573,3px_3px_0_0_#004573]" :
                "opacity-60 border-[#e5e5e5] shadow-[1px_1px_0_0_#e5e5e5,3px_3px_0_0_#e5e5e5]"}
                        `}
        >
            {category.image?.url ? (
                <img
                    src={category.image.url}
                    alt={category.name}
                    className="w-full h-[137px] object-cover"
                />
            ) : category.iconSvg ? (
                <div
                    className="w-full h-[137px] flex items-center justify-center p-4"
                    dangerouslySetInnerHTML={{ __html: category.iconSvg }}
                />
            ) : (
                <div className="w-full h-[137px] flex items-center justify-center text-gray-300">
                    Img
                </div>
            )}

            <div className="w-full py-3 text-center">
            <span className="text-[#5B5B5B] text-[16px] font-normal">
              {category.name}
            </span>
            </div>
        </button>
    );
};
