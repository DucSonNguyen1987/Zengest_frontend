import { useEffect } from 'react';

/**
 * Hook pour modifier le titre du document
 */
export const useDocumentTitle = (title, suffix = 'Zengest Admin') => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} - ${suffix}` : suffix;

    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};