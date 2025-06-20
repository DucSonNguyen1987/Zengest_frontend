// ========================================
// 🔧 CONSTANTS.JS - CONSTANTES UNIFIÉES ZENGEST ADMIN
// ========================================
// Fichier: web-admin/src/utils/constants.js
//
// Constantes unifiées pour l'interface d'administration Zengest
// incluant les rôles, statuts, permissions et configurations.

// ========================================
// 👥 RÔLES UTILISATEUR
// ========================================

export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  MANAGER: 'manager',
  STAFF_FLOOR: 'staff_floor',
  STAFF_BAR: 'staff_bar',
  STAFF_KITCHEN: 'staff_kitchen',
  STAFF: 'staff', // Rôle générique staff
  PUBLIC: 'public',
  GUEST: 'guest'
};

// Liste des rôles pour validation
export const USER_ROLES_LIST = Object.values(USER_ROLES);

// Rôles avec permissions étendues
export const MANAGEMENT_ROLES = [
  USER_ROLES.ADMIN, 
  USER_ROLES.OWNER, 
  USER_ROLES.MANAGER
];

export const STAFF_ROLES = [
  USER_ROLES.STAFF_FLOOR,
  USER_ROLES.STAFF_BAR,
  USER_ROLES.STAFF_KITCHEN,
  USER_ROLES.STAFF
];

export const ALL_STAFF_ROLES = [
  ...MANAGEMENT_ROLES,
  ...STAFF_ROLES
];

// ========================================
// 📦 STATUTS DES COMMANDES
// ========================================

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  SERVED: 'served',
  PAID: 'paid',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LIST = Object.values(ORDER_STATUS);

// Statuts actifs (commandes en cours)
export const ACTIVE_ORDER_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY
];

// Statuts finaux (commandes terminées)
export const FINAL_ORDER_STATUSES = [
  ORDER_STATUS.PAID,
  ORDER_STATUS.CANCELLED
];

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

// ========================================
// 🪑 STATUTS DES TABLES
// ========================================

export const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  CLEANING: 'cleaning',
  OUT_OF_SERVICE: 'out_of_service'
};

export const TABLE_STATUS_LIST = Object.values(TABLE_STATUS);

// Formes de tables
export const TABLE_SHAPES = {
  ROUND: 'round',
  SQUARE: 'square',
  RECTANGLE: 'rectangle',
  OVAL: 'oval'
};

export const TABLE_SHAPES_LIST = Object.values(TABLE_SHAPES);

// ========================================
// 📅 STATUTS DES RÉSERVATIONS
// ========================================

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SEATED: 'seated',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
};

export const RESERVATION_STATUS_LIST = Object.values(RESERVATION_STATUS);

// Statuts actifs pour les réservations
export const ACTIVE_RESERVATION_STATUSES = [
  RESERVATION_STATUS.PENDING,
  RESERVATION_STATUS.CONFIRMED,
  RESERVATION_STATUS.SEATED
];

// ========================================
// 🔐 PERMISSIONS
// ========================================

export const PERMISSIONS = {
  // Gestion Restaurant
  MANAGE_RESTAURANT: 'manage_restaurant',
  VIEW_RESTAURANT: 'view_restaurant',
  UPDATE_RESTAURANT_SETTINGS: 'update_restaurant_settings',

  // Gestion Utilisateurs
  MANAGE_USERS: 'manage_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  VIEW_USERS: 'view_users',
  MANAGE_ROLES: 'manage_roles',

  // Gestion Menu
  MANAGE_MENU: 'manage_menu',
  CREATE_MENU_ITEM: 'create_menu_item',
  UPDATE_MENU_ITEM: 'update_menu_item',
  DELETE_MENU_ITEM: 'delete_menu_item',
  VIEW_MENU: 'view_menu',
  MANAGE_CATEGORIES: 'manage_categories',
  UPDATE_PRICES: 'update_prices',

  // Plats du Jour
  MANAGE_DAILY_SPECIALS: 'manage_daily_specials',
  CREATE_DAILY_SPECIAL: 'create_daily_special',
  UPDATE_DAILY_SPECIAL: 'update_daily_special',
  DELETE_DAILY_SPECIAL: 'delete_daily_special',
  APPROVE_DAILY_SPECIAL: 'approve_daily_special',
  VIEW_DAILY_SPECIALS: 'view_daily_specials',

  // Gestion Commandes
  MANAGE_ORDERS: 'manage_orders',
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER: 'update_order',
  DELETE_ORDER: 'delete_order',
  VIEW_ORDERS: 'view_orders',
  PROCESS_PAYMENT: 'process_payment',

  // Gestion Tables
  MANAGE_TABLES: 'manage_tables',
  UPDATE_TABLE_STATUS: 'update_table_status',
  VIEW_FLOOR_PLAN: 'view_floor_plan',
  EDIT_FLOOR_PLAN: 'edit_floor_plan',

  // Gestion Réservations
  MANAGE_RESERVATIONS: 'manage_reservations',
  CREATE_RESERVATION: 'create_reservation',
  UPDATE_RESERVATION: 'update_reservation',
  DELETE_RESERVATION: 'delete_reservation',
  VIEW_RESERVATIONS: 'view_reservations',
  ASSIGN_TABLE: 'assign_table',

  // Notifications
  MANAGE_NOTIFICATIONS: 'manage_notifications',
  SEND_NOTIFICATION: 'send_notification',
  VIEW_NOTIFICATION_HISTORY: 'view_notification_history',

  // Analytics et Rapports
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REVENUE_REPORTS: 'view_revenue_reports',
  VIEW_CUSTOMER_ANALYTICS: 'view_customer_analytics',
  EXPORT_DATA: 'export_data',

  // Paramètres
  MANAGE_SETTINGS: 'manage_settings',
  UPDATE_SITE_VITRINE: 'update_site_vitrine',
  MANAGE_MOBILE_APP: 'manage_mobile_app',

  // Système
  SYSTEM_ADMIN: 'system_admin'
};

export const PERMISSIONS_LIST = Object.values(PERMISSIONS);

// ========================================
// 🎭 MAPPING RÔLES → PERMISSIONS
// ========================================

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['*'], // Toutes les permissions
  
  [USER_ROLES.OWNER]: [
    PERMISSIONS.MANAGE_RESTAURANT,
    PERMISSIONS.VIEW_RESTAURANT,
    PERMISSIONS.UPDATE_RESTAURANT_SETTINGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.MANAGE_MENU,
    PERMISSIONS.CREATE_MENU_ITEM,
    PERMISSIONS.UPDATE_MENU_ITEM,
    PERMISSIONS.DELETE_MENU_ITEM,
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_CATEGORIES,
    PERMISSIONS.UPDATE_PRICES,
    PERMISSIONS.MANAGE_DAILY_SPECIALS,
    PERMISSIONS.CREATE_DAILY_SPECIAL,
    PERMISSIONS.UPDATE_DAILY_SPECIAL,
    PERMISSIONS.DELETE_DAILY_SPECIAL,
    PERMISSIONS.APPROVE_DAILY_SPECIAL,
    PERMISSIONS.VIEW_DAILY_SPECIALS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.DELETE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.MANAGE_TABLES,
    PERMISSIONS.UPDATE_TABLE_STATUS,
    PERMISSIONS.VIEW_FLOOR_PLAN,
    PERMISSIONS.EDIT_FLOOR_PLAN,
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.CREATE_RESERVATION,
    PERMISSIONS.UPDATE_RESERVATION,
    PERMISSIONS.DELETE_RESERVATION,
    PERMISSIONS.VIEW_RESERVATIONS,
    PERMISSIONS.ASSIGN_TABLE,
    PERMISSIONS.MANAGE_NOTIFICATIONS,
    PERMISSIONS.SEND_NOTIFICATION,
    PERMISSIONS.VIEW_NOTIFICATION_HISTORY,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REVENUE_REPORTS,
    PERMISSIONS.VIEW_CUSTOMER_ANALYTICS,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.UPDATE_SITE_VITRINE,
    PERMISSIONS.MANAGE_MOBILE_APP
  ],
  
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.VIEW_RESTAURANT,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_MENU,
    PERMISSIONS.CREATE_MENU_ITEM,
    PERMISSIONS.UPDATE_MENU_ITEM,
    PERMISSIONS.DELETE_MENU_ITEM,
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_CATEGORIES,
    PERMISSIONS.UPDATE_PRICES,
    PERMISSIONS.MANAGE_DAILY_SPECIALS,
    PERMISSIONS.CREATE_DAILY_SPECIAL,
    PERMISSIONS.UPDATE_DAILY_SPECIAL,
    PERMISSIONS.DELETE_DAILY_SPECIAL,
    PERMISSIONS.APPROVE_DAILY_SPECIAL,
    PERMISSIONS.VIEW_DAILY_SPECIALS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.MANAGE_TABLES,
    PERMISSIONS.UPDATE_TABLE_STATUS,
    PERMISSIONS.VIEW_FLOOR_PLAN,
    PERMISSIONS.EDIT_FLOOR_PLAN,
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.CREATE_RESERVATION,
    PERMISSIONS.UPDATE_RESERVATION,
    PERMISSIONS.DELETE_RESERVATION,
    PERMISSIONS.VIEW_RESERVATIONS,
    PERMISSIONS.ASSIGN_TABLE,
    PERMISSIONS.SEND_NOTIFICATION,
    PERMISSIONS.VIEW_NOTIFICATION_HISTORY,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REVENUE_REPORTS,
    PERMISSIONS.EXPORT_DATA
  ],
  
  [USER_ROLES.STAFF_FLOOR]: [
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_TABLES,
    PERMISSIONS.UPDATE_TABLE_STATUS,
    PERMISSIONS.VIEW_FLOOR_PLAN,
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.CREATE_RESERVATION,
    PERMISSIONS.UPDATE_RESERVATION,
    PERMISSIONS.VIEW_RESERVATIONS,
    PERMISSIONS.ASSIGN_TABLE
  ],
  
  [USER_ROLES.STAFF_BAR]: [
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_FLOOR_PLAN
  ],
  
  [USER_ROLES.STAFF_KITCHEN]: [
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_DAILY_SPECIALS
  ],
  
  [USER_ROLES.STAFF]: [
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_TABLES,
    PERMISSIONS.UPDATE_TABLE_STATUS,
    PERMISSIONS.VIEW_FLOOR_PLAN
  ],
  
  [USER_ROLES.PUBLIC]: [
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.CREATE_RESERVATION
  ],
  
  [USER_ROLES.GUEST]: [
    PERMISSIONS.VIEW_MENU
  ]
};

// ========================================
// 🎨 COULEURS DES STATUTS
// ========================================

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
  [RESERVATION_STATUS.CONFIRMED]: 'info',
  [RESERVATION_STATUS.SEATED]: 'primary',
  [RESERVATION_STATUS.COMPLETED]: 'success',
  [RESERVATION_STATUS.CANCELLED]: 'danger',
  [RESERVATION_STATUS.NO_SHOW]: 'dark'
};

// ========================================
// 🏷️ LABELS DES STATUTS
// ========================================

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

// ========================================
// 📄 PAGINATION
// ========================================

export const PAGINATION_SIZES = [10, 20, 50, 100];

export const DEFAULT_PAGE_SIZE = 20;

export const MAX_PAGE_SIZE = 100;

// ========================================
// 🔔 NOTIFICATIONS
// ========================================

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const NOTIFICATION_TYPES_LIST = Object.values(NOTIFICATION_TYPES);

// Durées par défaut des notifications (ms)
export const NOTIFICATION_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
  PERSISTENT: 0 // Ne se ferme pas automatiquement
};

// ========================================
// 💳 MÉTHODES DE PAIEMENT
// ========================================

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  CONTACTLESS: 'contactless',
  MOBILE: 'mobile',
  CHECK: 'check',
  VOUCHER: 'voucher'
};

export const PAYMENT_METHODS_LIST = Object.values(PAYMENT_METHODS);

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS);

// ========================================
// 🍽️ TYPES DE SERVICE
// ========================================

export const SERVICE_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
  DRIVE_THROUGH: 'drive_through'
};

export const SERVICE_TYPES_LIST = Object.values(SERVICE_TYPES);

// ========================================
// 📱 TYPES DE DONNÉES
// ========================================

export const DATA_SOURCES = {
  POS: 'pos',
  ONLINE: 'online',
  PHONE: 'phone',
  WALK_IN: 'walk_in',
  SYSTEM: 'system',
  MOBILE_APP: 'mobile_app'
};

export const DATA_SOURCES_LIST = Object.values(DATA_SOURCES);

// ========================================
// 🌍 LANGUES ET DEVISES
// ========================================

export const LANGUAGES = {
  FRENCH: 'fr',
  ENGLISH: 'en',
  SPANISH: 'es',
  ITALIAN: 'it',
  GERMAN: 'de'
};

export const LANGUAGES_LIST = Object.values(LANGUAGES);

export const CURRENCIES = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
  CHF: 'CHF'
};

export const CURRENCIES_LIST = Object.values(CURRENCIES);

// ========================================
// 🎯 NIVEAUX DE PRIORITÉ
// ========================================

export const PRIORITY_LEVELS = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const PRIORITY_LIST = Object.values(PRIORITY_LEVELS);

// ========================================
// 📊 TYPES D'OBSTACLES (FLOOR PLAN)
// ========================================

export const OBSTACLE_TYPES = {
  WALL: 'wall',
  COLUMN: 'column',
  DOOR: 'door',
  WINDOW: 'window',
  BAR: 'bar',
  KITCHEN: 'kitchen',
  RESTROOM: 'restroom',
  DECORATION: 'decoration'
};

export const OBSTACLE_TYPES_LIST = Object.values(OBSTACLE_TYPES);

// ========================================
// 🍽️ CATÉGORIES DE MENU
// ========================================

export const MENU_CATEGORIES = {
  APPETIZERS: 'appetizers',
  MAINS: 'mains',
  DESSERTS: 'desserts',
  BEVERAGES: 'beverages',
  ALCOHOLIC: 'alcoholic',
  HOT_DRINKS: 'hot_drinks',
  SPECIALS: 'specials',
  KIDS: 'kids'
};

export const MENU_CATEGORIES_LIST = Object.values(MENU_CATEGORIES);

// ========================================
// 🔧 FONCTIONS UTILITAIRES
// ========================================

/**
 * Vérifier si un rôle est valide
 */
export const isValidRole = (role) => {
  return USER_ROLES_LIST.includes(role?.toLowerCase());
};

/**
 * Normaliser un rôle (en minuscules)
 */
export const normalizeRole = (role) => {
  if (!role) return null;
  const normalized = role.toLowerCase();
  return isValidRole(normalized) ? normalized : null;
};

/**
 * Obtenir les permissions d'un rôle
 */
export const getPermissionsForRole = (role) => {
  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) return [];
  
  const permissions = ROLE_PERMISSIONS[normalizedRole] || [];
  
  // Si l'utilisateur a toutes les permissions (admin)
  if (permissions.includes('*')) {
    return PERMISSIONS_LIST;
  }
  
  return permissions;
};

/**
 * Vérifier si un rôle a une permission
 */
export const roleHasPermission = (role, permission) => {
  const permissions = getPermissionsForRole(role);
  return permissions.includes(permission) || permissions.includes('*');
};

/**
 * Vérifier si un utilisateur a une permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  return roleHasPermission(user.role, permission);
};

/**
 * Vérifier si un statut de commande est actif
 */
export const isActiveOrderStatus = (status) => {
  return ACTIVE_ORDER_STATUSES.includes(status);
};

/**
 * Vérifier si une transition de statut est autorisée
 */
export const isValidStatusTransition = (currentStatus, newStatus) => {
  const allowedTransitions = ORDER_STATUS_TRANSITIONS[currentStatus] || [];
  return allowedTransitions.includes(newStatus);
};

/**
 * Obtenir les statuts suivants possibles
 */
export const getNextStatuses = (currentStatus) => {
  return ORDER_STATUS_TRANSITIONS[currentStatus] || [];
};

/**
 * Vérifier si un rôle est de niveau management
 */
export const isManagementRole = (role) => {
  const normalizedRole = normalizeRole(role);
  return MANAGEMENT_ROLES.includes(normalizedRole);
};

/**
 * Vérifier si un rôle est de niveau staff
 */
export const isStaffRole = (role) => {
  const normalizedRole = normalizeRole(role);
  return STAFF_ROLES.includes(normalizedRole);
};

/**
 * Obtenir la couleur d'un statut
 */
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || 'secondary';
};

/**
 * Obtenir le label d'un statut
 */
export const getStatusLabel = (status) => {
  return STATUS_LABELS[status] || status;
};

/**
 * Obtenir la liste des rôles accessibles pour un utilisateur
 */
export const getAccessibleRoles = (userRole) => {
  const normalizedRole = normalizeRole(userRole);
  
  switch (normalizedRole) {
    case USER_ROLES.ADMIN:
      return USER_ROLES_LIST;
    case USER_ROLES.OWNER:
      return [
        USER_ROLES.OWNER,
        USER_ROLES.MANAGER,
        ...STAFF_ROLES
      ];
    case USER_ROLES.MANAGER:
      return STAFF_ROLES;
    default:
      return [];
  }
};

// ========================================
// 📤 EXPORT PAR DÉFAUT
// ========================================

export default {
  // Rôles
  USER_ROLES,
  USER_ROLES_LIST,
  MANAGEMENT_ROLES,
  STAFF_ROLES,
  ALL_STAFF_ROLES,
  
  // Statuts
  ORDER_STATUS,
  ORDER_STATUS_LIST,
  ACTIVE_ORDER_STATUSES,
  FINAL_ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS,
  TABLE_STATUS,
  TABLE_STATUS_LIST,
  TABLE_SHAPES,
  TABLE_SHAPES_LIST,
  RESERVATION_STATUS,
  RESERVATION_STATUS_LIST,
  ACTIVE_RESERVATION_STATUSES,
  
  // Permissions
  PERMISSIONS,
  PERMISSIONS_LIST,
  ROLE_PERMISSIONS,
  
  // Affichage
  STATUS_COLORS,
  STATUS_LABELS,
  
  // Pagination
  PAGINATION_SIZES,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  
  // Notifications
  NOTIFICATION_TYPES,
  NOTIFICATION_TYPES_LIST,
  NOTIFICATION_DURATIONS,
  
  // Paiements
  PAYMENT_METHODS,
  PAYMENT_METHODS_LIST,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LIST,
  
  // Autres
  SERVICE_TYPES,
  SERVICE_TYPES_LIST,
  DATA_SOURCES,
  DATA_SOURCES_LIST,
  LANGUAGES,
  LANGUAGES_LIST,
  CURRENCIES,
  CURRENCIES_LIST,
  PRIORITY_LEVELS,
  PRIORITY_LIST,
  OBSTACLE_TYPES,
  OBSTACLE_TYPES_LIST,
  MENU_CATEGORIES,
  MENU_CATEGORIES_LIST,
  
  // Fonctions utilitaires
  isValidRole,
  normalizeRole,
  getPermissionsForRole,
  roleHasPermission,
  hasPermission,
  isActiveOrderStatus,
  isValidStatusTransition,
  getNextStatuses,
  isManagementRole,
  isStaffRole,
  getStatusColor,
  getStatusLabel,
  getAccessibleRoles
};