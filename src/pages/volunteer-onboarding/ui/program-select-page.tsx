import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/shared/ui';

export const ProgramSelectPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const programs = [
    { id: '1', name: 'Program 1', description: 'Description of program 1' },
    { id: '2', name: 'Program 2', description: 'Description of program 2' },
  ];

  const handleNext = () => {
    if (selectedProgram) {
      navigate('/volunteer/onboarding/skills');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {t('onboarding.selectProgram')}
            </h1>
            <p className="text-gray-600">{t('onboarding.selectProgramDescription')}</p>
          </div>

          <div className="space-y-3 mb-6">
            {programs.map((program) => (
              <Card
                key={program.id}
                className={`cursor-pointer transition-all ${
                  selectedProgram === program.id
                    ? 'ring-2 ring-primary border-primary'
                    : ''
                }`}
                onClick={() => setSelectedProgram(program.id)}
              >
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-600">{program.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={!selectedProgram}
          >
            {t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};
