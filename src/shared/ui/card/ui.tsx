import { FC, ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'default' | 'outlined' | 'elevated' | 'pastel-blue' | 'pastel-green' | 'pastel-peach' | 'pastel-pink' | 'pastel-yellow' | 'pastel-purple' | 'outline-peach' | 'outline-pink' | 'outline-purple' | 'outline-yellow';
}

export const Card: FC<CardProps> = ({
    children,
    variant = 'default',
    className,
    ...props
}) => {
    const variants = {
        default: 'bg-white rounded-2xl',
        outlined: 'bg-white rounded-2xl border border-pastel-blue',
        elevated: 'bg-white rounded-2xl shadow-md',
        'pastel-blue': 'bg-pastel-blue rounded-2xl',
        'pastel-green': 'bg-pastel-green rounded-2xl',
        'pastel-peach': 'bg-pastel-peach rounded-2xl',
        'pastel-pink': 'bg-pastel-pink rounded-2xl',
        'pastel-yellow': 'bg-pastel-yellow rounded-2xl',
        'pastel-purple': 'bg-pastel-purple rounded-2xl',
        'outline-peach': 'bg-white rounded-2xl border border-pastel-peach',
        'outline-pink': 'bg-white rounded-2xl border border-pastel-pink',
        'outline-purple': 'bg-white rounded-2xl border border-pastel-purple',
        'outline-yellow': 'bg-white rounded-2xl border border-pastel-yellow',
    };

    return (
        <div
            className={cn(variants[variant], className)}
            {...props}
        >
            {children}
        </div>
    );
};
