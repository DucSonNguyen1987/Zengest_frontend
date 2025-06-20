// shared/constants/orders.js - Constantes des commandes

// === STATUTS DES COMMANDES ===
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

// === TRANSITIONS AUTORISÉES ===
export const ORDER_STATUS_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.CANCELLED
  ],
  [ORDER_STATUS.CONFIRMED]: [
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.CANCELLED
  ],
  [ORDER_STATUS.PREPARING]: [
    ORDER_STATUS.READY,
    ORDER_STATUS.CANCELLED
  ],
  [ORDER_STATUS.READY]: [
    ORDER_STATUS.SERVED
  ],
  [ORDER_STATUS.SERVED]: [
    ORDER_STATUS.PAID
  ],
  [ORDER_STATUS.PAID]: [],
  [ORDER_STATUS.CANCELLED]: []
};

// === LABELS DES STATUTS ===
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'En attente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmée',
  [ORDER_STATUS.PREPARING]: 'En préparation',
  [ORDER_STATUS.READY]: 'Prête',
  [ORDER_STATUS.SERVED]: 'Servie',
  [ORDER_STATUS.PAID]: 'Payée',
  [ORDER_STATUS.CANCELLED]: 'Annulée'
};

// === COULEURS DES STATUTS ===
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PREPARING]: 'primary',
  [ORDER_STATUS.READY]: 'success',
  [ORDER_STATUS.SERVED]: 'dark',
  [ORDER_STATUS.PAID]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger'
};

// === TYPES DE COMMANDES ===
export const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery'
};

export const ORDER_TYPES_LIST = Object.values(ORDER_TYPES);

// === LABELS DES TYPES ===
export const ORDER_TYPE_LABELS = {
  [ORDER_TYPES.DINE_IN]: 'Sur place',
  [ORDER_TYPES.TAKEAWAY]: 'À emporter',
  [ORDER_TYPES.DELIVERY]: 'Livraison'
};

// === PRIORITÉS ===
export const ORDER_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const ORDER_PRIORITIES_LIST = Object.values(ORDER_PRIORITIES);

// === MODES DE PAIEMENT ===
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  SPLIT: 'split',
  VOUCHER: 'voucher'
};

export const PAYMENT_METHODS_LIST = Object.values(PAYMENT_METHODS);

// === TEMPS D'ATTENTE PAR DÉFAUT (en minutes) ===
export const DEFAULT_PREPARATION_TIMES = {
  STARTER: 10,
  MAIN: 20,
  DESSERT: 8,
  DRINK: 2,
  COCKTAIL: 5
};