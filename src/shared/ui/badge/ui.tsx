import { FC, ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'peach' | 'pink' | 'purple';
    size?: 'sm' | 'md';
}

export const Badge: FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium';

    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-primary text-white',
        secondary: 'bg-gray-200 text-gray-800',
        success: 'bg-pastel-green text-gray-800',
        warning: 'bg-pastel-yellow text-gray-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-pastel-blue text-gray-800',
        peach: 'bg-pastel-peach text-gray-800',
        pink: 'bg-pastel-pink text-gray-800',
        purple: 'bg-pastel-purple text-gray-800',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </span>
    );
};
