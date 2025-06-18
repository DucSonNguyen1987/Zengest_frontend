// web-admin/src/components/auth/PublicRoute/PublicRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading } from '@/store/slices/authSlice';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';

// ========================================
// 🌐 ROUTE PUBLIQUE (NON AUTHENTIFIÉE)
// ========================================

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  
  // Afficher loading pendant la vérification
  if (isLoading) {
    return <LoadingSpinner fullscreen message="Vérification..." />;
  }
  
  // Rediriger vers dashboard si déjà authentifié
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Rendre le contenu ou les enfants
  return children ? children : <Outlet />;
};

export default PublicRoute;