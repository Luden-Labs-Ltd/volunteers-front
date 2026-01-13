import { FC, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
}

export const Divider: FC<DividerProps> = ({
    orientation = 'horizontal',
    className,
    ...props
}) => {
    return (
        <hr
            className={cn(
                'border-gray-200',
                orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
                className
            )}
            {...props}
        />
    );
};
