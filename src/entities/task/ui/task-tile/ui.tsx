import {Task} from "@/entities/task";

type TaskTileType = {
    task:Task
}

export const TaskTile = ({task}:TaskTileType)=> {
    return (
        <button
            className="flex flex-col items-center gap-3 w-[110px]"
        >
            <div className="w-[110px] h-[110px] bg-white rounded-3xl border border-gray-300 flex items-center justify-center overflow-hidden">
                {task.category?.image?.url ? (
                    <img
                        src={task.category.image.url}
                        alt={task.category.name}
                        className="w-full h-full object-cover"
                    />
                ) : task.category?.iconSvg ? (
                    <div
                        className="w-full h-full flex items-center justify-center p-2"
                        dangerouslySetInnerHTML={{ __html: task.category.iconSvg }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                        Img
                    </div>
                )}
            </div>
            <span   dir="ltr"
                    className="text-[#5B5B5B] text-[16px] font-normal text-center whitespace-nowrap truncate w-full">
              {task.type}
            </span>
        </button>
    )
}