import {FC, HTMLAttributes, ReactNode} from 'react';
import {cn} from '@/shared/lib/utils/cn';
import {Button, Icon} from "@/shared/ui";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    title?: string;
    leftAction?: ReactNode;
    rightActions?: ReactNode[];
    backButton?: boolean;
    onBack?: () => void;
}

export const Header: FC<HeaderProps> = ({
  title,
  leftAction,
  rightActions,
  backButton = false,
  onBack,
  className,
  ...props
}) => {

  return (
    <header
      className={cn(
        'w-full px-4 pt-[9vh] pb-[5vh]',
        'flex items-center justify-between',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {backButton && (
            <div>
                <Button
                    icon={<Icon iconId="icon-arrow-back" className="rtl:rotate-180" />} variant="transition" size="sm"
                    onClick={onBack}
                />
            </div>
        )}
                {leftAction}
                {title && (
                    <h1 className="text-3xl font-sans font-normal text-primary">{title}</h1>
                )}
            </div>
            {rightActions && rightActions.length > 0 && (
                <div className="flex items-center gap-2">
                    {rightActions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            )}
        </header>
    );
};
