// Protection des routes
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldExclamationIcon, 
  ExclamationTriangleIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

// Actions Redux
import { verifyToken } from '@/store/slices/authSlice';

// Sélecteurs
import {
  selectIsAuthenticated,
  selectIsInitialized,
  selectCurrentUser,
  selectIsLoading
} from '@/store/slices/authSlice';

// Composants
import PageLoader from '@/components/common/Loading/PageLoader';

// ========================================
// 🛡️ COMPOSANT ROUTE PROTÉGÉE
// ========================================

const ProtectedRoute = ({ children, fallback = null }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // États Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  
  // État local
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  
  // ========================================
  // 🔄 VÉRIFICATION D'AUTHENTIFICATION
  // ========================================
  
  useEffect(() => {
    const verifyAuthentication = async () => {
      // Si déjà initialisé et authentifié, ne pas re-vérifier
      if (isInitialized && isAuthenticated) {
        setVerificationAttempted(true);
        return;
      }
      
      // Vérifier le token stocké
      const token = localStorage.getItem('zengest_admin_token') || 
                   sessionStorage.getItem('zengest_admin_token');
      
      if (token && !verificationAttempted) {
        try {
          await dispatch(verifyToken()).unwrap();
        } catch (error) {
          console.warn('Échec de vérification du token:', error);
        }
      }
      
      setVerificationAttempted(true);
    };
    
    verifyAuthentication();
  }, [dispatch, isInitialized, isAuthenticated, verificationAttempted]);
  
  // ========================================
  // 🔄 ÉTATS DE CHARGEMENT
  // ========================================
  
  // Affichage du loader pendant la vérification
  if (!isInitialized || !verificationAttempted || isLoading) {
    return (
      <PageLoader 
        message="Vérification des autorisations..."
        showProgress={true}
      />
    );
  }
  
  // Redirection vers login si non authentifié
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }
  
  // Vérification du rôle utilisateur pour l'admin
  const allowedRoles = ['admin', 'owner', 'manager'];
  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    return <UnauthorizedAccess />;
  }
  
  // Rendu des enfants si tout est ok
  return children || fallback;
};

// ========================================
// 🚫 COMPOSANT ACCÈS NON AUTORISÉ
// ========================================

const UnauthorizedAccess = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  
  return (
    <div className="unauthorized-container">
      <motion.div
        className="unauthorized-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="unauthorized-icon">
          <ShieldExclamationIcon className="icon-large" />
        </div>
        
        <h1>Accès non autorisé</h1>
        <p>
          Votre compte ne dispose pas des autorisations nécessaires 
          pour accéder à l'interface d'administration.
        </p>
        
        <div className="unauthorized-actions">
          <motion.button
            className="button button-secondary"
            onClick={handleGoBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftIcon className="button-icon" />
            Retour
          </motion.button>
        </div>
        
        <div className="unauthorized-help">
          <p>
            Si vous pensez qu'il s'agit d'une erreur, contactez votre administrateur système.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// ========================================
// 🛡️ COMPOSANT GARDE DE RÔLE
// ========================================

export const RoleGuard = ({ 
  children, 
  requiredRoles = [], 
  requiredPermissions = [],
  requireAll = false,
  fallback = null,
  showError = true 
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Si pas connecté, ne pas afficher
  if (!isAuthenticated || !currentUser) {
    return fallback;
  }
  
  // Vérification des rôles
  const hasRequiredRole = () => {
    if (requiredRoles.length === 0) return true;
    
    // Admin a accès à tout
    if (currentUser.role === 'admin') return true;
    
    return requiredRoles.includes(currentUser.role);
  };
  
  // Vérification des permissions
  const hasRequiredPermissions = () => {
    if (requiredPermissions.length === 0) return true;
    
    // Admin a toutes les permissions
    if (currentUser.role === 'admin') return true;
    
    const userPermissions = currentUser.permissions || [];
    
    if (requireAll) {
      // Toutes les permissions requises
      return requiredPermissions.every(permission => 
        userPermissions.includes(permission)
      );
    } else {
      // Au moins une permission requise
      return requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      );
    }
  };
  
  // Vérifier les autorisations
  const hasAccess = hasRequiredRole() && hasRequiredPermissions();
  
  if (!hasAccess) {
    if (showError) {
      return <PermissionDenied requiredRoles={requiredRoles} requiredPermissions={requiredPermissions} />;
    }
    return fallback;
  }
  
  return children;
};

// ========================================
// 🚫 COMPOSANT PERMISSION REFUSÉE
// ========================================

const PermissionDenied = ({ requiredRoles = [], requiredPermissions = [] }) => {
  return (
    <motion.div
      className="permission-denied"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="permission-denied-content">
        <ExclamationTriangleIcon className="permission-icon" />
        <h3>Autorisation insuffisante</h3>
        <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette section.</p>
        
        {(requiredRoles.length > 0 || requiredPermissions.length > 0) && (
          <div className="permission-details">
            {requiredRoles.length > 0 && (
              <div className="permission-requirement">
                <strong>Rôles requis :</strong>
                <ul>
                  {requiredRoles.map(role => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {requiredPermissions.length > 0 && (
              <div className="permission-requirement">
                <strong>Permissions requises :</strong>
                <ul>
                  {requiredPermissions.map(permission => (
                    <li key={permission}>{permission}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ========================================
// 🛡️ HOOK D'AUTORISATION
// ========================================

export const useAuthorization = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const hasRole = (role) => {
    if (!isAuthenticated || !currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return currentUser.role === role;
  };
  
  const hasAnyRole = (roles) => {
    if (!isAuthenticated || !currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return roles.includes(currentUser.role);
  };
  
  const hasPermission = (permission) => {
    if (!isAuthenticated || !currentUser) return false;
    if (currentUser.role === 'admin') return true;
    
    const userPermissions = currentUser.permissions || [];
    return userPermissions.includes(permission);
  };
  
  const hasAllPermissions = (permissions) => {
    if (!isAuthenticated || !currentUser) return false;
    if (currentUser.role === 'admin') return true;
    
    const userPermissions = currentUser.permissions || [];
    return permissions.every(permission => userPermissions.includes(permission));
  };
  
  const hasAnyPermission = (permissions) => {
    if (!isAuthenticated || !currentUser) return false;
    if (currentUser.role === 'admin') return true;
    
    const userPermissions = currentUser.permissions || [];
    return permissions.some(permission => userPermissions.includes(permission));
  };
  
  const canAccess = (requiredRoles = [], requiredPermissions = [], requireAll = false) => {
    if (!isAuthenticated || !currentUser) return false;
    
    // Vérifier les rôles
    const roleCheck = requiredRoles.length === 0 || hasAnyRole(requiredRoles);
    
    // Vérifier les permissions
    let permissionCheck = true;
    if (requiredPermissions.length > 0) {
      permissionCheck = requireAll 
        ? hasAllPermissions(requiredPermissions)
        : hasAnyPermission(requiredPermissions);
    }
    
    return roleCheck && permissionCheck;
  };
  
  return {
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    canAccess,
    currentUser,
    isAuthenticated
  };
};

// ========================================
// 🛡️ HOC POUR PROTECTION DE COMPOSANTS
// ========================================

export const withAuthorization = (
  WrappedComponent, 
  requiredRoles = [], 
  requiredPermissions = [],
  options = {}
) => {
  const AuthorizedComponent = (props) => {
    return (
      <RoleGuard
        requiredRoles={requiredRoles}
        requiredPermissions={requiredPermissions}
        requireAll={options.requireAll}
        showError={options.showError !== false}
        fallback={options.fallback}
      >
        <WrappedComponent {...props} />
      </RoleGuard>
    );
  };
  
  AuthorizedComponent.displayName = `withAuthorization(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return AuthorizedComponent;
};

export default ProtectedRoute;