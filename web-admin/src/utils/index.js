// web-admin/src/utils/index.js
// Export centralisé de tous les utilitaires

// ========================================
// 🔧 FONCTIONS UTILITAIRES
// ========================================
export {
  generateSlug,
  isValidEmail,
  isValidPhone,
  isValidSlug,
  hexToRgba,
  isLightColor,
  debounce,
  throttle,
  deepClone,
  generateId,
  capitalize,
  truncate,
  formatFileSize,
  getInitials,
  groupBy,
  sortBy,
  filterBySearch
} from './helpers/helpers';


// 🎨 FORMATAGE

export {
  formatDate,
  formatTime,
  formatDateTime,
  formatTimeAgo,
  formatDateForInput,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatPhoneNumber,
  formatEmail,
  formatStatus,
  getStatusColor,
  truncateText,
  capitalizeWords,
  formatGuestCount,
  formatTableNumber,
  formatOrderNumber
} from '@shared/utils/formatters';

// ========================================
// 📋 CONSTANTES
// ========================================
export {
  USER_ROLES,
  ORDER_STATUS,
  ORDER_STATUS_TRANSITIONS,
  TABLE_STATUS,
  RESERVATION_STATUS,
  PERMISSIONS,
  STATUS_COLORS,
  STATUS_LABELS,
  PAGINATION_SIZES,
  NOTIFICATION_TYPES,
  NOTIFICATION_DURATIONS
} from '@shared/constants'; // Chemin temporaire

// ========================================
// 📦 IMPORT PAR DÉFAUT GROUPÉ
// ========================================
import * as helpers from './helpers/helpers';
import * as formatters from '@shared/utils/formatters';

export const utils = {
  ...helpers,
  ...formatters
};

export default utils;