// utils/throttle.js
/**
 * Fonction throttle pour limiter la fréquence d'exécution
 * Garantit qu'une fonction ne sera exécutée qu'une fois par intervalle de temps
 * 
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Limite de temps en millisecondes
 * @param {Object} options - Options de configuration
 * @param {boolean} options.leading - Exécuter au début de l'intervalle (défaut: true)
 * @param {boolean} options.trailing - Exécuter à la fin de l'intervalle (défaut: true)
 * @returns {Function} Fonction throttlée
 * 
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll event handled')
 * }, 100)
 * 
 * // N'exécutera l'handler que toutes les 100ms maximum
 * window.addEventListener('scroll', throttledScroll)
 */
export const throttle = (func, limit, options = {}) => {
  const { leading = true, trailing = true } = options
  
  let inThrottle
  let lastFunc
  let lastRan
  
  return function(...args) {
    const context = this
    
    if (!inThrottle) {
      if (leading) {
        func.apply(context, args)
        lastRan = Date.now()
      }
      inThrottle = true
    } else {
      if (trailing) {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
    
    setTimeout(() => {
      inThrottle = false
    }, limit)
  }
}

export default throttle