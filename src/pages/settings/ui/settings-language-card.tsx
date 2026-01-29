import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';

export const SettingsLanguageCard: FC = () => {
  const { t } = useTranslation();

  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('settings.language')}</h3>
        <LanguageSwitcher />
      </div>
    </Card>
  );
};
