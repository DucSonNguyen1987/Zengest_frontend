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

// === STATUTS ACTIFS (commandes en cours) ===
export const ACTIVE_ORDER_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY
];

// === STATUTS FINAUX (commandes terminées) ===
export const FINAL_ORDER_STATUSES = [
  ORDER_STATUS.PAID,
  ORDER_STATUS.CANCELLED
];

// === TRANSITIONS DE STATUTS AUTORISÉES ===
export const ORDER_STATUS_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.READY]: [ORDER_STATUS.SERVED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.SERVED]: [ORDER_STATUS.PAID],
  [ORDER_STATUS.PAID]: [], // État final
  [ORDER_STATUS.CANCELLED]: [] // État final
};

// === TYPES DE COMMANDES ===
export const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
  CATERING: 'catering'
};

export const ORDER_TYPES_LIST = Object.values(ORDER_TYPES);

// === MÉTHODES DE PAIEMENT ===
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  MOBILE: 'mobile',
  VOUCHER: 'voucher',
  SPLIT: 'split'
};

export const PAYMENT_METHODS_LIST = Object.values(PAYMENT_METHODS);

// === STATUTS DE PAIEMENT ===
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS);

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
  [ORDER_STATUS.SERVED]: 'success',
  [ORDER_STATUS.PAID]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger'
};

// === FONCTIONS UTILITAIRES ===
export const isActiveOrderStatus = (status) => {
  return ACTIVE_ORDER_STATUSES.includes(status);
};

export const isValidStatusTransition = (fromStatus, toStatus) => {
  const allowedTransitions = ORDER_STATUS_TRANSITIONS[fromStatus] || [];
  return allowedTransitions.includes(toStatus);
};

export const getNextStatuses = (currentStatus) => {
  return ORDER_STATUS_TRANSITIONS[currentStatus] || [];
};

export const canCancelOrder = (status) => {
  return [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING
  ].includes(status);
};