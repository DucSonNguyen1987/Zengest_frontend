// web-admin/src/components/layout/Header/SearchResults.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  UserIcon,
  TableCellsIcon,
  CubeIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// ========================================
// 🔍 COMPOSANT RÉSULTATS DE RECHERCHE
// ========================================

const SearchResults = ({ 
  isOpen = false, 
  results = [], 
  query = '', 
  isLoading = false,
  onClose = () => {},
  onResultClick = () => {}
}) => {
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleResultClick = (result) => {
    onResultClick(result);
    onClose();
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // ========================================
  // 🎨 UTILITAIRES DE RENDU
  // ========================================
  
  const getResultIcon = (type) => {
    const iconClass = "h-5 w-5";
    
    switch (type) {
      case 'user':
        return <UserIcon className={iconClass} />;
      case 'menu':
        return <CubeIcon className={iconClass} />;
      case 'table':
        return <TableCellsIcon className={iconClass} />;
      case 'reservation':
        return <CalendarDaysIcon className={iconClass} />;
      case 'order':
        return <ShoppingBagIcon className={iconClass} />;
      case 'analytics':
        return <ChartBarIcon className={iconClass} />;
      default:
        return <MagnifyingGlassIcon className={iconClass} />;
    }
  };
  
  const getResultTypeLabel = (type) => {
    const labels = {
      user: 'Utilisateur',
      menu: 'Menu',
      table: 'Table',
      reservation: 'Réservation',
      order: 'Commande',
      analytics: 'Analytics',
      page: 'Page'
    };
    
    return labels[type] || 'Résultat';
  };
  
  const highlightQuery = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="has-background-warning-light">
          {part}
        </mark>
      ) : part
    );
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="search-results-overlay" onClick={handleBackdropClick}>
        <motion.div
          className="search-results"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="search-results__header">
            <div className="search-results__title">
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              <span>
                {isLoading ? 'Recherche...' : `Résultats pour "${query}"`}
              </span>
            </div>
            
            {results.length > 0 && !isLoading && (
              <span className="tag is-light is-small">
                {results.length} résultat{results.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div className="search-results__content">
            {/* État de chargement */}
            {isLoading && (
              <div className="search-results__loading">
                <div className="has-text-centered py-4">
                  <div className="loader is-inline-block mr-2"></div>
                  <span className="is-size-7 has-text-grey">Recherche en cours...</span>
                </div>
              </div>
            )}
            
            {/* Résultats */}
            {!isLoading && results.length > 0 && (
              <div className="search-results__list">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id || index}
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                    whileHover={{ backgroundColor: '#f5f5f5' }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="search-result-item__icon">
                      {getResultIcon(result.type)}
                    </div>
                    
                    <div className="search-result-item__content">
                      <div className="search-result-item__title">
                        {highlightQuery(result.title, query)}
                      </div>
                      
                      {result.description && (
                        <div className="search-result-item__description">
                          {highlightQuery(result.description, query)}
                        </div>
                      )}
                      
                      <div className="search-result-item__meta">
                        <span className="tag is-light is-small">
                          {getResultTypeLabel(result.type)}
                        </span>
                        
                        {result.section && (
                          <span className="is-size-7 has-text-grey ml-2">
                            dans {result.section}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="search-result-item__action">
                      <span className="icon is-small has-text-grey">
                        →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Aucun résultat */}
            {!isLoading && results.length === 0 && query && (
              <div className="search-results__empty">
                <div className="has-text-centered py-6">
                  <MagnifyingGlassIcon className="h-8 w-8 has-text-grey-light mb-3" />
                  <p className="has-text-grey">
                    Aucun résultat trouvé pour "<strong>{query}</strong>"
                  </p>
                  <p className="is-size-7 has-text-grey mt-2">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              </div>
            )}
            
            {/* Suggestions si pas de requête */}
            {!query && !isLoading && (
              <div className="search-results__suggestions">
                <p className="search-results__suggestions-title">
                  Recherches rapides
                </p>
                
                <div className="search-results__suggestions-list">
                  <div className="search-suggestion" onClick={() => handleResultClick({ query: 'commandes', type: 'order' })}>
                    <ShoppingBagIcon className="h-4 w-4 mr-2" />
                    <span>Commandes du jour</span>
                  </div>
                  
                  <div className="search-suggestion" onClick={() => handleResultClick({ query: 'menu', type: 'menu' })}>
                    <CubeIcon className="h-4 w-4 mr-2" />
                    <span>Articles du menu</span>
                  </div>
                  
                  <div className="search-suggestion" onClick={() => handleResultClick({ query: 'réservations', type: 'reservation' })}>
                    <CalendarDaysIcon className="h-4 w-4 mr-2" />
                    <span>Réservations</span>
                  </div>
                  
                  <div className="search-suggestion" onClick={() => handleResultClick({ query: 'utilisateurs', type: 'user' })}>
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>Utilisateurs</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="search-results__footer">
            <p className="is-size-7 has-text-grey">
              Utilisez <kbd>↑</kbd> <kbd>↓</kbd> pour naviguer, <kbd>Entrée</kbd> pour sélectionner
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchResults;

// ========================================
// 🎨 STYLES EN LIGNE (À DÉPLACER DANS UN FICHIER .scss)
// ========================================

/*
Ajoutez ces styles dans votre fichier CSS principal ou créez SearchResults.scss :

.search-results-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding-top: 80px;
}

.search-results {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-results__header {
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-results__title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #4a4a4a;
}

.search-results__content {
  flex: 1;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.search-result-item__icon {
  margin-right: 0.75rem;
  color: #7a7a7a;
}

.search-result-item__content {
  flex: 1;
}

.search-result-item__title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.search-result-item__description {
  color: #7a7a7a;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.search-result-item__meta {
  display: flex;
  align-items: center;
}

.search-result-item__action {
  margin-left: 0.5rem;
}

.search-suggestion {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.search-suggestion:hover {
  background-color: #f5f5f5;
}

.search-results__suggestions {
  padding: 1rem;
}

.search-results__suggestions-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #4a4a4a;
}

.search-results__footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #f5f5f5;
  background-color: #fafafa;
}

kbd {
  background-color: #f5f5f5;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  padding: 0.125rem 0.25rem;
  font-size: 0.75rem;
  margin: 0 0.125rem;
}
*/