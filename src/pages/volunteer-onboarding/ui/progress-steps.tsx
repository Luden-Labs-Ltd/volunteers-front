import { FC } from 'react';

interface ProgressStepsProps {
    currentStepIndex: number;
    totalSteps: number;
}

export const ProgressSteps: FC<ProgressStepsProps> = ({ currentStepIndex }) => {
    // Маппинг шагов онбординга на индексы прогресса (5 основных шагов в обратном порядке)
    // program=0 (не показываем), skills=1, city=2, profile=3, contact=4, photo=5, thank-you=6 (не показываем)
    // Иконки в обратном порядке: star, person, shield, target, clock
    // skills(1) -> clock (index 4), city(2) -> target (index 3), profile(3) -> shield (index 2),
    // contact(4) -> person (index 1), photo(5) -> person (index 1) - оба используют person

    const getProgressIndex = (stepIndex: number): number => {
        // На шаге thank-you все шаги выполнены - возвращаем последний индекс
        if (stepIndex === 6) return 4; // thank-you -> все выполнено (последний шаг clock)
        // contact и photo оба используют person (index 1)
        if (stepIndex === 4 || stepIndex === 5) return 1; // contact или photo -> person
        if (stepIndex === 1) return 4; // skills -> clock
        if (stepIndex === 2) return 3; // city -> target
        if (stepIndex === 3) return 2; // profile -> shield
        return 0;
    };

    const progressIndex = getProgressIndex(currentStepIndex);
    // На шаге thank-you все шаги считаются выполненными
    const allCompleted = currentStepIndex === 6;

    // Иконки в обратном порядке: star, person, shield, target, clock
    const steps = [
        { icon: 'clock', label: 'Step 5' },
        { icon: 'person', label: 'Step 2' },
        { icon: 'shield', label: 'Step 3' },
        { icon: 'target', label: 'Step 4' },
        { icon: 'star', label: 'Step 1' },
    ];

    const getIcon = (iconName: string, isActive: boolean, isCompleted: boolean) => {
        const iconColor = isActive ? '#004573' : isCompleted ? '#004573' : '#C1C1C1';

        switch (iconName) {
            case 'clock':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99992 1.33333C4.32658 1.33333 1.33325 4.32666 1.33325 7.99999C1.33325 11.6733 4.32658 14.6667 7.99992 14.6667C11.6733 14.6667 14.6666 11.6733 14.6666 7.99999C14.6666 4.32666 11.6733 1.33333 7.99992 1.33333ZM10.8999 10.38C10.8066 10.54 10.6399 10.6267 10.4666 10.6267C10.3799 10.6267 10.2933 10.6067 10.2133 10.5533L8.14659 9.31999C7.63325 9.01333 7.25325 8.33999 7.25325 7.74666V5.01333C7.25325 4.73999 7.47992 4.51333 7.75325 4.51333C8.02658 4.51333 8.25325 4.73999 8.25325 5.01333V7.74666C8.25325 7.98666 8.45325 8.33999 8.65992 8.45999L10.7266 9.69333C10.9666 9.83333 11.0466 10.14 10.8999 10.38Z" fill={iconColor} />
                    </svg>
                );
            case 'person':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8ZM8 9C6.67 9 4 9.67 4 11V12H12V11C12 9.67 9.33 9 8 9Z" fill={iconColor} />
                    </svg>
                );
            case 'shield':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6066 4.64001V5.86001C13.6066 6.28667 13.4066 6.68667 13.06 6.93334L5.72664 12.3067C5.25331 12.6533 4.60664 12.6533 4.13998 12.3L3.17998 11.58C2.74664 11.2533 2.39331 10.5467 2.39331 10.0067V4.64001C2.39331 3.89334 2.96664 3.06667 3.66664 2.80667L7.31331 1.44001C7.69331 1.30001 8.30664 1.30001 8.68664 1.44001L12.3333 2.80667C13.0333 3.06667 13.6066 3.89334 13.6066 4.64001Z" fill={iconColor} />
                        <path d="M12.5467 8.22666C12.9867 7.90666 13.6067 8.21999 13.6067 8.76666V10.02C13.6067 10.56 13.2533 11.26 12.82 11.5867L9.17332 14.3133C8.85332 14.5467 8.42666 14.6667 7.99999 14.6667C7.57332 14.6667 7.14666 14.5467 6.82666 14.3067L6.27332 13.8933C5.91332 13.6267 5.91332 13.0867 6.27999 12.82L12.5467 8.22666Z" fill={iconColor} />
                    </svg>
                );
            case 'target':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99992 1.33333C4.31992 1.33333 1.33325 4.31999 1.33325 7.99999C1.33325 11.68 4.31992 14.6667 7.99992 14.6667C11.6799 14.6667 14.6666 11.68 14.6666 7.99999C14.6666 4.31999 11.6799 1.33333 7.99992 1.33333ZM7.99992 13.1667C5.15325 13.1667 2.83325 10.8467 2.83325 7.99999C2.83325 7.09333 3.07325 6.20666 3.51992 5.42666C3.65325 5.18666 3.95992 5.10666 4.19992 5.23999L8.24658 7.56666C8.48658 7.70666 8.56658 8.00666 8.43325 8.24666C8.29325 8.48666 7.99325 8.56666 7.75325 8.43333L5.81325 7.31999C5.74659 7.53999 5.69992 7.76666 5.69992 7.99999C5.69992 9.26666 6.73325 10.3 7.99992 10.3C9.26658 10.3 10.2999 9.26666 10.2999 7.99999C10.2999 6.73333 9.26658 5.69999 7.99992 5.69999C7.65992 5.69999 7.32658 5.77333 7.01992 5.91999C6.76658 6.03999 6.47325 5.93333 6.35325 5.68C6.23325 5.43333 6.33992 5.13333 6.59325 5.01333C7.03325 4.80666 7.50659 4.69999 7.99992 4.69999C9.81992 4.69999 11.2999 6.17999 11.2999 7.99999C11.2999 9.81999 9.81992 11.3 7.99992 11.3C6.17992 11.3 4.69992 9.81999 4.69992 7.99999C4.69992 7.59333 4.77992 7.18666 4.92658 6.80666L4.15992 6.37333C3.94658 6.88666 3.83325 7.43999 3.83325 7.99999C3.83325 10.3 5.69992 12.1667 7.99992 12.1667C10.2999 12.1667 12.1666 10.3 12.1666 7.99999C12.1666 5.69999 10.2999 3.83333 7.99992 3.83333C7.09325 3.83333 6.22658 4.11999 5.49992 4.66666C5.27992 4.83333 4.96658 4.78666 4.79992 4.56666C4.63325 4.34666 4.67992 4.03333 4.89992 3.86666C5.79992 3.19333 6.87325 2.83333 7.99992 2.83333C10.8466 2.83333 13.1666 5.15333 13.1666 7.99999C13.1666 10.8467 10.8466 13.1667 7.99992 13.1667Z" fill={iconColor} />
                    </svg>
                );
            case 'star':
                return (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.81929 0.955L8.99262 3.30167C9.15262 3.62833 9.57929 3.94167 9.93929 4.00167L12.066 4.355C13.426 4.58167 13.746 5.56833 12.766 6.54167L11.1126 8.195C10.8326 8.475 10.6793 9.015 10.766 9.40167L11.2393 11.4483C11.6126 13.0683 10.7526 13.695 9.31929 12.8483L7.32596 11.6683C6.96596 11.455 6.37262 11.455 6.00596 11.6683L4.01262 12.8483C2.58596 13.695 1.71929 13.0617 2.09262 11.4483L2.56596 9.40167C2.65262 9.015 2.49929 8.475 2.21929 8.195L0.565955 6.54167C-0.407378 5.56833 -0.0940448 4.58167 1.26596 4.355L3.39262 4.00167C3.74596 3.94167 4.17262 3.62833 4.33262 3.30167L5.50596 0.955C6.14596 -0.318333 7.18596 -0.318333 7.81929 0.955Z" fill={iconColor} />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
                const isActive = !allCompleted && index === progressIndex;
                const isCompleted = allCompleted || index < progressIndex;

                return (
                    <div key={step.icon} className="flex items-center flex-1">
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive
                                ? 'bg-blue-50 border-2 border-[#004573]'
                                : isCompleted
                                    ? 'bg-blue-50'
                                    : 'bg-gray-100'
                                }`}
                        >
                            {getIcon(step.icon, isActive, isCompleted)}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-0.5 mx-2 ${isCompleted || isActive ? 'bg-blue-200' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
