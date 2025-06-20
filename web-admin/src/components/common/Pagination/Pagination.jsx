// ========================================
// 📄 PAGINATION.JSX - COMPOSANT DE PAGINATION RÉUTILISABLE
// ========================================
// Fichier: web-admin/src/components/common/Pagination/Pagination.jsx
//
// Composant de pagination avancé avec support complet des fonctionnalités
// de navigation, sélection de taille de page et affichage d'informations.

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

// Composants
import Button from '../Button/Button';

// Styles
import '../../../styles/components/Pagination.scss';

// ========================================
// 🎯 COMPOSANT PAGINATION PRINCIPAL
// ========================================

const Pagination = ({
  currentPage = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange,
  onPageSizeChange = null,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelector = true,
  showInfo = true,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  compact = false,
  className = '',
  disabled = false,
  loading = false,
  variant = 'default', // default, simple, minimal
  align = 'center', // left, center, right
  size = 'medium' // small, medium, large
}) => {
  
  // ========================================
  // 📊 CALCULS DÉRIVÉS
  // ========================================
  
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    
    return {
      totalPages,
      startItem,
      endItem,
      hasNextPage,
      hasPrevPage,
      isFirstPage,
      isLastPage
    };
  }, [currentPage, pageSize, totalItems]);
  
  // ========================================
  // 📋 GÉNÉRATION DES NUMÉROS DE PAGES
  // ========================================
  
  const visiblePages = useMemo(() => {
    const { totalPages } = paginationData;
    
    if (totalPages <= maxVisiblePages) {
      // Afficher toutes les pages si peu nombreuses
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);
    
    // Ajuster les limites si nécessaire
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    
    const pages = [];
    
    // Première page et ellipsis
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('ellipsis-start');
      }
    }
    
    // Pages visibles
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Ellipsis et dernière page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, paginationData.totalPages, maxVisiblePages]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handlePageChange = (page) => {
    if (disabled || loading) return;
    
    const newPage = Math.max(1, Math.min(page, paginationData.totalPages));
    if (newPage !== currentPage && onPageChange) {
      onPageChange(newPage);
    }
  };
  
  const handlePageSizeChange = (newPageSize) => {
    if (disabled || loading || !onPageSizeChange) return;
    
    // Calculer la nouvelle page pour maintenir la position approximative
    const currentFirstItem = (currentPage - 1) * pageSize + 1;
    const newPage = Math.ceil(currentFirstItem / newPageSize);
    
    onPageSizeChange(newPageSize);
    if (newPage !== currentPage && onPageChange) {
      onPageChange(newPage);
    }
  };
  
  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(paginationData.totalPages);
  const handlePrevPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);
  
  // ========================================
  // 🎨 CLASSES CSS
  // ========================================
  
  const getPaginationClasses = () => {
    const classes = ['pagination'];
    
    classes.push(`pagination--${variant}`);
    classes.push(`pagination--${size}`);
    classes.push(`pagination--align-${align}`);
    
    if (compact) classes.push('pagination--compact');
    if (disabled) classes.push('pagination--disabled');
    if (loading) classes.push('pagination--loading');
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🎨 RENDU DES COMPOSANTS
  // ========================================
  
  // Bouton de page
  const renderPageButton = (page, isActive = false) => {
    if (typeof page === 'string' && page.startsWith('ellipsis')) {
      return (
        <span key={page} className="pagination__ellipsis">
          <EllipsisHorizontalIcon className="pagination__ellipsis-icon" />
        </span>
      );
    }
    
    return (
      <motion.div
        key={page}
        whileHover={{ scale: !disabled && !isActive ? 1.05 : 1 }}
        whileTap={{ scale: !disabled && !isActive ? 0.95 : 1 }}
      >
        <Button
          variant={isActive ? 'primary' : 'ghost'}
          size={size === 'small' ? 'small' : 'medium'}
          onClick={() => handlePageChange(page)}
          disabled={disabled || loading || isActive}
          className={`pagination__page-button ${isActive ? 'pagination__page-button--active' : ''}`}
          aria-label={`Page ${page}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {page}
        </Button>
      </motion.div>
    );
  };
  
  // Boutons de navigation
  const renderNavButton = (onClick, Icon, label, condition = true) => {
    if (!condition) return null;
    
    return (
      <Button
        variant="ghost"
        size={size === 'small' ? 'small' : 'medium'}
        icon={Icon}
        onClick={onClick}
        disabled={disabled || loading || !condition}
        className="pagination__nav-button"
        aria-label={label}
      />
    );
  };
  
  // Sélecteur de taille de page
  const renderPageSizeSelector = () => {
    if (!showPageSizeSelector || !onPageSizeChange || compact) return null;
    
    return (
      <div className="pagination__page-size">
        <label className="pagination__page-size-label">
          Afficher :
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={disabled || loading}
            className="pagination__page-size-select"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          éléments
        </label>
      </div>
    );
  };
  
  // Informations de pagination
  const renderPaginationInfo = () => {
    if (!showInfo) return null;
    
    const { startItem, endItem } = paginationData;
    
    if (compact) {
      return (
        <div className="pagination__info pagination__info--compact">
          {currentPage} / {paginationData.totalPages}
        </div>
      );
    }
    
    return (
      <div className="pagination__info">
        {totalItems === 0 ? (
          'Aucun élément'
        ) : (
          <>
            Affichage de <strong>{startItem}</strong> à <strong>{endItem}</strong> sur <strong>{totalItems}</strong> éléments
          </>
        )}
      </div>
    );
  };
  
  // ========================================
  // 🎯 RENDU CONDITIONNEL
  // ========================================
  
  // Ne pas afficher si pas d'éléments ou une seule page
  if (totalItems === 0 || paginationData.totalPages <= 1) {
    if (showInfo && totalItems === 0) {
      return (
        <div className={getPaginationClasses()}>
          {renderPaginationInfo()}
        </div>
      );
    }
    return null;
  }
  
  // ========================================
  // 🎯 RENDU PRINCIPAL
  // ========================================
  
  if (variant === 'minimal') {
    return (
      <div className={getPaginationClasses()}>
        <div className="pagination__minimal">
          {renderNavButton(handlePrevPage, ChevronLeftIcon, 'Page précédente', paginationData.hasPrevPage)}
          {renderPaginationInfo()}
          {renderNavButton(handleNextPage, ChevronRightIcon, 'Page suivante', paginationData.hasNextPage)}
        </div>
      </div>
    );
  }
  
  if (variant === 'simple') {
    return (
      <div className={getPaginationClasses()}>
        <div className="pagination__simple">
          {renderPageSizeSelector()}
          <div className="pagination__controls">
            {renderNavButton(handlePrevPage, ChevronLeftIcon, 'Page précédente', paginationData.hasPrevPage)}
            {renderPaginationInfo()}
            {renderNavButton(handleNextPage, ChevronRightIcon, 'Page suivante', paginationData.hasNextPage)}
          </div>
        </div>
      </div>
    );
  }
  
  // Variante par défaut (complète)
  return (
    <div className={getPaginationClasses()}>
      <div className="pagination__container">
        {/* Sélecteur de taille de page */}
        {renderPageSizeSelector()}
        
        {/* Navigation principale */}
        <div className="pagination__navigation">
          {/* Boutons première/précédente */}
          <div className="pagination__nav-group">
            {showFirstLast && renderNavButton(
              handleFirstPage, 
              ChevronDoubleLeftIcon, 
              'Première page', 
              paginationData.hasPrevPage
            )}
            {showPrevNext && renderNavButton(
              handlePrevPage, 
              ChevronLeftIcon, 
              'Page précédente', 
              paginationData.hasPrevPage
            )}
          </div>
          
          {/* Numéros de pages */}
          <div className="pagination__pages">
            {visiblePages.map(page => 
              renderPageButton(page, page === currentPage)
            )}
          </div>
          
          {/* Boutons suivante/dernière */}
          <div className="pagination__nav-group">
            {showPrevNext && renderNavButton(
              handleNextPage, 
              ChevronRightIcon, 
              'Page suivante', 
              paginationData.hasNextPage
            )}
            {showFirstLast && renderNavButton(
              handleLastPage, 
              ChevronDoubleRightIcon, 
              'Dernière page', 
              paginationData.hasNextPage
            )}
          </div>
        </div>
        
        {/* Informations */}
        {renderPaginationInfo()}
      </div>
    </div>
  );
};

// ========================================
// 🎯 PROP TYPES
// ========================================

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  showPageSizeSelector: PropTypes.bool,
  showInfo: PropTypes.bool,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  compact: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'simple', 'minimal']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

// ========================================
// 🎯 VARIANTES DE COMPOSANTS
// ========================================

// Pagination simple avec juste prev/next
export const SimplePagination = (props) => (
  <Pagination 
    variant="simple" 
    showFirstLast={false}
    maxVisiblePages={3}
    {...props} 
  />
);

// Pagination minimale pour mobile
export const MinimalPagination = (props) => (
  <Pagination 
    variant="minimal"
    showPageSizeSelector={false}
    showFirstLast={false}
    compact
    {...props} 
  />
);

// Pagination compacte
export const CompactPagination = (props) => (
  <Pagination 
    compact
    showPageSizeSelector={false}
    maxVisiblePages={5}
    {...props} 
  />
);

export default Pagination;