// utils/performance.js
/**
 * Utilitaire pour lazy loading des images
 * @param {string} src - URL de l'image
 * @param {Function} callback - Callback quand l'image est chargée
 * @returns {void}
 * 
 * @example
 * lazyLoadImage('/path/to/image.jpg', (error, img) => {
 *   if (error) {
 *     console.error('Failed to load image')
 *   } else {
 *     document.body.appendChild(img)
 *   }
 * })
 */
export const lazyLoadImage = (src, callback) => {
  const img = new Image()
  img.onload = () => callback(null, img)
  img.onerror = (error) => callback(error, null)
  img.src = src
}

/**
 * Mesurer les performances d'une fonction
 * @param {Function} func - Fonction à mesurer
 * @param {string} label - Label pour l'affichage
 * @returns {Function} Fonction wrappée avec mesure de performance
 * 
 * @example
 * const measureExpensiveFunction = measurePerformance(
 *   expensiveFunction, 
 *   'Expensive Operation'
 * )
 * await measureExpensiveFunction() // Affichera le temps d'exécution
 */
export const measurePerformance = (func, label = 'Function') => {
  return async (...args) => {
    const start = performance.now()
    const result = await func(...args)
    const end = performance.now()
    console.log(`${label} took ${end - start} milliseconds`)
    return result
  }
}

/**
 * Créer un cache simple avec TTL (Time To Live)
 * @param {number} ttl - Durée de vie en millisecondes
 * @returns {Object} Objet cache avec get/set/clear
 * 
 * @example
 * const cache = createCache(5000) // Cache de 5 secondes
 * cache.set('key', 'value')
 * const value = cache.get('key') // 'value' ou null si expiré
 */
export const createCache = (ttl = 60000) => {
  const cache = new Map()
  
  return {
    get: (key) => {
      const item = cache.get(key)
      if (!item) return null
      
      if (Date.now() > item.expiry) {
        cache.delete(key)
        return null
      }
      
      return item.value
    },
    
    set: (key, value) => {
      cache.set(key, {
        value,
        expiry: Date.now() + ttl
      })
    },
    
    clear: () => cache.clear(),
    
    size: () => cache.size
  }
}

export default {
  lazyLoadImage,
  measurePerformance,
  createCache
}