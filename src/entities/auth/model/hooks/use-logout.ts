import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import { clearTokens } from '@/shared/lib/auth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearTokens();
      queryClient.removeQueries({ queryKey: ['user', 'me'] });
      navigate('/auth', { replace: true });
    },
  });
}
