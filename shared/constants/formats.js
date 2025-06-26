// shared/constants/formats.js - Formats d'affichage et labels

// === FORMATS DE STATUTS (couleurs CSS) ===
export const STATUS_COLORS = {
  // Statuts généraux
  active: 'success',
  inactive: 'secondary',
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'danger',
  suspended: 'warning',
  archived: 'dark',
  
  // Commandes
  confirmed: 'info',
  preparing: 'primary',
  ready: 'success',
  served: 'success',
  paid: 'success',
  
  // Tables
  available: 'success',
  occupied: 'danger',
  reserved: 'warning',
  cleaning: 'info',
  out_of_service: 'dark',
  
  // Réservations
  seated: 'primary',
  no_show: 'dark',
  
  // Utilisateurs
  online: 'success',
  offline: 'secondary',
  busy: 'warning',
  
  // Priorités
  low: 'secondary',
  medium: 'info',
  high: 'warning',
  urgent: 'danger',
  critical: 'danger'
};

// === LABELS DES STATUTS ===
export const STATUS_LABELS = {
  // Statuts généraux
  active: 'Actif',
  inactive: 'Inactif',
  pending: 'En attente',
  processing: 'En cours',
  completed: 'Terminé',
  cancelled: 'Annulé',
  suspended: 'Suspendu',
  archived: 'Archivé',
  
  // Commandes
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  ready: 'Prête',
  served: 'Servie',
  paid: 'Payée',
  
  // Tables
  available: 'Disponible',
  occupied: 'Occupée',
  reserved: 'Réservée',
  cleaning: 'Nettoyage',
  out_of_service: 'Hors service',
  
  // Réservations
  seated: 'Installée',
  no_show: 'Absent',
  
  // Utilisateurs
  online: 'En ligne',
  offline: 'Hors ligne',
  busy: 'Occupé',
  
  // Priorités
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  urgent: 'Urgent',
  critical: 'Critique'
};

// === FORMATS DE TAILLE ===
export const SIZE_FORMATS = {
  BYTES: 'bytes',
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB'
};

// === FORMATS DE DEVISE ===
export const CURRENCY_FORMATS = {
  EUR: {
    symbol: '€',
    code: 'EUR',
    position: 'after', // €12.34 ou 12.34€
    decimals: 2,
    separator: ',',
    delimiter: ' '
  },
  USD: {
    symbol: '$',
    code: 'USD',
    position: 'before', // $12.34
    decimals: 2,
    separator: '.',
    delimiter: ','
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    position: 'before', // £12.34
    decimals: 2,
    separator: '.',
    delimiter: ','
  }
};

// === FORMATS DE TEMPS RELATIF ===
export const TIME_UNITS = {
  SECOND: { single: 'seconde', plural: 'secondes', abbr: 's' },
  MINUTE: { single: 'minute', plural: 'minutes', abbr: 'min' },
  HOUR: { single: 'heure', plural: 'heures', abbr: 'h' },
  DAY: { single: 'jour', plural: 'jours', abbr: 'j' },
  WEEK: { single: 'semaine', plural: 'semaines', abbr: 'sem' },
  MONTH: { single: 'mois', plural: 'mois', abbr: 'mois' },
  YEAR: { single: 'année', plural: 'années', abbr: 'an' }
};

// === FORMATS DE PAGINATION ===
export const PAGINATION_LABELS = {
  SHOWING: 'Affichage de',
  TO: 'à',
  OF: 'sur',
  RESULTS: 'résultats',
  PREVIOUS: 'Précédent',
  NEXT: 'Suivant',
  FIRST: 'Premier',
  LAST: 'Dernier',
  PAGE: 'Page',
  PER_PAGE: 'par page',
  NO_DATA: 'Aucune donnée disponible',
  LOADING: 'Chargement...'
};

// === FORMATS D'ACTION ===
export const ACTION_LABELS = {
  CREATE: 'Créer',
  READ: 'Voir',
  UPDATE: 'Modifier',
  DELETE: 'Supprimer',
  EDIT: 'Éditer',
  VIEW: 'Afficher',
  SAVE: 'Enregistrer',
  CANCEL: 'Annuler',
  CONFIRM: 'Confirmer',
  SUBMIT: 'Soumettre',
  RESET: 'Réinitialiser',
  CLEAR: 'Effacer',
  SEARCH: 'Rechercher',
  FILTER: 'Filtrer',
  SORT: 'Trier',
  EXPORT: 'Exporter',
  IMPORT: 'Importer',
  DOWNLOAD: 'Télécharger',
  UPLOAD: 'Téléverser',
  PRINT: 'Imprimer',
  REFRESH: 'Actualiser',
  CLOSE: 'Fermer',
  OPEN: 'Ouvrir',
  ENABLE: 'Activer',
  DISABLE: 'Désactiver',
  APPROVE: 'Approuver',
  REJECT: 'Rejeter',
  ASSIGN: 'Attribuer',
  UNASSIGN: 'Retirer',
  DUPLICATE: 'Dupliquer',
  ARCHIVE: 'Archiver',
  RESTORE: 'Restaurer'
};

// === FORMATS DE MESSAGES ===
export const MESSAGE_LABELS = {
  SUCCESS: 'Succès',
  ERROR: 'Erreur',
  WARNING: 'Attention',
  INFO: 'Information',
  LOADING: 'Chargement en cours...',
  SAVING: 'Enregistrement en cours...',
  DELETING: 'Suppression en cours...',
  PROCESSING: 'Traitement en cours...',
  NO_RESULTS: 'Aucun résultat trouvé',
  EMPTY_STATE: 'Aucune donnée à afficher',
  NETWORK_ERROR: 'Erreur de connexion',
  SERVER_ERROR: 'Erreur serveur',
  UNAUTHORIZED: 'Accès non autorisé',
  FORBIDDEN: 'Action interdite',
  NOT_FOUND: 'Élément non trouvé',
  VALIDATION_ERROR: 'Erreur de validation',
  CONFIRM_DELETE: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  CONFIRM_ACTION: 'Êtes-vous sûr de vouloir effectuer cette action ?',
  UNSAVED_CHANGES: 'Vous avez des modifications non enregistrées. Voulez-vous continuer ?'
};

// === FORMATS DE DATES COMMUNES ===
export const DATE_DISPLAY_FORMATS = {
  SHORT_DATE: 'dd/MM/yyyy',           // 15/03/2024
  MEDIUM_DATE: 'dd MMM yyyy',         // 15 mars 2024
  LONG_DATE: 'dd MMMM yyyy',          // 15 mars 2024
  FULL_DATE: 'EEEE dd MMMM yyyy',     // vendredi 15 mars 2024
  SHORT_TIME: 'HH:mm',                // 14:30
  MEDIUM_TIME: 'HH:mm:ss',            // 14:30:45
  SHORT_DATETIME: 'dd/MM/yyyy HH:mm', // 15/03/2024 14:30
  MEDIUM_DATETIME: 'dd MMM yyyy HH:mm', // 15 mars 2024 14:30
  ISO_DATE: 'yyyy-MM-dd',             // 2024-03-15
  ISO_DATETIME: 'yyyy-MM-dd HH:mm:ss' // 2024-03-15 14:30:45
};

// === FORMATS SPÉCIFIQUES AU RESTAURANT ===
export const RESTAURANT_FORMATS = {
  TABLE_NUMBER: 'Table {number}',
  GUEST_COUNT: '{count} personne{s}',
  DURATION: '{hours}h{minutes}',
  REVENUE: '{amount} €',
  PERCENTAGE: '{value}%',
  CAPACITY: '{current}/{max}',
  ORDER_NUMBER: 'Commande #{number}',
  RESERVATION_NUMBER: 'Réservation #{number}',
  MENU_PRICE: '{price} €',
  DISCOUNT: '-{amount} €',
  TAX: 'TVA {rate}%'
};

// === FONCTIONS UTILITAIRES DE FORMATAGE ===
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || 'secondary';
};

export const getStatusLabel = (status) => {
  return STATUS_LABELS[status] || status;
};

export const formatPlural = (count, singular, plural = null) => {
  if (count <= 1) return singular;
  return plural || singular + 's';
};

export const formatGuestCount = (count) => {
  return RESTAURANT_FORMATS.GUEST_COUNT
    .replace('{count}', count)
    .replace('{s}', count > 1 ? 's' : '');
};

export const formatTableNumber = (number) => {
  return RESTAURANT_FORMATS.TABLE_NUMBER.replace('{number}', number);
};

export const formatOrderNumber = (number) => {
  return RESTAURANT_FORMATS.ORDER_NUMBER.replace('{number}', number);
};

export const formatReservationNumber = (number) => {
  return RESTAURANT_FORMATS.RESERVATION_NUMBER.replace('{number}', number);
};

export const formatMenuPrice = (price) => {
  return RESTAURANT_FORMATS.MENU_PRICE.replace('{price}', price.toFixed(2));
};

export const formatPercentage = (value, decimals = 1) => {
  return RESTAURANT_FORMATS.PERCENTAGE.replace('{value}', value.toFixed(decimals));
};

export const formatCapacity = (current, max) => {
  return RESTAURANT_FORMATS.CAPACITY
    .replace('{current}', current)
    .replace('{max}', max);
};