import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    variant?: 'default' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    'aria-label': string;
}

export const IconButton: FC<IconButtonProps> = ({
    icon,
    variant = 'default',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

    const variants = {
        default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-primary',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary',
    };

    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {icon}
        </button>
    );
};
