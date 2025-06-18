/**
 * Constantes pour l'interface admin
 */

// Rôles utilisateur
export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner', 
  MANAGER: 'manager',
  STAFF: 'staff',
  PUBLIC: 'public'
};

// Statuts des commandes
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  SERVED: 'served',
  PAID: 'paid',
  CANCELLED: 'cancelled'
};

// Transitions de statuts autorisées pour les commandes
export const ORDER_STATUS_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.READY]: [ORDER_STATUS.SERVED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.SERVED]: [ORDER_STATUS.PAID],
  [ORDER_STATUS.PAID]: [], // État final
  [ORDER_STATUS.CANCELLED]: [] // État final
};

// Statuts des tables
export const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  CLEANING: 'cleaning',
  OUT_OF_SERVICE: 'out_of_service'
};

// Statuts des réservations
export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SEATED: 'seated',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
};

// Permissions
export const PERMISSIONS = {
  // Menu
  MANAGE_MENU: 'manage_menu',
  CREATE_MENU_ITEM: 'create_menu_item',
  UPDATE_MENU_ITEM: 'update_menu_item',
  DELETE_MENU_ITEM: 'delete_menu_item',
  VIEW_MENU: 'view_menu',
  
  // Commandes
  MANAGE_ORDERS: 'manage_orders',
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER: 'update_order',
  DELETE_ORDER: 'delete_order',
  VIEW_ORDERS: 'view_orders',
  
  // Tables
  MANAGE_TABLES: 'manage_tables',
  UPDATE_TABLE_STATUS: 'update_table_status',
  VIEW_FLOOR_PLAN: 'view_floor_plan',
  
  // Réservations
  MANAGE_RESERVATIONS: 'manage_reservations',
  CREATE_RESERVATION: 'create_reservation',
  UPDATE_RESERVATION: 'update_reservation',
  DELETE_RESERVATION: 'delete_reservation',
  VIEW_RESERVATIONS: 'view_reservations',
  
  // Utilisateurs
  MANAGE_USERS: 'manage_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  VIEW_USERS: 'view_users',
  
  // Analytics
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_DATA: 'export_data',
  
  // Paramètres
  MANAGE_SETTINGS: 'manage_settings'
};

// Couleurs pour les statuts
export const STATUS_COLORS = {
  // Commandes
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PREPARING]: 'primary',
  [ORDER_STATUS.READY]: 'success',
  [ORDER_STATUS.SERVED]: 'success',
  [ORDER_STATUS.PAID]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger',
  
  // Tables
  [TABLE_STATUS.AVAILABLE]: 'success',
  [TABLE_STATUS.OCCUPIED]: 'danger',
  [TABLE_STATUS.RESERVED]: 'warning',
  [TABLE_STATUS.CLEANING]: 'info',
  [TABLE_STATUS.OUT_OF_SERVICE]: 'dark',
  
  // Réservations
  [RESERVATION_STATUS.PENDING]: 'warning',
  [RESERVATION_STATUS.CONFIRMED]: 'success',
  [RESERVATION_STATUS.SEATED]: 'info',
  [RESERVATION_STATUS.COMPLETED]: 'primary',
  [RESERVATION_STATUS.CANCELLED]: 'danger',
  [RESERVATION_STATUS.NO_SHOW]: 'dark'
};

// Labels pour les statuts
export const STATUS_LABELS = {
  // Commandes
  [ORDER_STATUS.PENDING]: 'En attente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmée',
  [ORDER_STATUS.PREPARING]: 'En préparation',
  [ORDER_STATUS.READY]: 'Prête',
  [ORDER_STATUS.SERVED]: 'Servie',
  [ORDER_STATUS.PAID]: 'Payée',
  [ORDER_STATUS.CANCELLED]: 'Annulée',
  
  // Tables
  [TABLE_STATUS.AVAILABLE]: 'Disponible',
  [TABLE_STATUS.OCCUPIED]: 'Occupée',
  [TABLE_STATUS.RESERVED]: 'Réservée',
  [TABLE_STATUS.CLEANING]: 'Nettoyage',
  [TABLE_STATUS.OUT_OF_SERVICE]: 'Hors service',
  
  // Réservations
  [RESERVATION_STATUS.PENDING]: 'En attente',
  [RESERVATION_STATUS.CONFIRMED]: 'Confirmée',
  [RESERVATION_STATUS.SEATED]: 'Installée',
  [RESERVATION_STATUS.COMPLETED]: 'Terminée',
  [RESERVATION_STATUS.CANCELLED]: 'Annulée',
  [RESERVATION_STATUS.NO_SHOW]: 'Absence'
};

// Tailles de pagination par défaut
export const PAGINATION_SIZES = [10, 20, 50, 100];

// Configuration des notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Durées par défaut des notifications (ms)
export const NOTIFICATION_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
  PERSISTENT: 0 // Ne se ferme pas automatiquement
};

export default {
  USER_ROLES,
  ORDER_STATUS,
  ORDER_STATUS_TRANSITIONS,
  TABLE_STATUS,
  RESERVATION_STATUS,
  PERMISSIONS,
  STATUS_COLORS,
  STATUS_LABELS,
  PAGINATION_SIZES,
  NOTIFICATION_TYPES,
  NOTIFICATION_DURATIONS
};
