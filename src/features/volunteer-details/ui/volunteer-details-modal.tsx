import { FC } from 'react';
import { Modal } from '@/shared/ui';
import { UserWithRoleData } from '@/entities/user/model/types';
import { useTranslation } from 'react-i18next';
import { Card, Badge } from '@/shared/ui';

interface VolunteerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  volunteer: UserWithRoleData | null;
}

export const VolunteerDetailsModal: FC<VolunteerDetailsModalProps> = ({
  isOpen,
  onClose,
  volunteer,
}) => {
  const { t } = useTranslation();

  if (!volunteer || volunteer.role !== 'volunteer') return null;

  const fullName = [volunteer.firstName, volunteer.lastName].filter(Boolean).join(' ') || 'Unknown Volunteer';
  const photoUrl = (volunteer.photo || '').replace(/^"|"$/g, '');
  const isVerified = volunteer.status === 'approved';

  // Получаем данные из профиля волонтера
  const profile = volunteer.profile && 'skills' in volunteer.profile ? volunteer.profile : null;
  const skills = profile?.skills || [];
  const city = profile?.city;
  const points = profile?.points || 0;
  const completedTasksCount = profile?.completedTasksCount || 0;
  const rating = profile?.rating || null;
  const programs = profile?.programs || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('volunteerDetails.title') || 'Volunteer Details'}>
      <div className="flex flex-col gap-6">
        {/* Фото и основная информация */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${volunteer.id}`}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                <svg width="16" height="18" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99333 1.47833L6.32667 0.105C5.94667 -0.035 5.32667 -0.035 4.94667 0.105L1.28 1.47833C0.573333 1.745 0 2.57167 0 3.325V8.725C0 9.265 0.353333 9.97833 0.786667 10.2983L4.45333 13.0383C5.1 13.525 6.16 13.525 6.80667 13.0383L10.4733 10.2983C10.9067 9.97167 11.26 9.265 11.26 8.725V3.325C11.2667 2.57167 10.6933 1.745 9.99333 1.47833ZM7.95333 5.21167L5.08667 8.07833C4.98667 8.17833 4.86 8.225 4.73333 8.225C4.60667 8.225 4.48 8.17833 4.38 8.07833L3.31333 6.99833C3.12 6.805 3.12 6.485 3.31333 6.29167C3.50667 6.09833 3.82667 6.09833 4.02 6.29167L4.74 7.01167L7.25333 4.49833C7.44667 4.305 7.76667 4.305 7.96 4.49833C8.15333 4.69167 8.15333 5.01833 7.95333 5.21167Z" fill="white"/>
                </svg>
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">{fullName}</h3>
            {city && (
              <p className="text-gray-600 mt-1">
                📍 {city.name}
              </p>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="elevated" className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-900">{points}</div>
            <div className="text-sm text-gray-600 mt-1">{t('volunteerDetails.points') || 'Points'}</div>
          </Card>
          <Card variant="elevated" className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-900">{completedTasksCount}</div>
            <div className="text-sm text-gray-600 mt-1">{t('volunteerDetails.completedTasks') || 'Completed'}</div>
          </Card>
          <Card variant="elevated" className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-900">
              {rating ? rating.toFixed(1) : '—'}
            </div>
            <div className="text-sm text-gray-600 mt-1">{t('volunteerDetails.rating') || 'Rating'}</div>
          </Card>
        </div>

        {/* О себе */}
        {volunteer.about && (
          <Card variant="elevated" className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{t('volunteerDetails.about') || 'About'}</h4>
            <p className="text-gray-700 text-sm">{volunteer.about}</p>
          </Card>
        )}

        {/* Навыки */}
        {skills.length > 0 && (
          <Card variant="elevated" className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{t('volunteerDetails.skills') || 'Skills'}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: { id: string; name: string }, index: number) => (
                <Badge key={skill.id || index} variant="default">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Программы */}
        {programs.length > 0 && (
          <Card variant="elevated" className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{t('volunteerDetails.programs') || 'Programs'}</h4>
            <div className="flex flex-wrap gap-2">
              {programs.map((program: { id: string; name: string }) => (
                <Badge key={program.id} variant="secondary">
                  {program.name}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Отзывы (заглушка для будущей реализации) */}
        <Card variant="elevated" className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">{t('volunteerDetails.reviews') || 'Reviews'}</h4>
          <p className="text-gray-500 text-sm italic">
            {t('volunteerDetails.reviewsComingSoon') || 'Reviews will be available soon'}
          </p>
        </Card>
      </div>
    </Modal>
  );
};
