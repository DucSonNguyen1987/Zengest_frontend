// web-admin/src/utils/formatters.js
// Fonctions de formatage spécialisées pour l'interface admin

// ========================================
// 📅 FORMATAGE DES DATES ET HEURES
// ========================================

/**
 * Formate une date en français
 * @param {string|Date} date - Date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return dateObj.toLocaleDateString('fr-FR', defaultOptions);
};

/**
 * Formate une heure
 * @param {string|Date} time - Heure à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Heure formatée
 */
export const formatTime = (time, options = {}) => {
  if (!time) return '';
  
  const timeObj = new Date(time);
  if (isNaN(timeObj.getTime())) return '';
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return timeObj.toLocaleTimeString('fr-FR', defaultOptions);
};

/**
 * Formate une date et heure complète
 * @param {string|Date} datetime - Date/heure à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date/heure formatée
 */
export const formatDateTime = (datetime, options = {}) => {
  if (!datetime) return '';
  
  const dateObj = new Date(datetime);
  if (isNaN(dateObj.getTime())) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return dateObj.toLocaleDateString('fr-FR', defaultOptions);
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
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffSeconds < 60) return 'À l\'instant';
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  if (diffWeeks < 4) return `Il y a ${diffWeeks} sem`;
  if (diffMonths < 12) return `Il y a ${diffMonths} mois`;
  
  return formatDate(date);
};

/**
 * Formate une date pour les inputs datetime-local
 * @param {string|Date} date - Date à formater
 * @returns {string} Date au format YYYY-MM-DDTHH:mm
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  // Ajuster le fuseau horaire local
  const offset = dateObj.getTimezoneOffset();
  const localDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
  
  return localDate.toISOString().slice(0, 16);
};

// ========================================
// 💰 FORMATAGE MONÉTAIRE
// ========================================

/**
 * Formate un montant en euros
 * @param {number} amount - Montant à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Montant formaté
 */
export const formatCurrency = (amount, options = {}) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0,00 €';
  }
  
  const defaultOptions = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  return new Intl.NumberFormat('fr-FR', defaultOptions).format(amount);
};

/**
 * Formate un montant sans devise
 * @param {number} amount - Montant à formater
 * @param {number} decimals - Nombre de décimales
 * @returns {string} Montant formaté
 */
export const formatNumber = (amount, decimals = 2) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }
  
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};

/**
 * Formate un pourcentage
 * @param {number} value - Valeur à formater (entre 0 et 1 ou 0 et 100)
 * @param {boolean} isDecimal - True si la valeur est entre 0 et 1
 * @returns {string} Pourcentage formaté
 */
export const formatPercentage = (value, isDecimal = false) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  
  const percentage = isDecimal ? value * 100 : value;
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(isDecimal ? value : value / 100);
};

// ========================================
// 📊 FORMATAGE DES DONNÉES
// ========================================

/**
 * Formate une taille de fichier
 * @param {number} bytes - Taille en bytes
 * @param {number} decimals - Nombre de décimales
 * @returns {string} Taille formatée
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Formate un numéro de téléphone français
 * @param {string} phone - Numéro de téléphone
 * @returns {string} Téléphone formaté
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Nettoyer le numéro
  const cleaned = phone.replace(/\D/g, '');
  
  // Format français standard: 01 23 45 67 89
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }
  
  // Format international: +33 1 23 45 67 89
  if (cleaned.length === 11 && cleaned.startsWith('33')) {
    return '+' + cleaned.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
  }
  
  return phone; // Retourner tel quel si format non reconnu
};

/**
 * Formate une adresse email (masquage partiel)
 * @param {string} email - Adresse email
 * @param {boolean} mask - Masquer une partie de l'email
 * @returns {string} Email formaté
 */
export const formatEmail = (email, mask = false) => {
  if (!email) return '';
  
  if (!mask) return email.toLowerCase();
  
  const [username, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedUsername = username.length > 2 
    ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
    : username;
    
  return `${maskedUsername}@${domain}`;
};

// ========================================
// 🏷️ FORMATAGE DES STATUTS
// ========================================

/**
 * Formate un statut avec première lettre majuscule
 * @param {string} status - Statut à formater
 * @returns {string} Statut formaté
 */
export const formatStatus = (status) => {
  if (!status) return '';
  
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

/**
 * Obtient la couleur CSS pour un statut
 * @param {string} status - Statut
 * @returns {string} Classe CSS de couleur
 */
export const getStatusColor = (status) => {
  const statusColors = {
    // Réservations
    pending: 'warning',
    confirmed: 'success',
    seated: 'info',
    completed: 'primary',
    cancelled: 'danger',
    no_show: 'dark',
    
    // Commandes
    preparing: 'info',
    ready: 'success',
    served: 'primary',
    paid: 'success',
    
    // Tables
    available: 'success',
    occupied: 'danger',
    reserved: 'warning',
    cleaning: 'info',
    out_of_service: 'dark',
    
    // Générique
    active: 'success',
    inactive: 'danger',
    draft: 'secondary',
    published: 'success'
  };
  
  return statusColors[status] || 'secondary';
};

// ========================================
// 📝 FORMATAGE DU TEXTE
// ========================================

/**
 * Tronque un texte avec des points de suspension
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @param {string} suffix - Suffixe (par défaut: '...')
 * @returns {string} Texte tronqué
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) return text || '';
  
  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Capitalise la première lettre de chaque mot
 * @param {string} text - Texte à capitaliser
 * @returns {string} Texte capitalisé
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Extrait les initiales d'un nom complet
 * @param {string} fullName - Nom complet
 * @param {number} maxInitials - Nombre max d'initiales
 * @returns {string} Initiales
 */
export const getInitials = (fullName, maxInitials = 2) => {
  if (!fullName) return '';
  
  return fullName
    .split(' ')
    .filter(name => name.length > 0)
    .slice(0, maxInitials)
    .map(name => name.charAt(0).toUpperCase())
    .join('');
};

// ========================================
// 🎯 FORMATAGE SPÉCIALISÉ RESTAURANT
// ========================================

/**
 * Formate un nombre de couverts
 * @param {number} count - Nombre de personnes
 * @returns {string} Texte formaté
 */
export const formatGuestCount = (count) => {
  if (!count || count === 0) return '';
  
  return count === 1 ? '1 personne' : `${count} personnes`;
};

/**
 * Formate un numéro de table
 * @param {string|number} tableNumber - Numéro de table
 * @returns {string} Numéro formaté
 */
export const formatTableNumber = (tableNumber) => {
  if (!tableNumber) return '';
  
  return `Table ${tableNumber}`;
};

/**
 * Formate un numéro de commande/réservation
 * @param {string} number - Numéro
 * @param {string} prefix - Préfixe (CMD, RES, etc.)
 * @returns {string} Numéro formaté
 */
export const formatOrderNumber = (number, prefix = '') => {
  if (!number) return '';
  
  return prefix ? `${prefix}-${number}` : number;
};

// ========================================
// 📊 EXPORT GROUPÉ
// ========================================

export default {
  // Dates
  formatDate,
  formatTime,
  formatDateTime,
  formatTimeAgo,
  formatDateForInput,
  
  // Monnaie et nombres
  formatCurrency,
  formatNumber,
  formatPercentage,
  
  // Données
  formatFileSize,
  formatPhoneNumber,
  formatEmail,
  
  // Statuts
  formatStatus,
  getStatusColor,
  
  // Texte
  truncateText,
  capitalizeWords,
  getInitials,
  
  // Restaurant
  formatGuestCount,
  formatTableNumber,
  formatOrderNumber
};