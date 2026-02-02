import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        const root = document.getElementById('root');
        const originalBodyOverflow = document.body.style.overflow;
        const originalRootOverflow = root ? root.style.overflow : '';

        if (isLocked) {
            document.body.style.overflow = 'hidden';
            if (root) root.style.overflow = 'hidden';
        }

        return () => {
            if (isLocked) {
                document.body.style.overflow = originalBodyOverflow;
                if (root) root.style.overflow = originalRootOverflow;
            }
        };
    }, [isLocked]);
};
