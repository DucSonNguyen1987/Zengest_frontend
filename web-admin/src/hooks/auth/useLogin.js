import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

/**
 * Hook pour la gestion de la connexion
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const result = await dispatch(login(credentials)).unwrap();
      toast.success('Connexion réussie !');
      return { success: true, data: result };
    } catch (error) {
      const message = error.message || 'Erreur de connexion';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: handleLogin,
    isLoading
  };
};