import { useSelector } from 'react-redux';
import { selectCurrentUser, selectUserRole } from '../../store/slices/authSlice';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../../../shared/utils/permissions';

/**
 * Hook pour la gestion des permissions utilisateur
 */
export const usePermissions = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userRole = useSelector(selectUserRole);

  const checkPermission = (permission) => {
    return hasPermission(userRole, permission);
  };

  const checkAnyPermission = (permissions) => {
    return hasAnyPermission(userRole, permissions);
  };

  const checkAllPermissions = (permissions) => {
    return hasAllPermissions(userRole, permissions);
  };

  const canManageUsers = () => {
    return checkPermission('manage_users');
  };

  const canManageRestaurant = () => {
    return checkPermission('manage_restaurant');
  };

  const canViewAnalytics = () => {
    return checkPermission('view_analytics');
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  const isOwner = () => {
    return userRole === 'owner';
  };

  return {
    userRole,
    currentUser,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    canManageUsers,
    canManageRestaurant,
    canViewAnalytics,
    isAdmin,
    isOwner
  };
};