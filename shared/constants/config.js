// shared/constants/config.js - Configuration générale de l'application

// === PAGINATION ===
export const PAGINATION_SIZES = [10, 20, 50, 100];
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// === LANGUES SUPPORTÉES ===
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  ES: 'es',
  DE: 'de',
  IT: 'it'
};

export const LANGUAGES_LIST = Object.values(LANGUAGES);

export const LANGUAGES_LABELS = {
  [LANGUAGES.FR]: 'Français',
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.ES]: 'Español',
  [LANGUAGES.DE]: 'Deutsch',
  [LANGUAGES.IT]: 'Italiano'
};

// === DEVISES ===
export const CURRENCIES = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
  CHF: 'CHF',
  CAD: 'CAD'
};

export const CURRENCIES_LIST = Object.values(CURRENCIES);

export const CURRENCIES_LABELS = {
  [CURRENCIES.EUR]: '€ Euro',
  [CURRENCIES.USD]: '$ Dollar US',
  [CURRENCIES.GBP]: '£ Livre Sterling',
  [CURRENCIES.CHF]: 'CHF Franc Suisse',
  [CURRENCIES.CAD]: 'CAD Dollar Canadien'
};

// === FUSEAUX HORAIRES ===
export const TIMEZONES = {
  PARIS: 'Europe/Paris',
  LONDON: 'Europe/London',
  NEW_YORK: 'America/New_York',
  LOS_ANGELES: 'America/Los_Angeles',
  TOKYO: 'Asia/Tokyo',
  SYDNEY: 'Australia/Sydney'
};

export const TIMEZONES_LIST = Object.values(TIMEZONES);

// === FORMATS DE DATE ===
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  MEDIUM: 'dd MMM yyyy',
  LONG: 'dd MMMM yyyy',
  FULL: 'EEEE dd MMMM yyyy'
};

export const TIME_FORMATS = {
  SHORT: 'HH:mm',
  MEDIUM: 'HH:mm:ss',
  LONG: 'HH:mm:ss.SSS'
};

// === SERVICES EXTERNES ===
export const SERVICE_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  WEBHOOK: 'webhook'
};

export const SERVICE_TYPES_LIST = Object.values(SERVICE_TYPES);

// === SOURCES DE DONNÉES ===
export const DATA_SOURCES = {
  MANUAL: 'manual',
  IMPORT: 'import',
  API: 'api',
  SYNC: 'sync'
};

export const DATA_SOURCES_LIST = Object.values(DATA_SOURCES);

// === FRÉQUENCES DE SYNCHRONISATION ===
export const SYNC_FREQUENCIES = {
  REAL_TIME: 'real_time',
  EVERY_MINUTE: 'every_minute',
  EVERY_5_MINUTES: 'every_5_minutes',
  EVERY_15_MINUTES: 'every_15_minutes',
  EVERY_30_MINUTES: 'every_30_minutes',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly'
};

export const SYNC_FREQUENCIES_LIST = Object.values(SYNC_FREQUENCIES);

export const SYNC_FREQUENCIES_LABELS = {
  [SYNC_FREQUENCIES.REAL_TIME]: 'Temps réel',
  [SYNC_FREQUENCIES.EVERY_MINUTE]: 'Chaque minute',
  [SYNC_FREQUENCIES.EVERY_5_MINUTES]: 'Toutes les 5 minutes',
  [SYNC_FREQUENCIES.EVERY_15_MINUTES]: 'Toutes les 15 minutes',
  [SYNC_FREQUENCIES.EVERY_30_MINUTES]: 'Toutes les 30 minutes',
  [SYNC_FREQUENCIES.HOURLY]: 'Chaque heure',
  [SYNC_FREQUENCIES.DAILY]: 'Quotidienne',
  [SYNC_FREQUENCIES.WEEKLY]: 'Hebdomadaire'
};

// === TAILLES DE FICHIERS ===
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  VIDEO: 50 * 1024 * 1024, // 50MB
  BACKUP: 100 * 1024 * 1024 // 100MB
};

// === TYPES DE FICHIERS AUTORISÉS ===
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  DOCUMENTS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'],
  VIDEOS: ['.mp4', '.avi', '.mov', '.wmv'],
  AUDIO: ['.mp3', '.wav', '.ogg']
};

// === THEMES ===
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

export const THEMES_LIST = Object.values(THEMES);

export const THEMES_LABELS = {
  [THEMES.LIGHT]: 'Clair',
  [THEMES.DARK]: 'Sombre',
  [THEMES.AUTO]: 'Automatique'
};

// === ENVIRONNEMENTS ===
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
};

export const ENVIRONMENTS_LIST = Object.values(ENVIRONMENTS);

// === NIVEAUX DE LOG ===
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace'
};

export const LOG_LEVELS_LIST = Object.values(LOG_LEVELS);

// === CONFIGURATION PAR DÉFAUT ===
export const DEFAULT_CONFIG = {
  language: LANGUAGES.FR,
  currency: CURRENCIES.EUR,
  timezone: TIMEZONES.PARIS,
  dateFormat: DATE_FORMATS.SHORT,
  timeFormat: TIME_FORMATS.SHORT,
  theme: THEMES.LIGHT,
  pageSize: DEFAULT_PAGE_SIZE,
  syncFrequency: SYNC_FREQUENCIES.EVERY_15_MINUTES
};

// === FONCTIONS UTILITAIRES ===
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidPageSize = (size) => {
  return PAGINATION_SIZES.includes(size);
};

export const getValidPageSize = (size) => {
  return isValidPageSize(size) ? size : DEFAULT_PAGE_SIZE;
};

export const isProduction = () => {
  return process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT;
};