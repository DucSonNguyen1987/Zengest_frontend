// shared/constants/permissions.js - Constantes des permissions

// === PERMISSIONS SYSTÈME ===
export const PERMISSIONS = {
  // === GESTION RESTAURANT ===
  MANAGE_RESTAURANT: 'manage_restaurant',
  VIEW_RESTAURANT: 'view_restaurant',
  UPDATE_RESTAURANT_SETTINGS: 'update_restaurant_settings',

  // === GESTION UTILISATEURS ===
  MANAGE_USERS: 'manage_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  VIEW_USERS: 'view_users',
  MANAGE_ROLES: 'manage_roles',

  // === GESTION MENU ===
  MANAGE_MENU: 'manage_menu',
  CREATE_MENU_ITEM: 'create_menu_item',
  UPDATE_MENU_ITEM: 'update_menu_item',
  DELETE_MENU_ITEM: 'delete_menu_item',
  VIEW_MENU: 'view_menu',
  MANAGE_CATEGORIES: 'manage_categories',
  UPDATE_PRICES: 'update_prices',

  // === PLATS DU JOUR ===
  MANAGE_DAILY_SPECIALS: 'manage_daily_specials',
  CREATE_DAILY_SPECIAL: 'create_daily_special',
  UPDATE_DAILY_SPECIAL: 'update_daily_special',
  DELETE_DAILY_SPECIAL: 'delete_daily_special',
  APPROVE_DAILY_SPECIAL: 'approve_daily_special',
  VIEW_DAILY_SPECIALS: 'view_daily_specials',

  // === GESTION COMMANDES ===
  MANAGE_ORDERS: 'manage_orders',
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER: 'update_order',
  DELETE_ORDER: 'delete_order',
  VIEW_ORDERS: 'view_orders',
  PROCESS_PAYMENT: 'process_payment',
  REFUND_ORDER: 'refund_order',

  // === GESTION TABLES ===
  MANAGE_TABLES: 'manage_tables',
  CREATE_TABLE: 'create_table',
  UPDATE_TABLE: 'update_table',
  DELETE_TABLE: 'delete_table',
  UPDATE_TABLE_STATUS: 'update_table_status',
  VIEW_FLOOR_PLAN: 'view_floor_plan',
  EDIT_FLOOR_PLAN: 'edit_floor_plan',

  // === GESTION RÉSERVATIONS ===
  MANAGE_RESERVATIONS: 'manage_reservations',
  CREATE_RESERVATION: 'create_reservation',
  UPDATE_RESERVATION: 'update_reservation',
  DELETE_RESERVATION: 'delete_reservation',
  VIEW_RESERVATIONS: 'view_reservations',
  ASSIGN_TABLE: 'assign_table',
  CONFIRM_RESERVATION: 'confirm_reservation',
  CANCEL_RESERVATION: 'cancel_reservation',

  // === NOTIFICATIONS ===
  MANAGE_NOTIFICATIONS: 'manage_notifications',
  SEND_NOTIFICATION: 'send_notification',
  VIEW_NOTIFICATION_HISTORY: 'view_notification_history',
  CREATE_NOTIFICATION_TEMPLATE: 'create_notification_template',

  // === ANALYTICS ET RAPPORTS ===
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REVENUE_REPORTS: 'view_revenue_reports',
  VIEW_CUSTOMER_ANALYTICS: 'view_customer_analytics',
  VIEW_STAFF_PERFORMANCE: 'view_staff_performance',
  EXPORT_DATA: 'export_data',
  CREATE_REPORTS: 'create_reports',

  // === PARAMÈTRES ===
  MANAGE_SETTINGS: 'manage_settings',
  UPDATE_SITE_VITRINE: 'update_site_vitrine',
  MANAGE_MOBILE_APP: 'manage_mobile_app',
  CONFIGURE_INTEGRATIONS: 'configure_integrations',

  // === SYSTÈME ===
  SYSTEM_ADMIN: 'system_admin',
  VIEW_LOGS: 'view_logs',
  MANAGE_BACKUPS: 'manage_backups',
  SYSTEM_MAINTENANCE: 'system_maintenance'
};

// === LISTE DES PERMISSIONS ===
export const PERMISSIONS_LIST = Object.values(PERMISSIONS);

// === GROUPES DE PERMISSIONS ===
export const PERMISSION_GROUPS = {
  RESTAURANT: [
    PERMISSIONS.MANAGE_RESTAURANT,
    PERMISSIONS.VIEW_RESTAURANT,
    PERMISSIONS.UPDATE_RESTAURANT_SETTINGS
  ],
  
  USERS: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_ROLES
  ],
  
  MENU: [
    PERMISSIONS.MANAGE_MENU,
    PERMISSIONS.CREATE_MENU_ITEM,
    PERMISSIONS.UPDATE_MENU_ITEM,
    PERMISSIONS.DELETE_MENU_ITEM,
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.MANAGE_CATEGORIES,
    PERMISSIONS.UPDATE_PRICES
  ],
  
  DAILY_SPECIALS: [
    PERMISSIONS.MANAGE_DAILY_SPECIALS,
    PERMISSIONS.CREATE_DAILY_SPECIAL,
    PERMISSIONS.UPDATE_DAILY_SPECIAL,
    PERMISSIONS.DELETE_DAILY_SPECIAL,
    PERMISSIONS.APPROVE_DAILY_SPECIAL,
    PERMISSIONS.VIEW_DAILY_SPECIALS
  ],
  
  ORDERS: [
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.DELETE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.REFUND_ORDER
  ],
  
  TABLES: [
    PERMISSIONS.MANAGE_TABLES,
    PERMISSIONS.CREATE_TABLE,
    PERMISSIONS.UPDATE_TABLE,
    PERMISSIONS.DELETE_TABLE,
    PERMISSIONS.UPDATE_TABLE_STATUS,
    PERMISSIONS.VIEW_FLOOR_PLAN,
    PERMISSIONS.EDIT_FLOOR_PLAN
  ],
  
  RESERVATIONS: [
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.CREATE_RESERVATION,
    PERMISSIONS.UPDATE_RESERVATION,
    PERMISSIONS.DELETE_RESERVATION,
    PERMISSIONS.VIEW_RESERVATIONS,
    PERMISSIONS.ASSIGN_TABLE,
    PERMISSIONS.CONFIRM_RESERVATION,
    PERMISSIONS.CANCEL_RESERVATION
  ],
  
  NOTIFICATIONS: [
    PERMISSIONS.MANAGE_NOTIFICATIONS,
    PERMISSIONS.SEND_NOTIFICATION,
    PERMISSIONS.VIEW_NOTIFICATION_HISTORY,
    PERMISSIONS.CREATE_NOTIFICATION_TEMPLATE
  ],
  
  ANALYTICS: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REVENUE_REPORTS,
    PERMISSIONS.VIEW_CUSTOMER_ANALYTICS,
    PERMISSIONS.VIEW_STAFF_PERFORMANCE,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.CREATE_REPORTS
  ],
  
  SETTINGS: [
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.UPDATE_SITE_VITRINE,
    PERMISSIONS.MANAGE_MOBILE_APP,
    PERMISSIONS.CONFIGURE_INTEGRATIONS
  ],
  
  SYSTEM: [
    PERMISSIONS.SYSTEM_ADMIN,
    PERMISSIONS.VIEW_LOGS,
    PERMISSIONS.MANAGE_BACKUPS,
    PERMISSIONS.SYSTEM_MAINTENANCE
  ]
};

// === LABELS DES PERMISSIONS ===
export const PERMISSIONS_LABELS = {
  // Restaurant
  [PERMISSIONS.MANAGE_RESTAURANT]: 'Gérer le restaurant',
  [PERMISSIONS.VIEW_RESTAURANT]: 'Voir les informations du restaurant',
  [PERMISSIONS.UPDATE_RESTAURANT_SETTINGS]: 'Modifier les paramètres du restaurant',
  
  // Utilisateurs
  [PERMISSIONS.MANAGE_USERS]: 'Gérer les utilisateurs',
  [PERMISSIONS.CREATE_USER]: 'Créer un utilisateur',
  [PERMISSIONS.UPDATE_USER]: 'Modifier un utilisateur',
  [PERMISSIONS.DELETE_USER]: 'Supprimer un utilisateur',
  [PERMISSIONS.VIEW_USERS]: 'Voir les utilisateurs',
  [PERMISSIONS.MANAGE_ROLES]: 'Gérer les rôles',
  
  // Menu
  [PERMISSIONS.MANAGE_MENU]: 'Gérer le menu',
  [PERMISSIONS.CREATE_MENU_ITEM]: 'Créer un élément de menu',
  [PERMISSIONS.UPDATE_MENU_ITEM]: 'Modifier un élément de menu',
  [PERMISSIONS.DELETE_MENU_ITEM]: 'Supprimer un élément de menu',
  [PERMISSIONS.VIEW_MENU]: 'Voir le menu',
  [PERMISSIONS.MANAGE_CATEGORIES]: 'Gérer les catégories',
  [PERMISSIONS.UPDATE_PRICES]: 'Modifier les prix',
  
  // Et ainsi de suite pour toutes les permissions...
};

// === FONCTIONS UTILITAIRES ===
export const isValidPermission = (permission) => {
  return PERMISSIONS_LIST.includes(permission);
};

export const getPermissionLabel = (permission) => {
  return PERMISSIONS_LABELS[permission] || permission;
};

export const getPermissionsByGroup = (groupName) => {
  return PERMISSION_GROUPS[groupName] || [];
};

export const getAllPermissionGroups = () => {
  return Object.keys(PERMISSION_GROUPS);
};