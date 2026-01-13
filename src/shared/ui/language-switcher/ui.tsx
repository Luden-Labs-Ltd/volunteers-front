import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../icon-button';
import { cn } from '@/shared/lib/utils/cn';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;
  const isHebrew = currentLang === 'he';

  const toggleLanguage = () => {
    const newLang = isHebrew ? 'en' : 'he';
    i18n.changeLanguage(newLang);
  };

  return (
    <IconButton
      icon={<span className="text-sm">{isHebrew ? 'EN' : 'עב'}</span>}
      onClick={toggleLanguage}
      variant="ghost"
      size="md"
      aria-label={isHebrew ? 'Switch to English' : 'עבור לעברית'}
      className={cn('font-semibold')}
    />
  );
};
