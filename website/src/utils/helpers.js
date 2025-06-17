// utils/helpers.js

/**
 * Formater un prix en euros
 * @param {number} price - Prix à formater
 * @returns {string} Prix formaté
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return '--€'
  return `${price.toFixed(2)}€`
}

/**
 * Formater une date en français
 * @param {Date|string} date - Date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  const finalOptions = { ...defaultOptions, ...options }
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('fr-FR', finalOptions)
  } catch (error) {
    return 'Date invalide'
  }
}

/**
 * Formater une heure
 * @param {string} time - Heure au format HH:MM
 * @returns {string} Heure formatée
 */
export const formatTime = (time) => {
  if (!time) return '--:--'
  return time
}

/**
 * Vérifier si le restaurant est ouvert
 * @param {Date} datetime - Date et heure à vérifier
 * @returns {boolean} True si ouvert
 */
export const isRestaurantOpen = (datetime = new Date()) => {
  const day = datetime.getDay()
  const time = datetime.getHours() * 100 + datetime.getMinutes()
  
  // Dimanche fermé
  if (day === 0) return false
  
  // Samedi: dîner seulement
  if (day === 6) {
    return time >= 1900 && time <= 2300
  }
  
  // Lundi-Vendredi: déjeuner + dîner
  const lunchOpen = time >= 1200 && time <= 1430
  const dinnerOpen = time >= 1900 && time <= 2230
  
  return lunchOpen || dinnerOpen
}

/**
 * Calculer le temps de trajet estimé
 * @param {string} origin - Adresse d'origine
 * @returns {string} Temps estimé
 */
export const getEstimatedTravelTime = (origin) => {
  // Simulation - dans un vrai projet, utiliser Google Maps API
  const parisAddresses = ['paris', '75001', '75002', '75003', '75004']
  const isInParis = parisAddresses.some(addr => 
    origin.toLowerCase().includes(addr.toLowerCase())
  )
  
  if (isInParis) return '15-30 min'
  return '30-60 min'
}

/**
 * Générer un code de confirmation aléatoire
 * @returns {string} Code de confirmation
 */
export const generateConfirmationCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Valider un numéro de téléphone français
 * @param {string} phone - Numéro à valider
 * @returns {boolean} True si valide
 */
export const validateFrenchPhone = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
  return phoneRegex.test(phone)
}

/**
 * Nettoyer et formater un numéro de téléphone
 * @param {string} phone - Numéro à formater
 * @returns {string} Numéro formaté
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('33')) {
    return `+33 ${cleaned.slice(2, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`
  }
  
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`
  }
  
  return phone
}

/**
 * Calculer la distance entre deux points (approximative)
 * @param {number} lat1 - Latitude point 1
 * @param {number} lon1 - Longitude point 1  
 * @param {number} lat2 - Latitude point 2
 * @param {number} lon2 - Longitude point 2
 * @returns {number} Distance en km
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
};