import { useEffect, useState } from 'react';

export const useKeyboardVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const initialHeight = window.innerHeight;
        const handleResize = () => {
            const currentHeight = window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;
            if (currentHeight < initialHeight * 0.8) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        } else {
            window.addEventListener('resize', handleResize);
        }
        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            } else {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    return isVisible;
};
