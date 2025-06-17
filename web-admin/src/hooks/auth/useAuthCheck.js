import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  verifyToken, 
  restoreSession,
  setInitialized,
  selectIsAuthenticated,
  selectIsInitialized,
  selectCurrentUser,
  selectAuthError
} from '../../store/slices/authSlice';

/**
 * Hook principal pour la vérification d'authentification
 * Vérifie le token au démarrage et restaure la session
 */
export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  const currentUser = useSelector(selectCurrentUser);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('zengest_admin_token');
        
        if (token) {
          // Vérifier le token existant
          await dispatch(verifyToken(token)).unwrap();
        } else {
          // Pas de token, marquer comme initialisé
          dispatch(setInitialized(true));
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation auth:', error);
        // Nettoyer le localStorage en cas d'erreur
        localStorage.removeItem('zengest_admin_token');
        localStorage.removeItem('zengest_admin_user');
        dispatch(setInitialized(true));
      }
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [dispatch, isInitialized]);

  return {
    isAuthenticated,
    isInitialized,
    currentUser,
    authError,
    isLoading: !isInitialized
  };
};