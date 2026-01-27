import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";

export const VolunteerCardSkeleton = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "w-full h-[95px] bg-white rounded-2xl p-6 border border-[#F2F2F2] flex items-start gap-5",
                "shadow-[1px_1px_0_0_#F2F2F2,3px_3px_0_0_#F2F2F2]",
                className
            )}
        >
            <div className="flex-shrink-0 relative">
                <Skeleton className="w-[56px] h-[56px] rounded-full border-[3px] border-white" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col pt-1">
                <Skeleton className="h-[18px] w-[140px] rounded-md mb-2" />

                <Skeleton className="h-[14px] w-[100px] rounded-md mb-2.5" />

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-[14px] w-[80px] rounded-md" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-[14px] w-[90px] rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};
