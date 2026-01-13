import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/shared/ui';

export const CitySelectPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    { id: '1', name: 'Tel Aviv' },
    { id: '2', name: 'Jerusalem' },
    { id: '3', name: 'Haifa' },
    { id: '4', name: 'Beer Sheva' },
  ];

  const handleNext = () => {
    if (selectedCity) {
      navigate('/volunteer/onboarding/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {t('onboarding.selectCity')}
            </h1>
            <p className="text-gray-600">{t('onboarding.selectCityDescription')}</p>
          </div>

          <div className="space-y-3 mb-6">
            {cities.map((city) => (
              <Card
                key={city.id}
                className={`cursor-pointer transition-all ${selectedCity === city.id
                  ? 'ring-2 ring-primary border-primary'
                  : ''
                  }`}
                onClick={() => setSelectedCity(city.id)}
              >
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {city.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={!selectedCity}
          >
            {t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};
