// shared/constants/tables.js - Constantes des tables

// === STATUTS DES TABLES ===
export const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  CLEANING: 'cleaning',
  OUT_OF_SERVICE: 'out_of_service'
};

export const TABLE_STATUS_LIST = Object.values(TABLE_STATUS);

// === FORMES DE TABLES ===
export const TABLE_SHAPES = {
  ROUND: 'round',
  SQUARE: 'square',
  RECTANGLE: 'rectangle',
  OVAL: 'oval'
};

export const TABLE_SHAPES_LIST = Object.values(TABLE_SHAPES);

// === TAILLES DE TABLES ===
export const TABLE_SIZES = {
  SMALL: 'small',     // 1-2 personnes
  MEDIUM: 'medium',   // 3-4 personnes
  LARGE: 'large',     // 5-6 personnes
  XLARGE: 'xlarge'    // 7+ personnes
};

export const TABLE_SIZES_LIST = Object.values(TABLE_SIZES);

// === CAPACITÉS SUGGÉRÉES PAR TAILLE ===
export const TABLE_CAPACITY_BY_SIZE = {
  [TABLE_SIZES.SMALL]: { min: 1, max: 2, optimal: 2 },
  [TABLE_SIZES.MEDIUM]: { min: 3, max: 4, optimal: 4 },
  [TABLE_SIZES.LARGE]: { min: 5, max: 6, optimal: 6 },
  [TABLE_SIZES.XLARGE]: { min: 7, max: 12, optimal: 8 }
};

// === ZONES DU RESTAURANT ===
export const TABLE_ZONES = {
  MAIN_HALL: 'main_hall',
  TERRACE: 'terrace',
  BAR_AREA: 'bar_area',
  PRIVATE_ROOM: 'private_room',
  VIP_SECTION: 'vip_section'
};

export const TABLE_ZONES_LIST = Object.values(TABLE_ZONES);

// === LABELS DES STATUTS ===
export const TABLE_STATUS_LABELS = {
  [TABLE_STATUS.AVAILABLE]: 'Disponible',
  [TABLE_STATUS.OCCUPIED]: 'Occupée',
  [TABLE_STATUS.RESERVED]: 'Réservée',
  [TABLE_STATUS.CLEANING]: 'Nettoyage',
  [TABLE_STATUS.OUT_OF_SERVICE]: 'Hors service'
};

// === COULEURS DES STATUTS ===
export const TABLE_STATUS_COLORS = {
  [TABLE_STATUS.AVAILABLE]: 'success',
  [TABLE_STATUS.OCCUPIED]: 'danger',
  [TABLE_STATUS.RESERVED]: 'warning',
  [TABLE_STATUS.CLEANING]: 'info',
  [TABLE_STATUS.OUT_OF_SERVICE]: 'dark'
};

// === LABELS DES FORMES ===
export const TABLE_SHAPES_LABELS = {
  [TABLE_SHAPES.ROUND]: 'Ronde',
  [TABLE_SHAPES.SQUARE]: 'Carrée',
  [TABLE_SHAPES.RECTANGLE]: 'Rectangulaire',
  [TABLE_SHAPES.OVAL]: 'Ovale'
};

// === LABELS DES TAILLES ===
export const TABLE_SIZES_LABELS = {
  [TABLE_SIZES.SMALL]: 'Petite (1-2 pers.)',
  [TABLE_SIZES.MEDIUM]: 'Moyenne (3-4 pers.)',
  [TABLE_SIZES.LARGE]: 'Grande (5-6 pers.)',
  [TABLE_SIZES.XLARGE]: 'Très grande (7+ pers.)'
};

// === LABELS DES ZONES ===
export const TABLE_ZONES_LABELS = {
  [TABLE_ZONES.MAIN_HALL]: 'Salle principale',
  [TABLE_ZONES.TERRACE]: 'Terrasse',
  [TABLE_ZONES.BAR_AREA]: 'Zone bar',
  [TABLE_ZONES.PRIVATE_ROOM]: 'Salon privé',
  [TABLE_ZONES.VIP_SECTION]: 'Section VIP'
};

// === FONCTIONS UTILITAIRES ===
export const isTableAvailable = (status) => {
  return status === TABLE_STATUS.AVAILABLE;
};

export const isTableOccupied = (status) => {
  return [
    TABLE_STATUS.OCCUPIED,
    TABLE_STATUS.RESERVED
  ].includes(status);
};

export const isTableUsable = (status) => {
  return [
    TABLE_STATUS.AVAILABLE,
    TABLE_STATUS.OCCUPIED,
    TABLE_STATUS.RESERVED
  ].includes(status);
};

export const canSeatParty = (table, partySize) => {
  if (!table || !table.capacity) return false;
  return partySize <= table.capacity && partySize >= (table.minCapacity || 1);
};

export const getSuggestedCapacity = (shape, size) => {
  const baseCapacity = TABLE_CAPACITY_BY_SIZE[size];
  if (!baseCapacity) return { min: 1, max: 4, optimal: 2 };
  
  // Ajustements selon la forme
  switch (shape) {
    case TABLE_SHAPES.ROUND:
      return {
        ...baseCapacity,
        max: baseCapacity.max + 1 // Les tables rondes peuvent souvent accueillir +1
      };
    case TABLE_SHAPES.RECTANGLE:
      return {
        ...baseCapacity,
        max: baseCapacity.max + 2 // Les tables rectangulaires sont plus flexibles
      };
    default:
      return baseCapacity;
  }
};

export const getTableStatusLabel = (status) => {
  return TABLE_STATUS_LABELS[status] || status;
};

export const getTableStatusColor = (status) => {
  return TABLE_STATUS_COLORS[status] || 'secondary';
};