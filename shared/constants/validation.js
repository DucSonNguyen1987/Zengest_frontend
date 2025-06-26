// shared/constants/validation.js - Règles de validation

// === RÈGLES DE VALIDATION GÉNÉRALES ===
export const VALIDATION_RULES = {
  // Longueurs de chaînes
  STRING_LENGTHS: {
    MIN_NAME: 2,
    MAX_NAME: 100,
    MIN_DESCRIPTION: 10,
    MAX_DESCRIPTION: 1000,
    MIN_PASSWORD: 8,
    MAX_PASSWORD: 128,
    MIN_PHONE: 10,
    MAX_PHONE: 15,
    MAX_EMAIL: 254,
    MAX_URL: 2000
  },
  
  // Nombres
  NUMBERS: {
    MIN_PRICE: 0.01,
    MAX_PRICE: 999999.99,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    MIN_CAPACITY: 1,
    MAX_CAPACITY: 50,
    MIN_DURATION: 15, // minutes
    MAX_DURATION: 480 // 8 heures
  },
  
  // Dates
  DATES: {
    MIN_RESERVATION_ADVANCE_HOURS: 1,
    MAX_RESERVATION_ADVANCE_DAYS: 90,
    MIN_AGE: 0,
    MAX_AGE: 150
  }
};

// === EXPRESSIONS RÉGULIÈRES ===
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_FR: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  PHONE_INTERNATIONAL: /^\+?[1-9]\d{1,14}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  POSTAL_CODE_FR: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  COLOR_HEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  TIME_24H: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  CREDIT_CARD: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/
};

// === MESSAGES D'ERREUR ===
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Ce champ est obligatoire',
  INVALID_EMAIL: 'Adresse email invalide',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  INVALID_URL: 'URL invalide',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
  PASSWORD_TOO_WEAK: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
  STRING_TOO_SHORT: 'Ce champ est trop court',
  STRING_TOO_LONG: 'Ce champ est trop long',
  NUMBER_TOO_SMALL: 'La valeur est trop petite',
  NUMBER_TOO_LARGE: 'La valeur est trop grande',
  INVALID_DATE: 'Date invalide',
  DATE_TOO_EARLY: 'La date est trop ancienne',
  DATE_TOO_LATE: 'La date est trop éloignée',
  INVALID_TIME: 'Heure invalide',
  DUPLICATE_VALUE: 'Cette valeur existe déjà',
  INVALID_FORMAT: 'Format invalide',
  FILE_TOO_LARGE: 'Fichier trop volumineux',
  INVALID_FILE_TYPE: 'Type de fichier non autorisé'
};

// === RÈGLES DE VALIDATION PAR ENTITÉ ===
export const ENTITY_VALIDATION = {
  USER: {
    firstName: {
      required: true,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_NAME,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_NAME
    },
    lastName: {
      required: true,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_NAME,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_NAME
    },
    email: {
      required: true,
      pattern: REGEX_PATTERNS.EMAIL,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_EMAIL
    },
    phone: {
      required: false,
      pattern: REGEX_PATTERNS.PHONE_INTERNATIONAL,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_PHONE,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_PHONE
    },
    password: {
      required: true,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_PASSWORD,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_PASSWORD,
      pattern: REGEX_PATTERNS.PASSWORD_STRONG
    }
  },
  
  MENU_ITEM: {
    name: {
      required: true,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_NAME,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_NAME
    },
    description: {
      required: false,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_DESCRIPTION,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_DESCRIPTION
    },
    price: {
      required: true,
      min: VALIDATION_RULES.NUMBERS.MIN_PRICE,
      max: VALIDATION_RULES.NUMBERS.MAX_PRICE
    }
  },
  
  RESERVATION: {
    customerName: {
      required: true,
      minLength: VALIDATION_RULES.STRING_LENGTHS.MIN_NAME,
      maxLength: VALIDATION_RULES.STRING_LENGTHS.MAX_NAME
    },
    customerEmail: {
      required: true,
      pattern: REGEX_PATTERNS.EMAIL
    },
    customerPhone: {
      required: true,
      pattern: REGEX_PATTERNS.PHONE_INTERNATIONAL
    },
    partySize: {
      required: true,
      min: VALIDATION_RULES.NUMBERS.MIN_CAPACITY,
      max: VALIDATION_RULES.NUMBERS.MAX_CAPACITY
    },
    dateTime: {
      required: true,
      minAdvanceHours: VALIDATION_RULES.DATES.MIN_RESERVATION_ADVANCE_HOURS,
      maxAdvanceDays: VALIDATION_RULES.DATES.MAX_RESERVATION_ADVANCE_DAYS
    }
  },
  
  TABLE: {
    number: {
      required: true,
      min: 1,
      max: 999
    },
    capacity: {
      required: true,
      min: VALIDATION_RULES.NUMBERS.MIN_CAPACITY,
      max: VALIDATION_RULES.NUMBERS.MAX_CAPACITY
    }
  }
};

// === FONCTIONS DE VALIDATION ===
export const validateEmail = (email) => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

export const validatePhone = (phone, country = 'international') => {
  const pattern = country === 'fr' ? REGEX_PATTERNS.PHONE_FR : REGEX_PATTERNS.PHONE_INTERNATIONAL;
  return pattern.test(phone);
};

export const validatePassword = (password, requireStrong = true) => {
  if (password.length < VALIDATION_RULES.STRING_LENGTHS.MIN_PASSWORD) {
    return { valid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
  }
  
  if (requireStrong && !REGEX_PATTERNS.PASSWORD_STRONG.test(password)) {
    return { valid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_WEAK };
  }
  
  return { valid: true };
};

export const validateStringLength = (value, minLength, maxLength) => {
  if (value.length < minLength) {
    return { valid: false, message: VALIDATION_MESSAGES.STRING_TOO_SHORT };
  }
  
  if (value.length > maxLength) {
    return { valid: false, message: VALIDATION_MESSAGES.STRING_TOO_LONG };
  }
  
  return { valid: true };
};

export const validateNumberRange = (value, min, max) => {
  if (value < min) {
    return { valid: false, message: VALIDATION_MESSAGES.NUMBER_TOO_SMALL };
  }
  
  if (value > max) {
    return { valid: false, message: VALIDATION_MESSAGES.NUMBER_TOO_LARGE };
  }
  
  return { valid: true };
};

export const validateDateRange = (date, minDate, maxDate) => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: VALIDATION_MESSAGES.INVALID_DATE };
  }
  
  if (minDate && dateObj < new Date(minDate)) {
    return { valid: false, message: VALIDATION_MESSAGES.DATE_TOO_EARLY };
  }
  
  if (maxDate && dateObj > new Date(maxDate)) {
    return { valid: false, message: VALIDATION_MESSAGES.DATE_TOO_LATE };
  }
  
  return { valid: true };
};

export const validateReservationDateTime = (dateTime) => {
  const now = new Date();
  const reservationDate = new Date(dateTime);
  
  // Vérifier que la date est dans le futur
  const minDate = new Date(now.getTime() + (VALIDATION_RULES.DATES.MIN_RESERVATION_ADVANCE_HOURS * 60 * 60 * 1000));
  const maxDate = new Date(now.getTime() + (VALIDATION_RULES.DATES.MAX_RESERVATION_ADVANCE_DAYS * 24 * 60 * 60 * 1000));
  
  return validateDateRange(reservationDate, minDate, maxDate);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};