// shared/constants/users.js - Constantes des utilisateurs et rôles

// === RÔLES UTILISATEUR ===
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

// === LISTE DES RÔLES ===
export const USER_ROLES_LIST = Object.values(USER_ROLES);

// === RÔLES AVEC PERMISSIONS ÉTENDUES ===
export const MANAGEMENT_ROLES = [
  USER_ROLES.ADMIN,
  USER_ROLES.OWNER,
  USER_ROLES.MANAGER
];

// === RÔLES DU PERSONNEL ===
export const STAFF_ROLES = [
  USER_ROLES.STAFF_FLOOR,
  USER_ROLES.STAFF_BAR,
  USER_ROLES.STAFF_KITCHEN,
  USER_ROLES.STAFF
];

// === TOUS LES RÔLES DU PERSONNEL ===
export const ALL_STAFF_ROLES = [
  ...MANAGEMENT_ROLES,
  ...STAFF_ROLES
];

// === RÔLES PUBLICS ===
export const PUBLIC_ROLES = [
  USER_ROLES.PUBLIC,
  USER_ROLES.GUEST
];

// === STATUTS UTILISATEUR ===
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending'
};

export const USER_STATUS_LIST = Object.values(USER_STATUS);

// === LABELS DES RÔLES ===
export const USER_ROLES_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrateur',
  [USER_ROLES.OWNER]: 'Propriétaire',
  [USER_ROLES.MANAGER]: 'Gérant',
  [USER_ROLES.STAFF_FLOOR]: 'Personnel de salle',
  [USER_ROLES.STAFF_BAR]: 'Personnel de bar',
  [USER_ROLES.STAFF_KITCHEN]: 'Personnel de cuisine',
  [USER_ROLES.STAFF]: 'Personnel',
  [USER_ROLES.PUBLIC]: 'Public',
  [USER_ROLES.GUEST]: 'Invité'
};

// === COULEURS DES RÔLES ===
export const USER_ROLES_COLORS = {
  [USER_ROLES.ADMIN]: 'danger',
  [USER_ROLES.OWNER]: 'primary',
  [USER_ROLES.MANAGER]: 'info',
  [USER_ROLES.STAFF_FLOOR]: 'success',
  [USER_ROLES.STAFF_BAR]: 'warning',
  [USER_ROLES.STAFF_KITCHEN]: 'secondary',
  [USER_ROLES.STAFF]: 'light',
  [USER_ROLES.PUBLIC]: 'outline',
  [USER_ROLES.GUEST]: 'muted'
};

// === HIÉRARCHIE DES RÔLES (niveau de permission) ===
export const ROLE_HIERARCHY = {
  [USER_ROLES.ADMIN]: 100,
  [USER_ROLES.OWNER]: 90,
  [USER_ROLES.MANAGER]: 80,
  [USER_ROLES.STAFF_FLOOR]: 40,
  [USER_ROLES.STAFF_BAR]: 30,
  [USER_ROLES.STAFF_KITCHEN]: 30,
  [USER_ROLES.STAFF]: 20,
  [USER_ROLES.PUBLIC]: 5,
  [USER_ROLES.GUEST]: 1
};

// === FONCTIONS UTILITAIRES ===
export const isValidRole = (role) => {
  return USER_ROLES_LIST.includes(role);
};

export const normalizeRole = (role) => {
  return role ? role.toLowerCase() : USER_ROLES.GUEST;
};

export const isManagementRole = (role) => {
  return MANAGEMENT_ROLES.includes(role);
};

export const isStaffRole = (role) => {
  return ALL_STAFF_ROLES.includes(role);
};

export const getAccessibleRoles = (userRole) => {
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  return USER_ROLES_LIST.filter(role => 
    ROLE_HIERARCHY[role] <= userLevel
  );
};

export const canManageRole = (managerRole, targetRole) => {
  const managerLevel = ROLE_HIERARCHY[managerRole] || 0;
  const targetLevel = ROLE_HIERARCHY[targetRole] || 0;
  return managerLevel > targetLevel;
};

export const getRoleLabel = (role) => {
  return USER_ROLES_LABELS[role] || role;
};

export const getRoleColor = (role) => {
  return USER_ROLES_COLORS[role] || 'secondary';
};