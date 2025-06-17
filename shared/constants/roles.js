export const ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  MANAGER: 'manager',
  STAFF: 'staff',
  PUBLIC: 'public'
};

export const USER_ROLES = ROLES; // Alias si utilisé dans le code

export const PERMISSIONS = {
  MANAGE_RESTAURANT: 'manage_restaurant',
  MANAGE_USERS: 'manage_users',
  MANAGE_MENU: 'manage_menu',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_TABLES: 'manage_tables',
  MANAGE_DAILY_SPECIALS: 'manage_daily_specials',
  VIEW_KITCHEN: 'view_kitchen',
  MAKE_RESERVATION: 'make_reservation',
  VIEW_MENU: 'view_menu',
  CONTACT_RESTAURANT: 'contact_restaurant'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['*'],
  [ROLES.OWNER]: [
    'manage_restaurant', 'manage_users', 'manage_menu',
    'manage_settings', 'view_analytics', 'manage_daily_specials'
  ],
  [ROLES.MANAGER]: [
    'manage_orders', 'manage_tables', 'manage_daily_specials',
    'view_kitchen', 'view_analytics'
  ],
  [ROLES.STAFF]: [
    'manage_orders', 'manage_tables', 'view_kitchen'
  ],
  [ROLES.PUBLIC]: [
    'make_reservation', 'view_menu', 'contact_restaurant'
  ]
};