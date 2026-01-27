import {TaskResponse} from "@/entities/task/model/types";
import {CandidateItem} from "@/features/task-candidates/ui/candidate-item.tsx";

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
                <p className="text-[14px] text-[#828282]">
                    Wait for volunteers to respond to your task
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-10">
            {approvedResponses.length > 0 && (
                <div>
                    <h3 className="text-[13px] uppercase text-[#004573] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                        Approved Volunteer
                        <span className="bg-[#E3F2FD] text-[#004573] text-[11px] px-2 py-0.5 rounded-full">
                            {approvedResponses.length}
                        </span>
                    </h3>
                    <div className="flex flex-col gap-3">
                        {approvedResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))}
                    </div>
                </div>
            )}

            {pendingResponses.length > 0 && (
                <div>
                    <h3 className="text-[13px] uppercase text-[#004573] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                        New Requests
                        <span className="bg-[#E3F2FD] text-[#004573] text-[11px] px-2 py-0.5 rounded-full">
                            {pendingResponses.length}
                        </span>
                    </h3>
                    <div className="flex flex-col gap-3">
                        {pendingResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))}
                    </div>
                </div>
            )}

            {rejectedResponses.length > 0 && (
                <div>
                    <h3 className="text-[13px] uppercase text-[#EB5757] font-bold tracking-wider mb-3 px-1 flex items-center gap-2">
                        Declined
                        <span className="bg-[#FFE5E5] text-[#EB5757] text-[11px] px-2 py-0.5 rounded-full">
                            {rejectedResponses.length}
                        </span>
                    </h3>
                    <div className="flex flex-col gap-3">
                        {rejectedResponses.map((response) => (
                            <CandidateItem
                                key={response.id || response.volunteerId}
                                response={response}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
