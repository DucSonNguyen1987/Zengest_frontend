// utils/constants.js
export const API_ENDPOINTS = {
  MENU: '/menu',
  DAILY_SPECIALS: '/daily-specials',
  RESERVATIONS: '/reservations',
  CONTACT: '/contact',
  RESTAURANT: '/restaurant',
  GALLERY: '/gallery'
}

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
}

export const ALLERGENS = {
  GLUTEN: 'Gluten',
  DAIRY: 'Lait',
  EGGS: 'Œufs',
  NUTS: 'Fruits à coque',
  SHELLFISH: 'Mollusques',
  FISH: 'Poisson',
  SOY: 'Soja',
  SULFITES: 'Sulfites'
}

export const OPENING_HOURS = {
  MONDAY: { lunch: '12:00-14:30', dinner: '19:00-22:30' },
  TUESDAY: { lunch: '12:00-14:30', dinner: '19:00-22:30' },
  WEDNESDAY: { lunch: '12:00-14:30', dinner: '19:00-22:30' },
  THURSDAY: { lunch: '12:00-14:30', dinner: '19:00-22:30' },
  FRIDAY: { lunch: '12:00-14:30', dinner: '19:00-22:30' },
  SATURDAY: { lunch: null, dinner: '19:00-23:00' },
  SUNDAY: { lunch: null, dinner: null } // Fermé
}

export const CONTACT_SUBJECTS = {
  RESERVATION: 'reservation',
  EVENT: 'event',
  MENU: 'menu',
  PARTNERSHIP: 'partnership',
  COMPLAINT: 'complaint',
  OTHER: 'other'
}