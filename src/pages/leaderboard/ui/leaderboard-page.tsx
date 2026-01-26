import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, Header, IconButton, Button } from '@/shared/ui';
import { useGetMe } from '@/entities/user/model/hooks';
import { useGetLeaderboard } from '@/entities/city/hook/use-get-leaderboard';
import type { CityLeaderboardStats } from '@/entities/city/api/city-api';
import { toast } from 'sonner';
import userIcon from '@/shared/assets/images/userIcon.webp';
import trophy1 from './assets/Gemini_Generated_Image_87xzbo87xzbo87xz 1.png';
import trophy2 from './assets/Gemini_Generated_Image_87xzbo87xzbo87xz 1 (1).png';
import trophy3 from './assets/Gemini_Generated_Image_87xzbo87xzbo87xz 1 (2).png';
import trophyIllustration from './assets/Gemini_Generated_Image_fjh4ihfjh4ihfjh4 1.png';
import {Container} from "@/shared/ui/container";

export const LeaderboardPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: user } = useGetMe();
    const { data: leaderboardData = [], isLoading } = useGetLeaderboard();

    const handleSettingsClick = () => {
        if (user?.role) {
            navigate(`/${user.role}/settings`);
        }
    };

    const handleCopyInvite = async () => {
        const inviteText = t('leaderboard.inviteText') || 'Join us as a volunteer and help your community!';
        const inviteLink = 'https://volunteers-front.vercel.app/';
        const fullText = `${inviteText}\n\n${inviteLink}`;

        try {
            await navigator.clipboard.writeText(fullText);
            toast.success(t('leaderboard.inviteCopied') || 'Invitation copied to clipboard!');
        } catch (error) {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = fullText;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                toast.success(t('leaderboard.inviteCopied') || 'Invitation copied to clipboard!');
            } catch (err) {
                toast.error(t('leaderboard.inviteCopyError') || 'Failed to copy invitation');
            }
            document.body.removeChild(textArea);
        }
    };

    // Разделяем данные на топ-3 и остальные
    const { topThree, otherCommunities } = useMemo(() => {
        const sorted = [...leaderboardData].sort((a, b) => a.rank - b.rank);
        const top = sorted.slice(0, 3);
        const others = sorted.slice(3);

        // Для топ-3 переставляем места: 2-е, 1-е, 3-е (для визуального отображения)
        // Но только если есть достаточно элементов
        const topThree: CityLeaderboardStats[] = [];
        if (top.length === 1) {
            // Если только 1 элемент - показываем его как первое место
            topThree.push(top[0]);
        } else if (top.length === 2) {
            // Если 2 элемента - показываем 2-е и 1-е место
            topThree.push(top[1]); // 2-е место
            topThree.push(top[0]); // 1-е место
        } else if (top.length >= 3) {
            // Если 3 или больше - показываем все три места
            topThree.push(top[1]); // 2-е место
            topThree.push(top[0]); // 1-е место
            topThree.push(top[2]); // 3-е место
        }

        return {
            topThree,
            otherCommunities: others,
        };
    }, [leaderboardData]);

    const getTrophyImage = (rank: number) => {
        switch (rank) {
            case 1:
                return trophy1;
            case 2:
                return trophy2;
            case 3:
                return trophy3;
            default:
                return trophy1;
        }
    };

    return (
        <Container className={'h-screen bg-light-blue-gradient flex flex-col'}>
            <Header
              className={'pt-15 pb-5 text-center flex-shrink-0'}
                title={t('leaderboard.title')}
                rightActions={[
                    <IconButton
                        className="w-8 h-8 rounded-lg drop-shadow-[2px_2px_0_#004573]"
                        key="profile"
                        variant="ghost"
                        aria-label={t('common.profile')}
                        icon={
                            <img
                                src={userIcon}
                                alt={t('common.profile')}
                                className="w-full h-full object-cover"
                            />
                        }
                        onClick={handleSettingsClick}
                    />
                ]}
            />
            <div className="flex-1 overflow-y-auto px-4 py-8 pb-40">
                <div className="max-w-md mx-auto">
                    {isLoading ? (
                        <div className="text-center py-8 text-gray-500">
                            {t('common.loading') || 'Загрузка...'}
                        </div>
                    ) : leaderboardData.length === 0 ? (
                        <Card className="p-8 text-center">
                            <div className="mb-4">
                                <img
                                    src={trophyIllustration}
                                    alt="Trophy illustration"
                                    className="w-32 h-32 object-contain mx-auto opacity-50"
                                />
                        </div>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">
                                {t('leaderboard.empty') || 'No winners yet'}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                {t('leaderboard.emptyDescription') || 'Be the first to join and help your community!'}
                            </p>
                        </Card>
                    ) : (
                        <>
                            {/* Топ-3 сообщества */}
                            {topThree.length > 0 && (
                                <Card className="mb-4 p-6 rounded-[12px] border border-[#F2F2F2] border-b-4 border-r-4">
                                    <div className="flex items-stretch">
                                        {/* Специальный случай: только 1 элемент - показываем по центру с золотым кубком */}
                                        {topThree.length === 1 ? (
                                            <div className="flex flex-col items-center flex-1">
                                                <div className="mb-3">
                                                    <img
                                                        src={getTrophyImage(1)}
                                                        alt="1st place"
                                                        className="w-20 h-20 object-contain"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold text-gray-900 text-base mb-1">
                                                        {topThree[0]?.name || ''}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">
                                                        {topThree[0]?.volunteers || 0}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                        {/* 2-е место */}
                                                {topThree.length >= 2 && (
                                        <div className="flex flex-col items-center flex-1 relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-px bg-[#F2F2F2]"></div>
                                            <div className="mb-3">
                                                <img
                                                    src={getTrophyImage(2)}
                                                    alt="2nd place"
                                                    className="w-14 h-14 object-contain"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-900 text-base mb-1">
                                                    {topThree[0]?.name || ''}
                                                </p>
                                                <p className="text-gray-600 text-sm">{topThree[0]?.volunteers || 0}</p>
                                            </div>
                                        </div>
                                                )}

                                        {/* 1-е место */}
                                                {topThree.length >= 1 && (
                                        <div className="flex flex-col items-center flex-1 relative">
                                                        {topThree.length >= 2 && (
                                            <div className="absolute right-0 top-0 bottom-0 w-px bg-[#F2F2F2]"></div>
                                                        )}
                                            <div className="mb-3">
                                                <img
                                                    src={getTrophyImage(1)}
                                                    alt="1st place"
                                                    className="w-20 h-20 object-contain"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-900 text-base mb-1">
                                                    {topThree[1]?.name || ''}
                                                </p>
                                                            <p className="text-gray-600 text-sm">
                                                                {topThree[1]?.volunteers || 0}
                                                            </p>
                                            </div>
                                        </div>
                                                )}

                                        {/* 3-е место */}
                                                {topThree.length >= 3 && (
                                        <div className="flex flex-col items-center flex-1">
                                            <div className="mb-3">
                                                <img
                                                    src={getTrophyImage(3)}
                                                    alt="3rd place"
                                                    className="w-14 h-14 object-contain"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-900 text-base mb-1">
                                                    {topThree[2]?.name || ''}
                                                </p>
                                                <p className="text-gray-600 text-sm">{topThree[2]?.volunteers || 0}</p>
                                            </div>
                                        </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Призыв к действию */}
                            <Card className="mb-4 p-4 bg-blue-50 border-0">
                                <div className="flex flex-col items-center">
                                    {/* Иллюстрация сверху */}
                                        <img
                                            src={trophyIllustration}
                                            alt="Trophy illustration"
                                            className="w-32 h-32 object-contain"
                                        />

                                    <div className={'flex flex-col items-center gap-1 mt-4 mb-4'}>
                                        <h2 className="text-base font-medium text-primary mb-0 text-center">
                                            {t('leaderboard.wantToWin')}
                                        </h2>
                                        <p className="text-sm font-normal text-primary mb-0 text-center max-w-[20rem] mx-auto">
                                            {t('leaderboard.addVolunteersDescription')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopyInvite}
                                        className="w-full bg-white border border-[#004573] border-b-4 border-r-4 text-primary font-bold py-3 px-6 rounded-[12px] hover:bg-gray-50 transition-colors"
                                    >
                                        {t('leaderboard.addVolunteers')}
                                    </button>
                                </div>
                            </Card>

                            {/* Остальные сообщества */}
                            {otherCommunities.length > 0 && (
                            <Card className="p-4">
                                <div className="space-y-3">
                                    {otherCommunities.map((community) => (
                                        <div
                                            key={community.id}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-semibold text-sm">
                                                    {community.rank}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {community.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {community.volunteers} {t('leaderboard.volunteers')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-primary">
                                                    {community.points} {t('leaderboard.points')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            )}

                            {/* Кнопка перехода к задачам */}
                            {/*<div className="mt-6">*/}
                            {/*    <Button*/}
                            {/*        size="lg"*/}
                            {/*        fullWidth*/}
                            {/*        variant="secondary"*/}
                            {/*        onClick={() => navigate('/volunteer')}*/}
                            {/*    >*/}
                            {/*        {t('tasks.title')}*/}
                            {/*    </Button>*/}
                            {/*</div>*/}

                        </>
                    )}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 px-5 pt-5 pb-11 bg-white border-t border-gray-200 z-20">
                <div className="max-w-md mx-auto">
                    <Button
                      size="lg"
                      fullWidth
                      variant="secondary"
                      onClick={() => navigate('/volunteer')}
                    >
                        {t('tasks.title')}
                    </Button>
                </div>
            </div>
        </Container>
    );
};
