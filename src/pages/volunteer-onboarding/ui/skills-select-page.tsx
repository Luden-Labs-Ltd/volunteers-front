import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from '@/shared/ui';

export const SkillsSelectPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = [
    'Electrician',
    'Builder',
    'Driver',
    'Babysitter/Childcare',
    'Shopping/Delivery',
    'Cleaning',
    'Other',
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    navigate('/volunteer/onboarding/city');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {t('onboarding.selectSkills')}
            </h1>
            <p className="text-gray-600">{t('onboarding.selectSkillsDescription')}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? 'primary' : 'secondary'}
                className="cursor-pointer text-base px-4 py-2"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={selectedSkills.length === 0}
          >
            {t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};
