// shared/constants/statuses.js - Statuts généraux du système

// === STATUTS GÉNÉRAUX ===
export const GENERAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived'
};

export const GENERAL_STATUS_LIST = Object.values(GENERAL_STATUS);

// === STATUTS DE DISPONIBILITÉ ===
export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  BUSY: 'busy',
  MAINTENANCE: 'maintenance'
};

export const AVAILABILITY_STATUS_LIST = Object.values(AVAILABILITY_STATUS);

// === STATUTS DE PUBLICATION ===
export const PUBLICATION_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  HIDDEN: 'hidden',
  SCHEDULED: 'scheduled'
};

export const PUBLICATION_STATUS_LIST = Object.values(PUBLICATION_STATUS);

// === STATUTS DE VALIDATION ===
export const VALIDATION_STATUS = {
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NEEDS_REVISION: 'needs_revision'
};

export const VALIDATION_STATUS_LIST = Object.values(VALIDATION_STATUS);

// === PRIORITÉS ===
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical'
};

export const PRIORITY_LIST = Object.values(PRIORITY_LEVELS);

// === FONCTIONS UTILITAIRES ===
export const isActiveStatus = (status) => {
  return [
    GENERAL_STATUS.ACTIVE,
    GENERAL_STATUS.PROCESSING,
    AVAILABILITY_STATUS.AVAILABLE,
    PUBLICATION_STATUS.PUBLISHED
  ].includes(status);
};

export const isCompletedStatus = (status) => {
  return [
    GENERAL_STATUS.COMPLETED,
    GENERAL_STATUS.ARCHIVED
  ].includes(status);
};

export const isCancelledStatus = (status) => {
  return [
    GENERAL_STATUS.CANCELLED,
    GENERAL_STATUS.SUSPENDED
  ].includes(status);
};