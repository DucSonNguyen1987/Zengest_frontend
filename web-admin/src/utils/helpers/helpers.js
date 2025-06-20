// web-admin/src/utils/helpers.js

// ========================================
// 🔗 GÉNÉRATION DE SLUG
// ========================================

/**
 * Génère un slug à partir d'un texte
 * @param {string} text - Texte à convertir
 * @returns {string} Slug généré
 */
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remplacer les caractères accentués
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplacer les espaces et caractères spéciaux par des tirets
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    // Supprimer les tirets en début/fin
    .replace(/^-+|-+$/g, '');
};

// ========================================
// 💰 FORMATAGE MONÉTAIRE
// ========================================

/**
 * Formate un montant en euros
 * @param {number} amount - Montant à formater
 * @param {string} locale - Locale (défaut: fr-FR)
 * @returns {string} Montant formaté
 */
export const formatCurrency = (amount, locale = 'fr-FR') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0,00 €';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Parse un montant depuis une chaîne formatée
 * @param {string} formattedAmount - Montant formaté
 * @returns {number} Montant numérique
 */
export const parseCurrency = (formattedAmount) => {
  if (!formattedAmount) return 0;
  
  return parseFloat(
    formattedAmount
      .replace(/[€\s]/g, '')
      .replace(',', '.')
  ) || 0;
};

// ========================================
// 📅 FORMATAGE DES DATES
// ========================================

/**
 * Formate une date
 * @param {string|Date} date - Date à formater
 * @param {string} locale - Locale (défaut: fr-FR)
 * @returns {string} Date formatée
 */
export const formatDate = (date, locale = 'fr-FR') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formate une heure
 * @param {string|Date} time - Heure à formater
 * @param {string} locale - Locale (défaut: fr-FR)
 * @returns {string} Heure formatée
 */
export const formatTime = (time, locale = 'fr-FR') => {
  if (!time) return '';
  
  const timeObj = new Date(time);
  if (isNaN(timeObj.getTime())) return '';
  
  return timeObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formate une date et heure complète
 * @param {string|Date} datetime - Date/heure à formater
 * @param {string} locale - Locale (défaut: fr-FR)
 * @returns {string} Date/heure formatée
 */
export const formatDateTime = (datetime, locale = 'fr-FR') => {
  if (!datetime) return '';
  
  const dateObj = new Date(datetime);
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formate une durée relative (il y a X temps)
 * @param {string|Date} date - Date de référence
 * @returns {string} Durée relative
 */
export const formatTimeAgo = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) return 'À l\'instant';
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return formatDate(date);
};

// ========================================
// 📝 VALIDATION
// ========================================

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} True si valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Téléphone à valider
 * @returns {boolean} True si valide
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

/**
 * Valide un slug
 * @param {string} slug - Slug à valider
 * @returns {boolean} True si valide
 */
export const isValidSlug = (slug) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

// ========================================
// 🎨 MANIPULATION DE COULEURS
// ========================================

/**
 * Convertit une couleur hex en rgba
 * @param {string} hex - Couleur hexadécimale
 * @param {number} alpha - Transparence (0-1)
 * @returns {string} Couleur rgba
 */
export const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Détermine si une couleur est claire ou sombre
 * @param {string} hex - Couleur hexadécimale
 * @returns {boolean} True si la couleur est claire
 */
export const isLightColor = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return true;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  // Formule de luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

// ========================================
// 🔧 UTILITAIRES GÉNÉRAUX
// ========================================

/**
 * Debounce une fonction
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai en ms
 * @returns {Function} Fonction debouncée
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle une fonction
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Limite en ms
 * @returns {Function} Fonction throttlée
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Copie profonde d'un objet
 * @param {any} obj - Objet à copier
 * @returns {any} Copie de l'objet
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Génère un ID unique
 * @param {string} prefix - Préfixe optionnel
 * @returns {string} ID unique
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}-${timestamp}-${randomStr}` : `${timestamp}-${randomStr}`;
};

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - Chaîne à capitaliser
 * @returns {string} Chaîne capitalisée
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Tronque une chaîne avec des points de suspension
 * @param {string} str - Chaîne à tronquer
 * @param {number} length - Longueur maximale
 * @returns {string} Chaîne tronquée
 */
export const truncate = (str, length = 100) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length).trim() + '...';
};

/**
 * Convertit une taille de fichier en format lisible
 * @param {number} bytes - Taille en bytes
 * @returns {string} Taille formatée
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extrait les initiales d'un nom complet
 * @param {string} fullName - Nom complet
 * @returns {string} Initiales
 */
export const getInitials = (fullName) => {
  if (!fullName) return '';
  
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// ========================================
// 📊 UTILITAIRES TABLEAUX
// ========================================

/**
 * Groupe un tableau par une propriété
 * @param {Array} array - Tableau à grouper
 * @param {string} key - Clé de groupement
 * @returns {Object} Objet groupé
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const groupKey = item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Trie un tableau par une propriété
 * @param {Array} array - Tableau à trier
 * @param {string} key - Clé de tri
 * @param {string} order - Ordre (asc/desc)
 * @returns {Array} Tableau trié
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filtre un tableau par recherche textuelle
 * @param {Array} array - Tableau à filtrer
 * @param {string} searchTerm - Terme de recherche
 * @param {Array} searchKeys - Clés à rechercher
 * @returns {Array} Tableau filtré
 */
export const filterBySearch = (array, searchTerm, searchKeys = []) => {
  if (!searchTerm.trim()) return array;
  
  const term = searchTerm.toLowerCase();
  
  return array.filter(item => {
    if (searchKeys.length === 0) {
      // Recherche dans toutes les propriétés string
      return Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(term)
      );
    }
    
    // Recherche dans les clés spécifiées
    return searchKeys.some(key => {
      const value = key.split('.').reduce((obj, k) => obj?.[k], item);
      return typeof value === 'string' && value.toLowerCase().includes(term);
    });
  });
};