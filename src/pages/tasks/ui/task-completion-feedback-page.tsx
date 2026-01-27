import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Textarea} from '@/shared/ui';
import crownIllustration from '../assets/taskFeedback/Crown.webp';

export const TaskCompletionFeedbackPage = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');

    const handleBack = () => {
        console.log('Feedback:', feedback);
        navigate('/needy/tasks');
    };

    return (
        <div className="w-full min-h-screen mx-auto relative bg-[#F0F5FA] overflow-x-hidden flex flex-col">
            <div className="flex-1 flex flex-col items-center px-6 pt-10">
                <div className="w-full max-w-[327px] aspect-square flex items-center justify-center mb-6">
                    <img
                        src={crownIllustration}
                        alt="Success Crown"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-[24px] font-medium text-black text-center mb-3 leading-tight tracking-tight">
                    Thanks for the update! 😊
                </h1>
                <p className="text-[16px] text-[#4F4F4F] text-center font-normal mb-8">
                    We can’t wait to hear your thoughts! Your feedback will be visible only to those who are looking for help, so it can truly
                    make a difference.
                </p>
                <div className="w-full mb-auto">
                    <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="For example: great work..."
                        className="w-full h-[52px] px-4 py-3.5 rounded-xl border border-[#F3F3F3]
                         bg-white text-[16px] placeholder:text-[#C4C4C4] focus:outline-none overflow-hidden shadow-[1px_1px_0_0_#F3F3F3,3px_3px_0_0_#F3F3F3]"
                        style={{ minHeight: '52px' }}
                    />
                </div>
                <div className="w-full pb-[34px] mt-8">
                    <Button
                        onClick={handleBack}
                        className="w-full h-[56px] rounded-xl bg-[#004573] text-white text-[18px] font-semibold
                       border border-[#002640]  shadow-[1px_1px_0_0_#002640,3px_3px_0_0_#002640]"
                    >
                        Back to my tasks
                    </Button>
                </div>
            </div>
        </div>
    );
};
