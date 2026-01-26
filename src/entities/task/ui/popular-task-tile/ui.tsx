import {Task} from "@/entities/task";

type PopularTaskTileType = {
    popularTask: Task
    place: number
}

export const PopularTaskTile = ({popularTask, place}: PopularTaskTileType) => {

    return (
        <button
            className="flex flex-col items-center gap-3"
        >
            <div className="relative w-[110px] h-[110px] bg-white rounded-3xl border border-gray-300 flex items-center justify-center overflow-hidden">
                {popularTask.category?.image?.url ? (
                    <img
                        src={popularTask.category.image.url}
                        alt={popularTask.category.name}
                        className="w-full h-full object-cover"
                    />
                ) : popularTask.category?.iconSvg ? (
                    <div
                        className="w-full h-full flex items-center justify-center p-2"
                        dangerouslySetInnerHTML={{ __html: popularTask.category.iconSvg }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                        Img
                    </div>
                )}
                <span className="
        absolute top-2 right-3 z-10 text-[32px] font-black leading-none text-white font-sans"
                      style={{
                          WebkitTextStroke: '6px #0C3B5E',
                          paintOrder: 'stroke fill',
                      }}
                >
    {place + 1}
</span>
            </div>
            <span className="text-[#5B5B5B] text-[16px] font-normal text-center whitespace-nowrap">
              {popularTask.type}
            </span>
        </button>
    )
}