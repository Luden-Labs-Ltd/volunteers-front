import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Card } from '@/shared/ui';
import { UserWithRoleData } from '@/entities/user/model/types';
import { imageApi } from '@/entities/image/api/image-api';
import { userApi } from '@/entities/user/api';
import { toast } from 'sonner';

interface SettingsAvatarCardProps {
  user: UserWithRoleData;
}

export const SettingsAvatarCard: FC<SettingsAvatarCardProps> = ({ user }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [localPhoto, setLocalPhoto] = useState<string | null>(
    (user.photo || '').toString().replace(/^"|"$/g, '') || null,
  );

  const handleClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('onboarding.invalidImageType'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(t('onboarding.imageTooLarge'));
      return;
    }

    setIsUploading(true);

    try {
      // Превью сразу
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadedImage = await imageApi.upload(file, 'users');

      const updatedUser = await userApi.updateProfile({
        photo: uploadedImage.url,
      });

      const cleanPhoto = (updatedUser.photo || '').toString().replace(/^"|"$/g, '');
      setLocalPhoto(cleanPhoto || null);

      // Обновляем кэш пользователя
      queryClient.setQueryData(['user', 'me'], updatedUser);

      toast.success(t('onboarding.imageUploaded'));
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(t('onboarding.imageUploadError'));
      // откатываем к исходному фото
      setLocalPhoto((user.photo || '').toString().replace(/^"|"$/g, '') || null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || undefined;

  return (
    <Card variant="default" className="p-6 space-y-3 flex flex-col items-center">
      <div
        className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
        onClick={handleClick}
      >
        <Avatar
          src={localPhoto || undefined}
          name={displayName}
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
      <p className="text-center text-sm text-gray-500">
        {t('onboarding.clickToChangePhoto')}
      </p>
    </Card>
  );
};

