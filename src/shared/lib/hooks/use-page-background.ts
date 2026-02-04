import { useEffect } from 'react';
 // Хук для установки цвета фона body и root элемента.
 // Полезен для iOS PWA, чтобы избежать белых полос при оверскролле.

export const usePageBackground = (color: string = '#F0F5FA') => {
    useEffect(() => {
        const originalBodyBg = document.body.style.backgroundColor;
        const rootElement = document.getElementById('root');
        const originalRootBg = rootElement ? rootElement.style.backgroundColor : '';
        document.body.style.backgroundColor = color;
        if (rootElement) {
            rootElement.style.backgroundColor = color;
        }
        return () => {
            document.body.style.backgroundColor = originalBodyBg;
            if (rootElement) {
                rootElement.style.backgroundColor = originalRootBg;
            }
        };
    }, [color]);
};
