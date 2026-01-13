import { FC, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Textarea, Avatar } from '@/shared/ui';

export const ProfilePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (firstName && lastName) {
      navigate('/volunteer/tasks');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {t('onboarding.profile')}
            </h1>
            <p className="text-gray-600">{t('onboarding.profileDescription')}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-center mb-4">
              <div
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar
                  src={photo || undefined}
                  size="xl"
                  className="border-4 border-white shadow-lg"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoSelect}
                />
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">
              {t('onboarding.clickToChangePhoto')}
            </p>

            <Input
              label={t('onboarding.firstName')}
              placeholder={t('onboarding.firstNamePlaceholder')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              label={t('onboarding.lastName')}
              placeholder={t('onboarding.lastNamePlaceholder')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Textarea
              label={t('onboarding.about')}
              placeholder={t('onboarding.aboutPlaceholder')}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={handleSubmit}
            disabled={!firstName || !lastName}
          >
            {t('common.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};
