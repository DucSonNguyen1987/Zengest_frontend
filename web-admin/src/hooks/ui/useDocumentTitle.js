// web-admin/src/hooks/ui/useDocumentTitle.js
import { useEffect, useRef } from 'react';

/**
 * Hook pour gérer le titre du document
 * @param {string} title - Le nouveau titre à définir
 * @param {Object} options - Options de configuration
 * @param {boolean} options.restoreOnUnmount - Restaurer le titre précédent au démontage
 * @param {string} options.template - Template pour le titre (ex: "%s | Mon App")
 */
export const useDocumentTitle = (title, options = {}) => {
  const {
    restoreOnUnmount = true,
    template = '%s'
  } = options;
  
  const prevTitleRef = useRef(document.title);
  
  useEffect(() => {
    const prevTitle = prevTitleRef.current;
    
    // Appliquer le nouveau titre avec le template
    const formattedTitle = template.replace('%s', title);
    document.title = formattedTitle;
    
    // Fonction de nettoyage
    return () => {
      if (restoreOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, [title, template, restoreOnUnmount]);
  
  // Mettre à jour la référence du titre précédent
  useEffect(() => {
    prevTitleRef.current = document.title;
  }, []);
};

export default useDocumentTitle;