import { TaskResponse } from "@/entities/task/model/types";
import { CandidateItem } from "@/features/task-candidates/ui/candidate-item.tsx";

type CandidatesListType = {
    responses: TaskResponse[];
}

export const CandidatesList = ({ responses }: CandidatesListType) => {
    const pendingResponses = responses.filter((r) => r.status === 'pending');
    const approvedResponses = responses.filter((r) => r.status === 'approved');
    const rejectedResponses = responses.filter((r) => r.status === 'rejected');

    if (responses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-3xl">📭</span>
                </div>
                <h3 className="text-[18px] font-medium text-[#393939] mb-1">
                    No requests yet
                </h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div>
                <h3 className="text-sm uppercase text-[#004573] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                    Approved Volunteer
                    <span className="bg-[#E3F2FD] text-[#004573] text-[14px] rounded-md px-2 py-0.5">
                        {approvedResponses.length}
                    </span>
                </h3>
                <div className="flex flex-col gap-3 min-h-[10px]">
                    {approvedResponses.length > 0 ? (
                        approvedResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))
                    ) : (
                        <span className="text-xs pl-1">No approved volunteers</span>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-sm uppercase text-[#828282] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                    New Requests
                    <span className="bg-[#F2F2F2] text-[#828282] text-[14px] rounded-md px-2 py-0.5">
                        {pendingResponses.length}
                    </span>
                </h3>
                <div className="flex flex-col gap-3 min-h-[10px]">
                    {pendingResponses.length > 0 ? (
                        pendingResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))
                    ) : (
                        <span className="text-xs pl-1">No new Requests volunteers</span>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-sm uppercase text-[#EB5757] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                    Declined
                    <span className="bg-[#FFE5E5] text-[#EB5757] text-[14px] rounded-md px-2 py-0.5">
                        {rejectedResponses.length}
                    </span>
                </h3>
                <div className="flex flex-col gap-3 min-h-[10px] opacity-60">
                    {rejectedResponses.length > 0 ? (
                        rejectedResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))
                    ) : (
                        <span className="text-xs pl-1">No declined volunteers</span>
                    )}
                </div>
            </div>
        </div>
    );
};
