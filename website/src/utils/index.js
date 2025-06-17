// utils/index.js - Export centralisé de tous les utilitaires

import {
  formatPrice,
  formatDate,
  formatTime,
  isRestaurantOpen,
  getEstimatedTravelTime,
  generateConfirmationCode,
  validateFrenchPhone,
  formatPhoneNumber,
  calculateDistance
} from './helpers'

import { validators } from './validators'
import { storage } from './storage'
import { debounce } from './debounce'
import { throttle } from './throttle'

// Export individuel pour imports spécifiques
export {
  formatPrice,
  formatDate,
  formatTime,
  isRestaurantOpen,
  getEstimatedTravelTime,
  generateConfirmationCode,
  validateFrenchPhone,
  formatPhoneNumber,
  calculateDistance
} from './helpers'

export { validators } from './validators'
export { storage } from './storage'
export { debounce } from './debounce'
export { throttle } from './throttle'
export * from './constants'
export * from './performance'

// Export par défaut groupé (correspondant exactement à votre structure)
export default {
  formatPrice,
  formatDate,
  formatTime,
  isRestaurantOpen,
  getEstimatedTravelTime,
  generateConfirmationCode,
  validateFrenchPhone,
  formatPhoneNumber,
  calculateDistance,
  validators,
  storage,
  debounce,
  throttle
}