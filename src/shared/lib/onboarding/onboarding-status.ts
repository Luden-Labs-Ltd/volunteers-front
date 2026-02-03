const ONBOARDING_KEY = 'volunteer_onboarding_completed';

export const onboardingStorage = {
    setCompleted: () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
    },
    isCompleted: (): boolean => {
        return localStorage.getItem(ONBOARDING_KEY) === 'true';
    },
    clear: () => {
        localStorage.removeItem(ONBOARDING_KEY);
    }
};
