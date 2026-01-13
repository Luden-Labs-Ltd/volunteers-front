import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Input, Button } from '@/shared/ui';
import { User, UserRole } from '@/entities/user/model/types';

export const AuthPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleSendCode = () => {
    if (phone) {
      setShowCodeInput(true);
    }
  };

  const handleVerify = () => {
    if (code) {
      // Сохраняем токен (в будущем получим от API)
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('authPhone', phone);
      
      // Инвалидируем кэш, чтобы useGetMe заново запросил данные
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });

      // Редирект на онбординг для нового пользователя
      // В будущем: проверка через API, существует ли пользователь
      // Если новый → онбординг, если существующий → на главную по роли
      navigate('/volunteer/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t('auth.title')}
            </h1>
            <p className="text-gray-600">
              {showCodeInput ? t('auth.enterCode') : t('auth.enterPhone')}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            {!showCodeInput ? (
              <>
                <Input
                  type="tel"
                  placeholder={t('auth.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg"
                />
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleSendCode}
                  disabled={!phone}
                >
                  {t('auth.sendCode')}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {t('auth.codeSentTo')} {phone}
                  </p>
                  <Input
                    type="text"
                    placeholder={t('auth.codePlaceholder')}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-lg text-center"
                    maxLength={6}
                  />
                </div>
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleVerify}
                  disabled={!code}
                >
                  {t('auth.verify')}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => setShowCodeInput(false)}
                >
                  {t('auth.changePhone')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
