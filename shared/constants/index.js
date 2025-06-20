// shared/constants/index.js - Export centralisé des constantes

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

// === Export groupé par défaut ===
import * as STATUSES from './statuses';
import * as RESERVATIONS from './reservations';
import * as ORDERS from './orders';
import * as USERS from './users';
import * as TABLES from './tables';
import * as PERMISSIONS from './permissions';
import * as ROLES from './roles';

export default {
  STATUSES,
  RESERVATIONS,
  ORDERS,
  USERS,
  TABLES,
  PERMISSIONS,
  ROLES
};