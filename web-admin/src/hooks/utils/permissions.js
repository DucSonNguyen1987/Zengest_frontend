/**
 * Vérifier si un utilisateur a une permission spécifique
 * @param {Object} user - L'utilisateur à vérifier
 * @param {string} permission - La permission à vérifier
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user) return false;
  
  // Les admins ont toutes les permissions
  if (user.role === 'admin') return true;
  
  // Vérifier dans les permissions de l'utilisateur
  if (user.permissions && Array.isArray(user.permissions)) {
    return user.permissions.includes(permission);
  }
  
  // Fallback basique par rôle (à adapter selon vos besoins)
  const rolePermissions = {
    owner: ['manage_menu', 'manage_orders', 'manage_tables', 'manage_reservations', 'view_analytics'],
    manager: ['manage_menu', 'manage_orders', 'manage_tables', 'manage_reservations'],
    staff: ['view_menu', 'create_order', 'update_order', 'view_orders', 'update_table_status']
  };
  
  const userPermissions = rolePermissions[user.role] || [];
  return userPermissions.includes(permission);
};

/**
 * Vérifier si un utilisateur a l'un des rôles spécifiés
 * @param {Object} user - L'utilisateur à vérifier
 * @param {Array<string>} roles - Les rôles autorisés
 * @returns {boolean}
 */
export const hasRole = (user, roles) => {
  if (!user || !roles) return false;
  return roles.includes(user.role);
};

/**
 * Vérifier si un utilisateur peut effectuer une action sur une ressource
 * @param {Object} user - L'utilisateur à vérifier
 * @param {string} action - L'action à effectuer
 * @param {Object} resource - La ressource (optionnel, pour vérifications contextuelles)
 * @returns {boolean}
 */
export const canPerformAction = (user, action, resource = null) => {
  if (!user) return false;
  
  // Logique spécifique selon l'action et la ressource
  // Par exemple, un staff ne peut modifier que ses propres commandes
  if (resource && resource.createdBy && user.role === 'staff') {
    return resource.createdBy === user._id && hasPermission(user, action);
  }
  
  return hasPermission(user, action);
};

export default {
  hasPermission,
  hasRole,
  canPerformAction
};