// shared/constants/index.js - Export centralisé des constantes - VERSION CORRIGÉE

// === STATUTS ===
export * from './statuses';
export * from './reservations';
export * from './orders';
export * from './users';
export * from './tables';

// === PERMISSIONS ===
export * from './permissions';
export * from './roles';

// === CONFIGURATION ===
export * from './config';
export * from './validation';

// === TYPES DE NOTIFICATIONS ===
export * from './notifications';

// === FORMATS ET LABELS ===
export * from './formats';

// === EXPORT GROUPÉ PAR DÉFAUT ===
// Import des modules existants seulement
import { GENERAL_STATUS, AVAILABILITY_STATUS, PRIORITY_LEVELS } from './statuses';
import { 
  RESERVATION_STATUS, 
  RESERVATION_STATUS_LIST, 
  RESERVATION_STATUS_TRANSITIONS,
  RESERVATION_STATUS_LABELS,
  RESERVATION_STATUS_COLORS 
} from './reservations';
import { 
  ORDER_STATUS, 
  ORDER_STATUS_LIST, 
  ACTIVE_ORDER_STATUSES,
  FINAL_ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS 
} from './orders';
import { 
  USER_ROLES, 
  USER_ROLES_LIST, 
  MANAGEMENT_ROLES, 
  STAFF_ROLES,
  ALL_STAFF_ROLES 
} from './users';
import { 
  TABLE_STATUS, 
  TABLE_STATUS_LIST, 
  TABLE_SHAPES, 
  TABLE_SHAPES_LIST 
} from './tables';
import { 
  PERMISSIONS, 
  PERMISSIONS_LIST, 
  PERMISSION_GROUPS 
} from './permissions';
import { 
  ROLE_PERMISSIONS, 
  getPermissionsForRole, 
  roleHasPermission 
} from './roles';
import { 
  PAGINATION_SIZES, 
  DEFAULT_PAGE_SIZE, 
  LANGUAGES, 
  CURRENCIES 
} from './config';
import { 
  VALIDATION_RULES, 
  REGEX_PATTERNS, 
  VALIDATION_MESSAGES 
} from './validation';
import { 
  NOTIFICATION_TYPES, 
  NOTIFICATION_CHANNELS, 
  NOTIFICATION_DURATIONS 
} from './notifications';
import { 
  STATUS_COLORS, 
  STATUS_LABELS, 
  ACTION_LABELS, 
  MESSAGE_LABELS 
} from './formats';

// Export groupé pour compatibilité
export default {
  // Statuts
  GENERAL_STATUS,
  AVAILABILITY_STATUS,
  PRIORITY_LEVELS,
  
  // Réservations
  RESERVATION_STATUS,
  RESERVATION_STATUS_LIST,
  RESERVATION_STATUS_TRANSITIONS,
  RESERVATION_STATUS_LABELS,
  RESERVATION_STATUS_COLORS,
  
  // Commandes
  ORDER_STATUS,
  ORDER_STATUS_LIST,
  ACTIVE_ORDER_STATUSES,
  FINAL_ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS,
  
  // Utilisateurs
  USER_ROLES,
  USER_ROLES_LIST,
  MANAGEMENT_ROLES,
  STAFF_ROLES,
  ALL_STAFF_ROLES,
  
  // Tables
  TABLE_STATUS,
  TABLE_STATUS_LIST,
  TABLE_SHAPES,
  TABLE_SHAPES_LIST,
  
  // Permissions
  PERMISSIONS,
  PERMISSIONS_LIST,
  PERMISSION_GROUPS,
  ROLE_PERMISSIONS,
  
  // Configuration
  PAGINATION_SIZES,
  DEFAULT_PAGE_SIZE,
  LANGUAGES,
  CURRENCIES,
  
  // Validation
  VALIDATION_RULES,
  REGEX_PATTERNS,
  VALIDATION_MESSAGES,
  
  // Notifications
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_DURATIONS,
  
  // Formats
  STATUS_COLORS,
  STATUS_LABELS,
  ACTION_LABELS,
  MESSAGE_LABELS,
  
  // Fonctions utilitaires
  getPermissionsForRole,
  roleHasPermission
};

// === EXPORTS NOMMÉS PRINCIPAUX POUR COMPATIBILITÉ ===
// Les plus utilisés dans l'application
export {
  // Réservations
  RESERVATION_STATUS,
  RESERVATION_STATUS_LIST,
  
  // Commandes  
  ORDER_STATUS,
  ORDER_STATUS_LIST,
  
  // Utilisateurs
  USER_ROLES,
  MANAGEMENT_ROLES,
  STAFF_ROLES,
  
  // Tables
  TABLE_STATUS,
  TABLE_SHAPES,
  
  // Permissions
  PERMISSIONS,
  ROLE_PERMISSIONS,
  
  // Formats
  STATUS_COLORS,
  STATUS_LABELS,
  
  // Fonctions
  getPermissionsForRole,
  roleHasPermission
};