// utils/debounce.js
/**
 * Fonction debounce pour optimiser les performances
 * Retarde l'exécution d'une fonction jusqu'à ce qu'un délai se soit écoulé
 * depuis le dernier appel
 * 
 * @param {Function} func - Fonction à débouncer
 * @param {number} wait - Délai d'attente en millisecondes
 * @param {boolean} immediate - Si true, exécute immédiatement puis attend
 * @returns {Function} Fonction débouncée
 * 
 * @example
 * const debouncedSearch = debounce((query) => {
 *   console.log('Searching for:', query)
 * }, 300)
 * 
 * // N'exécutera la recherche que 300ms après le dernier appel
 * debouncedSearch('react')
 * debouncedSearch('react hooks') // Annule le précédent
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout
  
  return function executedFunction(...args) {
    const context = this
    
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    
    const callNow = immediate && !timeout
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(context, args)
  }
}

export default debounce