// web-admin/src/hooks/auth/useAuthCheck.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  verifyToken, 
  setInitialized,
  clearError,
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
        // Vérifier s'il y a un token stocké
        const token = localStorage.getItem('zengest_admin_token') || 
                     sessionStorage.getItem('zengest_admin_token');
        
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
        sessionStorage.removeItem('zengest_admin_token');
        sessionStorage.removeItem('zengest_admin_user');
        
        // Marquer comme initialisé même en cas d'erreur
        dispatch(setInitialized(true));
      }
    };

    // Initialiser seulement si pas encore fait
    if (!isInitialized) {
      initializeAuth();
    }
  }, [dispatch, isInitialized]);

  // Effet pour nettoyer les erreurs après un certain temps
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000); // Nettoyer l'erreur après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [authError, dispatch]);

  return {
    isAuthenticated,
    isInitialized,
    currentUser,
    authError,
    isLoading: !isInitialized
  };
};