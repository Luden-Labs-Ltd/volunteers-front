import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@/shared/ui';
import thankYouImage from './assets/thankYou.webp';
import { ProgressSteps } from './progress-steps';
import { useGetCities } from '@/entities/city';
import { useGetMe } from '@/entities/user/model/hooks/use-get-me';
import { imageApi } from '@/entities/image';
import { apiClient } from '@/shared/api';
import { toast } from 'sonner';
import { useGetSkills } from '@/entities/skills/hook';
import {ProgramPage} from "@/pages/volunteer-onboarding/ui/program-page.tsx";
import {Container} from "@/shared/ui/container";

type OnboardingStep = 'program' | 'skills' | 'city' | 'profile' | 'contact' | 'photo' | 'thank-you';

interface OnboardingData {
    programId: string | null;
    skills: string[];
    cityId: string | null;
    hasCar: boolean;
    displayByLocation: boolean;
    maxDistance: number;
    agreementAccepted: boolean;
    firstName: string;
    lastName: string;
    phone: string;
    about: string;
    photo: string | null;
    privacyAccepted: boolean;
}

export const OnboardingPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('program');
    const [isGeolocating, setIsGeolocating] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [skillSearchQuery, setSkillSearchQuery] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{
        firstName?: string;
        lastName?: string;
        cityId?: string;
        agreement?: string;
    }>({});
    const [data, setData] = useState<OnboardingData>({
        programId: null,
        skills: [], // Теперь храним ID навыков
        cityId: null,
        hasCar: false,
        displayByLocation: true,
        maxDistance: 3,
        agreementAccepted: false,
        firstName: '',
        lastName: '',
        phone: '',
        about: '',
        photo: null,
        privacyAccepted: false
    });

    // Загружаем города из API
    const { data: cities = [], isLoading: citiesLoading, error: citiesError } = useGetCities();

    // Загружаем навыки из API
    const { data: skillsData = [], isLoading: skillsLoading } = useGetSkills();

    // Загружаем данные текущего пользователя
    const { data: currentUser } = useGetMe();

    // Проверяем, прошел ли волонтер уже онбординг
    useEffect(() => {
        if (currentUser && currentUser.role === 'volunteer') {
            const profile = currentUser.profile;
            // Проверяем, что онбординг завершен: есть firstName, lastName, skills и cityId
            const isOnboardingComplete =
                currentUser.firstName &&
                currentUser.lastName &&
                profile?.skills &&
                profile.skills.length > 0 &&
                (profile.cityId || profile.city);

            if (isOnboardingComplete) {
                // Редиректим на главную страницу волонтера
                navigate('/volunteer', { replace: true });
            }
        }
    }, [currentUser, navigate]);

    const steps: OnboardingStep[] = ['program', 'skills', 'city', 'profile', 'contact', 'photo', 'thank-you'];
    const currentStepIndex = steps.indexOf(currentStep);

    // Запрос геолокации при переходе на шаг city
    useEffect(() => {
        if (currentStep === 'city' && !data.cityId && !isGeolocating && navigator.geolocation && cities.length > 0) {
            setIsGeolocating(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    // Находим ближайший город по координатам
                    type NearestCity = { id: string; distance: number };
                    let nearestCity: NearestCity | null = null;

                    cities.forEach((city) => {
                        if (city.latitude && city.longitude) {
                            // Простой расчет расстояния (формула гаверсинуса)
                            const R = 6371; // Радиус Земли в км
                            const dLat = ((city.latitude - latitude) * Math.PI) / 180;
                            const dLon = ((city.longitude - longitude) * Math.PI) / 180;
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos((latitude * Math.PI) / 180) *
                                Math.cos((city.latitude * Math.PI) / 180) *
                                Math.sin(dLon / 2) *
                                Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            const distance = R * c;

                            if (!nearestCity || distance < nearestCity.distance) {
                                nearestCity = { id: city.id, distance };
                            }
                        }
                    });

                    if (nearestCity) {
                        const { id, distance } = nearestCity;
                        if (distance < 50) { // В пределах 50км
                            setData((prev) => ({ ...prev, cityId: id }));
                            toast.success(t('onboarding.cityDetected'));
                        }
                    }
                    setIsGeolocating(false);
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    setIsGeolocating(false);
                    // Fallback на ручной выбор - ничего не делаем
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 60000, // Кэш на 1 минуту
                }
            );
        }
    }, [currentStep, data.cityId, isGeolocating, cities, t]);

    // Маппинг иконок для навыков (можно расширить по необходимости)
    const skillIcons: Record<string, { icon: string; color: string }> = {
        'technology': { icon: '💻', color: 'bg-blue-100' },
        'meals': { icon: '🍲', color: 'bg-green-100' },
        'medical': { icon: '👨‍⚕️', color: 'bg-orange-100' },
        'transportation': { icon: '🚗', color: 'bg-red-100' },
        'maintenance': { icon: '🔧', color: 'bg-purple-100' },
        'electricity': { icon: '💡', color: 'bg-yellow-100' },
    };

    // Преобразуем навыки из API в формат для UI
    const allSkills = skillsData.map((skill) => {
        const skillNameLower = skill.name.toLowerCase();
        const iconData = skillIcons[skillNameLower] || { icon: '⭐', color: 'bg-gray-100' };
        return {
            id: skill.id, // UUID из API
            name: skill.name,
            icon: iconData.icon,
            color: iconData.color,
        };
    });

    // Фильтруем навыки по поисковому запросу
    const skills = allSkills.filter((skill) =>
        skill.name.toLowerCase().includes(skillSearchQuery.toLowerCase())
    );


    const validateStep = (step: OnboardingStep): boolean => {
        const errors: typeof fieldErrors = {};
        let isValid = true;

        if (step === 'contact' || step === 'thank-you') {
            if (!data.firstName || !data.firstName.trim()) {
                errors.firstName = t('onboarding.firstNameRequired') || 'First name is required';
                isValid = false;
            }
            if (!data.lastName || !data.lastName.trim()) {
                errors.lastName = t('onboarding.lastNameRequired') || 'Last name is required';
                isValid = false;
            }
            if (!data.cityId) {
                errors.cityId = t('onboarding.cityRequired') || 'City selection is required';
                isValid = false;
            }
        }

        if (step === 'profile' || step === 'thank-you') {
            if (!data.agreementAccepted) {
                errors.agreement = t('onboarding.agreementRequired') || 'You must accept the agreement';
                isValid = false;
            }
        }

        setFieldErrors(errors);
        return isValid;
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            const nextStep = steps[currentStepIndex + 1];

            // Валидация перед переходом на следующий шаг
            if (!validateStep(currentStep)) {
                // Остаемся на текущем шаге, ошибки уже установлены
                return;
            }

            // Перед переходом на финальный экран проверяем обязательные поля
            if (nextStep === 'thank-you') {
                if (!validateStep('thank-you')) {
                    // Редиректим на шаг с ошибкой
                    if (fieldErrors.firstName || fieldErrors.lastName || fieldErrors.cityId) {
                        setCurrentStep('contact');
                    } else if (fieldErrors.agreement) {
                        setCurrentStep('profile');
                    }
                    return;
                }
            }

            // Очищаем ошибки при успешном переходе
            setFieldErrors({});
            setCurrentStep(nextStep);
        }
    };

    const handleSubmit = async () => {
        if (!currentUser?.id) {
            toast.error(t('onboarding.userNotFound'));
            return;
        }

        // Валидация перед отправкой
        if (!validateStep('thank-you')) {
            // Редиректим на шаг с ошибкой
            if (fieldErrors.firstName || fieldErrors.lastName || fieldErrors.cityId) {
                setCurrentStep('contact');
            } else if (fieldErrors.agreement) {
                setCurrentStep('profile');
            }
            return;
        }

        try {
            // Обновляем профиль пользователя с данными онбординга
            await apiClient.request(`/user/${currentUser.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone || undefined,
                    about: data.about || undefined,
                    photo: data.photo || undefined,
                    cityId: data.cityId || undefined,
                    skills: data.skills.length > 0 ? data.skills : undefined,
                    programId: data.programId || undefined,
                }),
            });

            toast.success(t('onboarding.profileUpdated'));
            // После финального экрана благодарности переходим на рейтинг
            navigate('/volunteer/leaderboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(t('onboarding.updateError'));
        }
    };

    const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Валидация типа файла
        if (!file.type.startsWith('image/')) {
            toast.error(t('onboarding.invalidImageType'));
            return;
        }

        // Валидация размера (макс 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error(t('onboarding.imageTooLarge'));
            return;
        }

        setIsUploadingPhoto(true);
        try {
            // Показываем preview сразу
            const reader = new FileReader();
            reader.onloadend = () => {
                setData((prev) => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);

            // Загружаем изображение на сервер с таймаутом
            const uploadPromise = imageApi.upload(file, 'volunteers');
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout: загрузка изображения заняла слишком много времени')), 30000)
            );

            const uploadedImage = await Promise.race([uploadPromise, timeoutPromise]) as Awaited<ReturnType<typeof imageApi.upload>>;

            // Обновляем данные с URL загруженного изображения
            setData((prev) => ({ ...prev, photo: uploadedImage.url }));
            toast.success(t('onboarding.imageUploaded'));
        } catch (error) {
            console.error('Error uploading image:', error);
            const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
            toast.error(t('onboarding.imageUploadError') || `Ошибка загрузки изображения: ${errorMessage}`);
            // Сбрасываем preview при ошибке
            setData((prev) => ({ ...prev, photo: null }));
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 'program':
                return true; // Приветственный экран - всегда можно продолжить
            case 'skills':
                return data.skills.length > 0;
            case 'city':
                return true; // Настройки - всегда можно продолжить
            case 'profile':
                return data.agreementAccepted;
            case 'contact':
                return (data.firstName.trim() !== '' &&
                  data.cityId !== null && data.privacyAccepted)
            case 'photo':
                return true; // Фото опционально
            case 'thank-you':
                return true; // Финальный экран
            default:
                return false;
        }
    };


    const renderStepContent = () => {
        switch (currentStep) {
            case 'program':
                return (
                  <ProgramPage/>
                );

            case 'skills':
                return (
                    <>
                        {skillsLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">{t('common.loading') || 'Loading skills...'}</p>
                            </div>
                        ) : (
                            <Container className={'flex flex-col items-stretch gap-3 pt-4'}>
                                <h6 className={'text-deepBlue text-lg font-medium'}>What am I good at?</h6>
                                {allSkills.length > 0 && (
                                    <div className="mb-4">
                                        <Input
                                            placeholder={t('onboarding.searchSkills') || 'Search skills...'}
                                            value={skillSearchQuery}
                                            onChange={(e) => setSkillSearchQuery(e.target.value)}
                                            icon={
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </div>
                                )}
                                {skills.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600">
                                            {skillSearchQuery
                                                ? t('onboarding.noSkillsFound') || 'No skills found'
                                                : t('onboarding.noSkills') || 'No skills available'}
                                        </p>
                                    </div>
                                ) : (
                        <div className="flex flex-col gap-3 mb-4">
                            {skills.map((skill) => {
                                const isSelected = data.skills.includes(skill.id);
                                return (
                                    <Card
                                      variant="elevated"
                                      key={skill.id}
                                        className={`cursor-pointer transition-all relative ${isSelected
                                            ? 'ring-2 ring-primary border-2 border-primary'
                                            : 'border border-gray-200'
                                            }`}
                                        onClick={() => {
                                            setData((prev) => ({
                                                ...prev,
                                                skills: prev.skills.includes(skill.id)
                                                    ? prev.skills.filter((s) => s !== skill.id)
                                                    : [...prev.skills, skill.id],
                                            }));
                                        }}
                                    >
                                        <div className="p-4 flex items-center gap-4">

                                            <div
                                              className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                                                {skill.icon}
                                            </div>
                                            <h3 className="font-semibold text-base text-gray-900">
                                                {skill.name}
                                            </h3>
                                            {isSelected && (
                                              <div className="ml-auto w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                                                  <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                      />
                                                  </svg>
                                              </div>
                                            )}

                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                                )}
                            </Container>
                        )}
                    </>
                );

            case 'city':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                {t('onboarding.preferences')}
                            </h2>
                            <div className="space-y-3">
                                {/* I have a car */}
                                <Card className="border border-gray-200">
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">
                                                🚗
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {t('onboarding.iHaveCar')}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setData((prev) => ({ ...prev, hasCar: !prev.hasCar }))}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${data.hasCar ? 'bg-primary' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${data.hasCar ? 'translate-x-6' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </Card>

                                {/* Display by location */}
                                <Card className="border border-gray-200">
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">
                                                📍
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {t('onboarding.displayByLocation')}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setData((prev) => ({ ...prev, displayByLocation: !prev.displayByLocation }))}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${data.displayByLocation ? 'bg-primary' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${data.displayByLocation ? 'translate-x-6' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </Card>

                                {/* Maximum distance */}
                                <Card className="border border-gray-200">
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                                                🛣️
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {t('onboarding.maximumDistance')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setData((prev) => ({ ...prev, maxDistance: Math.max(1, prev.maxDistance - 1) }))}
                                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                            >
                                                −
                                            </button>
                                            <span className="font-semibold text-gray-900 min-w-[3rem] text-center">
                                                {data.maxDistance} km
                                            </span>
                                            <button
                                                onClick={() => setData((prev) => ({ ...prev, maxDistance: prev.maxDistance + 1 }))}
                                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </>
                );

            case 'profile':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-primary mb-4">
                                {t('onboarding.agreementTitle')}
                            </h2>
                            <div className="text-gray-900 text-base leading-relaxed mb-6 space-y-3">
                                <p>{t('onboarding.agreementWelcome')}</p>
                                <p>{t('onboarding.agreementConfidentiality')}</p>
                                <p>{t('onboarding.agreementCommitment')}</p>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-700 text-sm mb-4">
                                    {t('onboarding.agreementPrompt')}
                                </p>
                                <div
                                    className="flex items-start gap-3 cursor-pointer"
                                    onClick={() => {
                                        setData((prev) => ({ ...prev, agreementAccepted: !prev.agreementAccepted }));
                                        if (fieldErrors.agreement) {
                                            setFieldErrors((prev) => ({ ...prev, agreement: undefined }));
                                        }
                                    }}
                                >
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${fieldErrors.agreement
                                            ? 'border-red-500'
                                            : data.agreementAccepted
                                            ? 'bg-primary border-primary'
                                            : 'border-gray-300'
                                            }`}
                                    >
                                        {data.agreementAccepted && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-gray-900 text-sm leading-relaxed">
                                        {t('onboarding.agreementConfirm')}
                                    </p>
                                </div>
                                {fieldErrors.agreement && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {fieldErrors.agreement}
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                );

            case 'contact':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-primary mb-2">
                                {t('onboarding.contactDetails')}
                            </h2>
                            <p className="text-gray-600 text-sm mb-6">
                                {t('onboarding.contactDetailsDescription')}
                            </p>
                            <div className="space-y-4">
                                <Input
                                    label={t('onboarding.firstName')}
                                    placeholder={t('onboarding.firstNamePlaceholder')}
                                    value={data.firstName}
                                    error={fieldErrors.firstName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setData((prev) => ({ ...prev, firstName: e.target.value }));
                                        if (fieldErrors.firstName) {
                                            setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
                                        }
                                    }}
                                />
                                <Input
                                    label={t('onboarding.lastName')}
                                    placeholder={t('onboarding.lastNamePlaceholder')}
                                    value={data.lastName}
                                    error={fieldErrors.lastName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setData((prev) => ({ ...prev, lastName: e.target.value }));
                                        if (fieldErrors.lastName) {
                                            setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
                                        }
                                    }}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('onboarding.city')}
                                    </label>
                                    <select
                                        value={data.cityId || ''}
                                        onChange={(e) => {
                                            setData((prev) => ({ ...prev, cityId: e.target.value || null }));
                                            if (fieldErrors.cityId) {
                                                setFieldErrors((prev) => ({ ...prev, cityId: undefined }));
                                        }
                                        }}
                                        disabled={citiesLoading || isGeolocating}
                                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${fieldErrors.cityId
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-primary'
                                            }`}
                                    >
                                        <option value="">
                                            {citiesLoading
                                                ? t('onboarding.loadingCities')
                                                : isGeolocating
                                                ? t('onboarding.detectingLocation')
                                                : t('onboarding.cityPlaceholder')
                                            }
                                        </option>
                                        {cities.length === 0 && !citiesLoading ? (
                                            <option value="" disabled>
                                                {t('onboarding.noCities')}
                                            </option>
                                        ) : (
                                            cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                            ))
                                        )}
                                    </select>
                                    {isGeolocating && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {t('onboarding.geolocating')}
                                        </p>
                                    )}
                                    {fieldErrors.cityId && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {fieldErrors.cityId}
                                        </p>
                                    )}
                                    {citiesError && !fieldErrors.cityId && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {t('onboarding.citiesLoadError')}
                                        </p>
                                    )}
                                </div>
                                {/* <div> */}
                                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('onboarding.phone')}
                                    </label> */}
                                {/* <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-3 py-3 border border-gray-300 rounded-l-2xl bg-gray-50">
                                            <span className="text-lg">🇮🇱</span>
                                            <span className="text-sm text-gray-600">+972</span>
                                        </div>
                                        <Input
                                            type="tel"
                                            placeholder={t('onboarding.phonePlaceholder')}
                                            value={data.phone}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setData((prev) => ({ ...prev, phone: e.target.value }))
                                            }
                                            className="flex-1 rounded-l-none"
                                        />
                                    </div> */}
                                {/* </div> */}
                                <div className="flex items-start gap-3 pt-2">
                                    <input
                                      type="checkbox"
                                      id="privacy"
                                      checked={data.privacyAccepted}
                                      onChange={(e) => setData( (prev) => ({...prev, privacyAccepted: e.target.checked}))}
                                      className="mt-1 w-5 h-5 rounded-md accent-primary border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="privacy" className="text-sm text-gray-700">
                                        {t('onboarding.privacyConfirm')}{' '}
                                        <span className="text-primary underline">
                                            {t('onboarding.privacyPolicy')}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                );

            case 'photo':
                return (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-primary mb-2">
                                {t('onboarding.addPicture')}
                            </h2>
                            <p className="text-gray-600 text-base mb-8">
                                {t('onboarding.addPictureDescription')}
                            </p>
                            <div className="flex justify-center">
                                <div
                                    className={`relative ${isUploadingPhoto ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
                                    onClick={() => {
                                        if (!isUploadingPhoto) {
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                >
                                    {isUploadingPhoto ? (
                                        <div className="w-[252px] h-[252px] rounded-full bg-primary-50 flex items-center justify-center border-4 border-primary-50 shadow-lg">
                                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
                                        </div>
                                    ) : data.photo ? (
                                        <img
                                            src={data.photo}
                                            alt="Profile"
                                            className="w-48 h-48 rounded-full object-cover border-4 border-primary-50 shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-[252px] h-[252px] rounded-full bg-primary-50 flex items-center justify-center border-4 border-primary-50 shadow-lg">
                                            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M34 5.66666C26.5766 5.66666 20.5416 11.7017 20.5416 19.125C20.5416 26.4067 26.2366 32.3 33.66 32.555C33.8866 32.5267 34.1133 32.5267 34.2833 32.555C34.34 32.555 34.3683 32.555 34.425 32.555C34.4533 32.555 34.4533 32.555 34.4816 32.555C41.735 32.3 47.43 26.4067 47.4583 19.125C47.4583 11.7017 41.4233 5.66666 34 5.66666Z" fill="#004573" />
                                                <path d="M48.3933 40.0917C40.4883 34.8217 27.5967 34.8217 19.635 40.0917C16.0367 42.5 14.0533 45.7583 14.0533 49.2433C14.0533 52.7283 16.0367 55.9583 19.6067 58.3383C23.5733 61.0017 28.7867 62.3333 34 62.3333C39.2133 62.3333 44.4267 61.0017 48.3933 58.3383C51.9633 55.93 53.9467 52.7 53.9467 49.1867C53.9183 45.7017 51.9633 42.4717 48.3933 40.0917Z" fill="#004573" />
                                            </svg>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoSelect}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );

            case 'thank-you':
                return (
                    <>
                        <div className="text-center mb-6">
                            <div className="mb-6">
                                <img
                                    src={thankYouImage}
                                    alt="Thank you illustration"
                                    className="w-full h-auto object-contain mx-auto"
                                />
                            </div>
                            <h2 className="text-3xl font-medium text-primary mb-4">
                                {t('onboarding.thankYou')}
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed px-4">
                                {t('onboarding.thankYouDescription')}
                            </p>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-light-blue-gradient flex flex-col">
            <div className={`flex-1 px-4 ${currentStep === 'program' ? 'pb-24 pt-8' : 'pb-24 pt-8'}`}>
                <div className="max-w-md mx-auto">
                    {/* Progress Steps - показываем на всех шагах кроме program */}
                    {currentStep !== 'program' && (
                        <Container>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-deepBlue mb-2">
                                    Eshkol Volunteers
                                </h1>
                            </div>
                            <ProgressSteps currentStepIndex={currentStepIndex} totalSteps={steps.length} />
                        </Container>
                    )}

                    {/* Step Content */}
                    {renderStepContent()}
                </div>
            </div>

            {/* Navigation Buttons - всегда внизу */}
            <div className="fixed bottom-0 left-0 right-0 px-5 pt-5 pb-11 bg-white border-t border-gray-200 z-20">
                <div className="max-w-md mx-auto">
                    <Button
                      fullWidth
                      size="lg"
                      onClick={currentStep === 'thank-you' ? handleSubmit : handleNext}
                      disabled={!canProceed()}
                      className="shadow-lg"
                    >
                        {currentStep === 'program'
                          ? t('onboarding.iAmWheelButton')
                          : currentStep === 'thank-you'
                            ? t('common.next')
                            : t('common.next')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
