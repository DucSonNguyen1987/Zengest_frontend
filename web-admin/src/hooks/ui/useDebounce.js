// web-admin/src/hooks/ui/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Hook pour débouncer une valeur
 * @param {any} value - La valeur à débouncer
 * @param {number} delay - Le délai en millisecondes (défaut: 500ms)
 * @returns {any} La valeur débouncée
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Créer un timer qui met à jour la valeur débouncée après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timeout si value change (ou si le composant se démonte)
    // Cela empêche l'exécution de la fonction de debounce si `value` change dans le délai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Relancer l'effet seulement si value ou delay change

  return debouncedValue;
};

/**
 * Hook pour débouncer une fonction de callback
 * @param {Function} callback - La fonction à débouncer
 * @param {number} delay - Le délai en millisecondes (défaut: 500ms)
 * @param {Array} deps - Les dépendances du callback (optionnel)
 * @returns {Function} La fonction débouncée
 */
export const useDebouncedCallback = (callback, delay = 500, deps = []) => {
  const [debouncedCallback, setDebouncedCallback] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, ...deps]);

  return debouncedCallback;
};

/**
 * Hook pour débouncer les recherches/filtres
 * Spécialisé pour les cas d'usage de recherche
 * @param {string} searchTerm - Le terme de recherche
 * @param {number} delay - Le délai en millisecondes (défaut: 300ms)
 * @returns {object} { debouncedSearchTerm, isSearching }
 */
export const useSearchDebounce = (searchTerm, delay = 300) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return { debouncedSearchTerm, isSearching };
};

export default useDebounce;