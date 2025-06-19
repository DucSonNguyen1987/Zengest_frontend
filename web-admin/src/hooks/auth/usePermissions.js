// web-admin/src/hooks/auth/usePermissions.js
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectUserRole } from '../../store/slices/authSlice';

/**
 * Vérifier si un utilisateur a une permission spécifique
 */
const hasPermission = (userRole, user, permission) => {
  if (!user || !permission) return false;
  
  // Les admins ont toutes les permissions
  if (userRole === 'admin') return true;
  
  // Vérifier dans les permissions de l'utilisateur
  if (user.permissions && Array.isArray(user.permissions)) {
    return user.permissions.includes(permission);
  }
  
  // Fallback basique par rôle
  const rolePermissions = {
    owner: [
      'manage_menu', 'manage_orders', 'manage_tables', 
      'manage_reservations', 'view_analytics', 'manage_users',
      'manage_restaurant', 'manage_settings', 'manage_staff',
      'manage_tasks'
    ],
    manager: [
      'manage_menu', 'manage_orders', 'manage_tables', 
      'manage_reservations', 'view_analytics', 'manage_staff'
    ],
    staff: [
      'view_menu', 'create_order', 'update_order', 
      'view_orders', 'update_table_status'
    ]
  };
  
  const userPermissions = rolePermissions[userRole] || [];
  return userPermissions.includes(permission);
};

/**
 * Vérifier si un utilisateur a l'une des permissions spécifiées
 */
const hasAnyPermission = (userRole, user, permissions) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, user, permission));
};

/**
 * Vérifier si un utilisateur a toutes les permissions spécifiées
 */
const hasAllPermissions = (userRole, user, permissions) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, user, permission));
};

/**
 * Hook pour la gestion des permissions utilisateur
 */
export const usePermissions = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userRole = useSelector(selectUserRole);

  const checkPermission = (permission) => {
    return hasPermission(userRole, currentUser, permission);
  };

  const checkAnyPermission = (permissions) => {
    return hasAnyPermission(userRole, currentUser, permissions);
  };

  const checkAllPermissions = (permissions) => {
    return hasAllPermissions(userRole, currentUser, permissions);
  };

  const canManageUsers = () => {
    return checkPermission('manage_users');
  };

  const canManageRestaurant = () => {
    return checkPermission('manage_restaurant');
  };

  const canManageMenu = () => {
    return checkPermission('manage_menu');
  };

  const canManageOrders = () => {
    return checkPermission('manage_orders');
  };

  const canManageTables = () => {
    return checkPermission('manage_tables');
  };

  const canManageReservations = () => {
    return checkPermission('manage_reservations');
  };

  const canViewAnalytics = () => {
    return checkPermission('view_analytics');
  };

  const canManageSettings = () => {
    return checkPermission('manage_settings');
  };

  const canManageStaff = () => {
    return checkPermission('manage_staff');
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  const isOwner = () => {
    return userRole === 'owner';
  };

  const isManager = () => {
    return userRole === 'manager';
  };

  const isStaff = () => {
    return userRole === 'staff';
  };

  return {
    userRole,
    currentUser,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    // Méthodes spécifiques
    canManageUsers,
    canManageRestaurant,
    canManageMenu,
    canManageOrders,
    canManageTables,
    canManageReservations,
    canViewAnalytics,
    canManageSettings,
    canManageStaff,
    // Vérifications de rôle
    isAdmin,
    isOwner,
    isManager,
    isStaff
  };
};