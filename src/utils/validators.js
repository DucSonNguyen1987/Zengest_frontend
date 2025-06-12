// utils/validators.js
import { validateFrenchPhone } from './helpers'

/**
 * Validateurs pour formulaires
 */
export const validators = {
  required: (value) => value ? true : 'Ce champ est requis',
  
  email: (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(value) || 'Adresse email invalide'
  },
  
  phone: (value) => {
    return validateFrenchPhone(value) || 'Numéro de téléphone invalide'
  },
  
  minLength: (min) => (value) => {
    return value.length >= min || `Minimum ${min} caractères`
  },
  
  maxLength: (max) => (value) => {
    return value.length <= max || `Maximum ${max} caractères`
  },
  
  futureDate: (value) => {
    const selectedDate = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today || 'La date doit être dans le futur'
  },
  
  businessHours: (time, dayOfWeek) => {
    const timeNum = parseInt(time.replace(':', ''))
    
    // Dimanche fermé
    if (dayOfWeek === 0) {
      return 'Le restaurant est fermé le dimanche'
    }
    
    // Samedi: dîner seulement
    if (dayOfWeek === 6) {
      if (timeNum < 1900 || timeNum > 2300) {
        return 'Le samedi, service dîner uniquement (19h-23h)'
      }
      return true
    }
    
    // Lundi-Vendredi
    const lunchValid = timeNum >= 1200 && timeNum <= 1430
    const dinnerValid = timeNum >= 1900 && timeNum <= 2230
    
    if (!lunchValid && !dinnerValid) {
      return 'Horaires de service: 12h-14h30 et 19h-22h30'
    }
    
    return true
  }
}

export default validators