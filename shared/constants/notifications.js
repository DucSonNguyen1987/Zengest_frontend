// shared/constants/notifications.js - Types et configuration des notifications

// === TYPES DE NOTIFICATIONS ===
export const NOTIFICATION_TYPES = {
  // Système
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  
  // Réservations
  RESERVATION_CREATED: 'reservation_created',
  RESERVATION_CONFIRMED: 'reservation_confirmed',
  RESERVATION_CANCELLED: 'reservation_cancelled',
  RESERVATION_REMINDER: 'reservation_reminder',
  RESERVATION_NO_SHOW: 'reservation_no_show',
  
  // Commandes
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_READY: 'order_ready',
  ORDER_COMPLETED: 'order_completed',
  ORDER_CANCELLED: 'order_cancelled',
  
  // Tables
  TABLE_STATUS_CHANGED: 'table_status_changed',
  TABLE_ASSIGNED: 'table_assigned',
  
  // Utilisateurs
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PASSWORD_RESET: 'password_reset',
  
  // Menu
  MENU_UPDATED: 'menu_updated',
  DAILY_SPECIAL_CREATED: 'daily_special_created',
  DAILY_SPECIAL_APPROVED: 'daily_special_approved',
  
  // Système
  SYSTEM_BACKUP: 'system_backup',
  SYSTEM_ERROR: 'system_error',
  SYSTEM_MAINTENANCE: 'system_maintenance'
};

export const NOTIFICATION_TYPES_LIST = Object.values(NOTIFICATION_TYPES);

// === PRIORITÉS DES NOTIFICATIONS ===
export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical'
};

export const NOTIFICATION_PRIORITIES_LIST = Object.values(NOTIFICATION_PRIORITIES);

// === CANAUX DE NOTIFICATION ===
export const NOTIFICATION_CHANNELS = {
  IN_APP: 'in_app',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  WEBHOOK: 'webhook'
};

export const NOTIFICATION_CHANNELS_LIST = Object.values(NOTIFICATION_CHANNELS);

// === STATUTS DES NOTIFICATIONS ===
export const NOTIFICATION_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  EXPIRED: 'expired'
};

export const NOTIFICATION_STATUS_LIST = Object.values(NOTIFICATION_STATUS);

// === DURÉES D'AFFICHAGE (en millisecondes) ===
export const NOTIFICATION_DURATIONS = {
  SHORT: 3000,   // 3 secondes
  MEDIUM: 5000,  // 5 secondes
  LONG: 8000,    // 8 secondes
  PERSISTENT: 0  // Reste affiché jusqu'à fermeture manuelle
};

// === LABELS DES TYPES ===
export const NOTIFICATION_TYPE_LABELS = {
  [NOTIFICATION_TYPES.INFO]: 'Information',
  [NOTIFICATION_TYPES.SUCCESS]: 'Succès',
  [NOTIFICATION_TYPES.WARNING]: 'Avertissement',
  [NOTIFICATION_TYPES.ERROR]: 'Erreur',
  
  [NOTIFICATION_TYPES.RESERVATION_CREATED]: 'Réservation créée',
  [NOTIFICATION_TYPES.RESERVATION_CONFIRMED]: 'Réservation confirmée',
  [NOTIFICATION_TYPES.RESERVATION_CANCELLED]: 'Réservation annulée',
  [NOTIFICATION_TYPES.RESERVATION_REMINDER]: 'Rappel de réservation',
  [NOTIFICATION_TYPES.RESERVATION_NO_SHOW]: 'Client absent',
  
  [NOTIFICATION_TYPES.ORDER_CREATED]: 'Commande créée',
  [NOTIFICATION_TYPES.ORDER_UPDATED]: 'Commande mise à jour',
  [NOTIFICATION_TYPES.ORDER_READY]: 'Commande prête',
  [NOTIFICATION_TYPES.ORDER_COMPLETED]: 'Commande terminée',
  [NOTIFICATION_TYPES.ORDER_CANCELLED]: 'Commande annulée',
  
  [NOTIFICATION_TYPES.TABLE_STATUS_CHANGED]: 'Statut de table modifié',
  [NOTIFICATION_TYPES.TABLE_ASSIGNED]: 'Table assignée',
  
  [NOTIFICATION_TYPES.USER_CREATED]: 'Utilisateur créé',
  [NOTIFICATION_TYPES.USER_UPDATED]: 'Utilisateur mis à jour',
  [NOTIFICATION_TYPES.USER_LOGIN]: 'Connexion utilisateur',
  [NOTIFICATION_TYPES.USER_LOGOUT]: 'Déconnexion utilisateur',
  [NOTIFICATION_TYPES.PASSWORD_RESET]: 'Réinitialisation mot de passe',
  
  [NOTIFICATION_TYPES.MENU_UPDATED]: 'Menu mis à jour',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_CREATED]: 'Plat du jour créé',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_APPROVED]: 'Plat du jour approuvé',
  
  [NOTIFICATION_TYPES.SYSTEM_BACKUP]: 'Sauvegarde système',
  [NOTIFICATION_TYPES.SYSTEM_ERROR]: 'Erreur système',
  [NOTIFICATION_TYPES.SYSTEM_MAINTENANCE]: 'Maintenance système'
};

// === COULEURS DES TYPES ===
export const NOTIFICATION_TYPE_COLORS = {
  [NOTIFICATION_TYPES.INFO]: 'info',
  [NOTIFICATION_TYPES.SUCCESS]: 'success',
  [NOTIFICATION_TYPES.WARNING]: 'warning',
  [NOTIFICATION_TYPES.ERROR]: 'danger',
  
  [NOTIFICATION_TYPES.RESERVATION_CREATED]: 'info',
  [NOTIFICATION_TYPES.RESERVATION_CONFIRMED]: 'success',
  [NOTIFICATION_TYPES.RESERVATION_CANCELLED]: 'warning',
  [NOTIFICATION_TYPES.RESERVATION_REMINDER]: 'info',
  [NOTIFICATION_TYPES.RESERVATION_NO_SHOW]: 'danger',
  
  [NOTIFICATION_TYPES.ORDER_CREATED]: 'info',
  [NOTIFICATION_TYPES.ORDER_UPDATED]: 'info',
  [NOTIFICATION_TYPES.ORDER_READY]: 'success',
  [NOTIFICATION_TYPES.ORDER_COMPLETED]: 'success',
  [NOTIFICATION_TYPES.ORDER_CANCELLED]: 'warning',
  
  [NOTIFICATION_TYPES.TABLE_STATUS_CHANGED]: 'info',
  [NOTIFICATION_TYPES.TABLE_ASSIGNED]: 'success',
  
  [NOTIFICATION_TYPES.USER_CREATED]: 'success',
  [NOTIFICATION_TYPES.USER_UPDATED]: 'info',
  [NOTIFICATION_TYPES.USER_LOGIN]: 'info',
  [NOTIFICATION_TYPES.USER_LOGOUT]: 'secondary',
  [NOTIFICATION_TYPES.PASSWORD_RESET]: 'warning',
  
  [NOTIFICATION_TYPES.MENU_UPDATED]: 'info',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_CREATED]: 'success',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_APPROVED]: 'success',
  
  [NOTIFICATION_TYPES.SYSTEM_BACKUP]: 'info',
  [NOTIFICATION_TYPES.SYSTEM_ERROR]: 'danger',
  [NOTIFICATION_TYPES.SYSTEM_MAINTENANCE]: 'warning'
};

// === ICÔNES DES TYPES ===
export const NOTIFICATION_TYPE_ICONS = {
  [NOTIFICATION_TYPES.INFO]: 'information-circle',
  [NOTIFICATION_TYPES.SUCCESS]: 'check-circle',
  [NOTIFICATION_TYPES.WARNING]: 'exclamation-triangle',
  [NOTIFICATION_TYPES.ERROR]: 'x-circle',
  
  [NOTIFICATION_TYPES.RESERVATION_CREATED]: 'calendar-plus',
  [NOTIFICATION_TYPES.RESERVATION_CONFIRMED]: 'calendar-check',
  [NOTIFICATION_TYPES.RESERVATION_CANCELLED]: 'calendar-x',
  [NOTIFICATION_TYPES.RESERVATION_REMINDER]: 'bell',
  [NOTIFICATION_TYPES.RESERVATION_NO_SHOW]: 'user-x',
  
  [NOTIFICATION_TYPES.ORDER_CREATED]: 'shopping-cart',
  [NOTIFICATION_TYPES.ORDER_UPDATED]: 'edit',
  [NOTIFICATION_TYPES.ORDER_READY]: 'check',
  [NOTIFICATION_TYPES.ORDER_COMPLETED]: 'check-circle',
  [NOTIFICATION_TYPES.ORDER_CANCELLED]: 'x',
  
  [NOTIFICATION_TYPES.TABLE_STATUS_CHANGED]: 'table',
  [NOTIFICATION_TYPES.TABLE_ASSIGNED]: 'table',
  
  [NOTIFICATION_TYPES.USER_CREATED]: 'user-plus',
  [NOTIFICATION_TYPES.USER_UPDATED]: 'user-edit',
  [NOTIFICATION_TYPES.USER_LOGIN]: 'login',
  [NOTIFICATION_TYPES.USER_LOGOUT]: 'logout',
  [NOTIFICATION_TYPES.PASSWORD_RESET]: 'key',
  
  [NOTIFICATION_TYPES.MENU_UPDATED]: 'menu',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_CREATED]: 'star',
  [NOTIFICATION_TYPES.DAILY_SPECIAL_APPROVED]: 'check-star',
  
  [NOTIFICATION_TYPES.SYSTEM_BACKUP]: 'download',
  [NOTIFICATION_TYPES.SYSTEM_ERROR]: 'alert-circle',
  [NOTIFICATION_TYPES.SYSTEM_MAINTENANCE]: 'tool'
};

// === TEMPLATES D'EMAIL ===
export const EMAIL_TEMPLATES = {
  RESERVATION_CONFIRMATION: 'reservation_confirmation',
  RESERVATION_REMINDER: 'reservation_reminder',
  RESERVATION_CANCELLATION: 'reservation_cancellation',
  PASSWORD_RESET: 'password_reset',
  WELCOME: 'welcome',
  DAILY_SPECIAL_NOTIFICATION: 'daily_special_notification'
};

export const EMAIL_TEMPLATES_LIST = Object.values(EMAIL_TEMPLATES);

// === FONCTIONS UTILITAIRES ===
export const getNotificationDuration = (type, priority) => {
  if (priority === NOTIFICATION_PRIORITIES.CRITICAL || priority === NOTIFICATION_PRIORITIES.URGENT) {
    return NOTIFICATION_DURATIONS.PERSISTENT;
  }
  
  if (type === NOTIFICATION_TYPES.ERROR) {
    return NOTIFICATION_DURATIONS.LONG;
  }
  
  if (type === NOTIFICATION_TYPES.SUCCESS) {
    return NOTIFICATION_DURATIONS.MEDIUM;
  }
  
  return NOTIFICATION_DURATIONS.SHORT;
};

export const shouldAutoMarkAsRead = (type) => {
  return [
    NOTIFICATION_TYPES.SUCCESS,
    NOTIFICATION_TYPES.INFO
  ].includes(type);
};

export const requiresUserAction = (type) => {
  return [
    NOTIFICATION_TYPES.ERROR,
    NOTIFICATION_TYPES.SYSTEM_ERROR,
    NOTIFICATION_TYPES.PASSWORD_RESET
  ].includes(type);
};

export const getNotificationLabel = (type) => {
  return NOTIFICATION_TYPE_LABELS[type] || type;
};

export const getNotificationColor = (type) => {
  return NOTIFICATION_TYPE_COLORS[type] || 'secondary';
};

export const getNotificationIcon = (type) => {
  return NOTIFICATION_TYPE_ICONS[type] || 'bell';
};