import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Badge } from '@/shared/ui';
import { UserWithVolunteerData } from '@/entities/user/model/types';

interface SettingsVolunteerSkillsCardProps {
  user: UserWithVolunteerData;
}

export const SettingsVolunteerSkillsCard: FC<SettingsVolunteerSkillsCardProps> = ({ user }) => {
  const { t } = useTranslation();
  const skills = user.profile?.skills ?? [];

  if (!Array.isArray(skills) || skills.length === 0) {
    return null;
  }

  return (
    <Card variant="default" className="p-6 space-y-3 border shadow-[1px_1px_0_0_#F2F2F2,2px_2px_0_0_#F2F2F2]">
      <h3 className="text-lg font-semibold text-gray-900">{t('volunteerDetails.skills')}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id} variant="secondary">
            {skill.name}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
