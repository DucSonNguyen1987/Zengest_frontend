// shared/utils/formatters.js - Fonctions de formatage partagées

const RESERVATION_STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  completed: 'Terminée',
  seated: 'Installée',
  no_show: 'Absent'
};

const RESERVATION_STATUS_COLORS = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger',
  completed: 'info',
  seated: 'primary',
  no_show: 'dark'
};

const ORDER_STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  ready: 'Prête',
  served: 'Servie',
  paid: 'Payée',
  cancelled: 'Annulée'
};

const ORDER_STATUS_COLORS = {
  pending: 'warning',
  confirmed: 'info', 
  preparing: 'primary',
  ready: 'success',
  served: 'success',
  paid: 'success',
  cancelled: 'danger'
};


// ========================================
// 📅 FORMATAGE DATES ET HEURES
// ========================================

export const formatDate = (date, locale = 'fr-FR') => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date, locale = 'fr-FR') => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date, locale = 'fr-FR') => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleString(locale, {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTimeAgo = (date, locale = 'fr-FR') => {
  if (!date) return '';
  
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return formatDate(date, locale);
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toISOString().split('T')[0];
};

// ========================================
// 💰 FORMATAGE MONÉTAIRE
// ========================================

export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (number, locale = 'fr-FR') => {
  if (number === null || number === undefined) return '';
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(number);
};

export const formatPercentage = (value, locale = 'fr-FR') => {
  if (value === null || value === undefined) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

// ========================================
// 📞 FORMATAGE CONTACT
// ========================================

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Supprimer tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '');
  
  // Format français : 06 12 34 56 78
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }
  
  return phone;
};

export const formatEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

// ========================================
// 🏷️ FORMATAGE STATUTS
// ========================================

export const formatStatus = (status, type = 'reservation') => {
  if (!status) return '';
  
  const labels = type === 'reservation' ? RESERVATION_STATUS_LABELS : ORDER_STATUS_LABELS;
  return labels[status] || status;
};

export const getStatusColor = (status, type = 'reservation') => {
  if (!status) return 'light';
  
  const colors = type === 'reservation' ? RESERVATION_STATUS_COLORS : ORDER_STATUS_COLORS;
  return colors[status] || 'light';
};

// ========================================
// 🔤 FORMATAGE TEXTE
// ========================================

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ========================================
// 👥 FORMATAGE SPÉCIFIQUE RESTAURANT
// ========================================

export const formatGuestCount = (count) => {
  if (!count) return '';
  return count === 1 ? '1 personne' : `${count} personnes`;
};

export const formatTableNumber = (tableNumber) => {
  if (!tableNumber) return '';
  return `Table ${tableNumber}`;
};

export const formatOrderNumber = (orderNumber) => {
  if (!orderNumber) return '';
  return orderNumber.toUpperCase();
};

// ========================================
// 📊 FORMATAGE DONNÉES
// ========================================

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};