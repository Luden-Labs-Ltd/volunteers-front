import { FC, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: FC<AvatarProps> = ({
    src,
    alt,
    name,
    size = 'md',
    className,
    ...props
}) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    const getInitials = (name?: string) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div
            className={cn(
                'rounded-full bg-gray-200 flex items-center justify-center overflow-hidden',
                sizes[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img src={src} alt={alt || name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-gray-600 font-medium">{getInitials(name)}</span>
            )}
        </div>
    );
};
