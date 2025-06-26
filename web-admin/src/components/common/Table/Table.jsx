// Table.jsx - VERSION BLINDÉE ANTI-BOUCLE
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

// Composants
import Button from '../Button/Button';
import Pagination from '../Pagination/Pagination';

// Hooks
import { useDebounce } from '@/hooks/ui/useDebounce';

// Utilitaires
import { formatDate, formatCurrency, formatNumber } from '../../../utils/formatters/formatters';

// ========================================
// 🛡️ TABLE BLINDÉE CONTRE LES BOUCLES
// ========================================

const Table = ({
  columns = [],
  data = [],
  loading = false,
  error = null,
  
  // Pagination
  pagination = false,
  currentPage = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange = null,
  onPageSizeChange = null,
  pageSizeOptions = [10, 20, 50, 100],
  
  // Tri
  sortable = true,
  defaultSort = null,
  onSort = null,
  
  // Recherche
  searchable = false,
  searchPlaceholder = 'Rechercher...',
  onSearch = null,
  globalSearch = true,
  
  // Filtres
  filterable = false,
  
  // Sélection
  selectable = false,
  selectedRows = [],
  onSelectionChange = null,
  
  // Actions
  actions = [],
  bulkActions = [],
  
  // Apparence
  striped = true,
  bordered = false,
  hover = true,
  compact = false,
  responsive = true,
  
  // Callbacks
  onRowClick = null,
  onRowDoubleClick = null,
  
  // Personnalisation
  className = '',
  emptyMessage = 'Aucune donnée disponible',
  loadingRows = 5,
  
  // Export
  exportable = false,
  onExport = null
}) => {
  
  // ========================================
  // 📝 ÉTATS LOCAUX MINIMAUX
  // ========================================
  const [localSearch, setLocalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState(defaultSort || { key: null, direction: null });
  const [showFilters, setShowFilters] = useState(false);
  
  // ✅ Debounce simple
  const debouncedSearch = useDebounce(localSearch, 300);
  
  // ========================================
  // 🛠️ FONCTIONS UTILITAIRES INLINE (PAS de useCallback)
  // ========================================
  
  // ✅ Fonction pure - pas de useCallback
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  // ✅ Fonction pure - pas de useCallback  
  function formatCellValue(value, column, row) {
    if (value === null || value === undefined) return '-';
    
    switch (column.type) {
      case 'date':
        return formatDate(value, column.dateFormat);
      case 'currency':
        return formatCurrency(value, column.currency);
      case 'number':
        return formatNumber(value, column.decimals);
      case 'boolean':
        return value ? '✓' : '✗';
      case 'badge':
        return (
          <span className={`table__badge table__badge--${column.getBadgeVariant?.(value) || 'default'}`}>
            {column.getBadgeText?.(value) || value}
          </span>
        );
      case 'custom':
        return column.render?.(value, row) || value;
      default:
        return value;
    }
  }
  
  // ========================================
  // 🎯 LOGIQUE DE TRI ET FILTRAGE
  // ========================================
  
  // ✅ useMemo avec dépendances primitives seulement
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Recherche globale
    if (globalSearch && debouncedSearch && !onSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(row =>
        columns.some(column => {
          const value = getNestedValue(row, column.key);
          return value && value.toString().toLowerCase().includes(searchLower);
        })
      );
    }
    
    // Tri local (si pas de tri côté serveur)
    if (sortConfig.key && !onSort) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue > bValue ? 1 : -1;
        return sortConfig.direction === 'desc' ? -comparison : comparison;
      });
    }
    
    return result;
  }, [
    data, 
    debouncedSearch, 
    sortConfig.key, 
    sortConfig.direction, 
    columns.length, // ✅ Longueur au lieu de l'objet complet
    globalSearch
  ]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS INLINE
  // ========================================
  
  // ✅ Gestionnaires inline - PAS de useCallback
  function handleSort(columnKey) {
    if (!sortable) return;
    
    const newDirection = 
      sortConfig.key === columnKey && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    const newSortConfig = { key: columnKey, direction: newDirection };
    setSortConfig(newSortConfig);
    
    // ✅ Appel direct après setState
    if (onSort) {
      setTimeout(() => onSort(newSortConfig), 0);
    }
  }
  
  function handleSearchChange(e) {
    const value = e.target.value;
    setLocalSearch(value);
    
    // ✅ Appel de onSearch avec timeout pour éviter spam
    if (onSearch) {
      setTimeout(() => onSearch(value), 350);
    }
  }
  
  function handleRowSelection(rowId, checked) {
    if (!onSelectionChange) return;
    
    let newSelection;
    if (checked) {
      newSelection = [...selectedRows, rowId];
    } else {
      newSelection = selectedRows.filter(id => id !== rowId);
    }
    
    // ✅ Appel direct immédiat
    onSelectionChange(newSelection);
  }
  
  function handleSelectAll(checked) {
    if (!onSelectionChange) return;
    
    const newSelection = checked 
      ? processedData.map(row => row.id)
      : [];
    
    // ✅ Appel direct immédiat
    onSelectionChange(newSelection);
  }
  
  function handleRowClick(row, event) {
    if (onRowClick) {
      onRowClick(row, event);
    }
  }
  
  function handleRowDoubleClick(row, event) {
    if (onRowDoubleClick) {
      onRowDoubleClick(row, event);
    }
  }
  
  // ========================================
  // 🎨 CLASSES CSS INLINE
  // ========================================
  
  const tableClasses = [
    'table-container',
    striped && 'table-container--striped',
    bordered && 'table-container--bordered',
    hover && 'table-container--hover',
    compact && 'table-container--compact',
    responsive && 'table-container--responsive',
    selectable && 'table-container--selectable',
    loading && 'table-container--loading',
    className
  ].filter(Boolean).join(' ');
  
  // ========================================
  // 🎯 RENDU DIRECT - PAS de fonctions séparées
  // ========================================
  
  return (
    <div className={tableClasses}>
      {/* Toolbar */}
      {(searchable || filterable || exportable || bulkActions.length > 0) && (
        <div className="table__toolbar">
          <div className="table__toolbar-left">
            {searchable && (
              <div className="table__search">
                <MagnifyingGlassIcon className="table__search-icon" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={localSearch}
                  onChange={handleSearchChange}
                  className="table__search-input"
                />
              </div>
            )}
            
            {filterable && (
              <Button
                variant="ghost"
                icon={AdjustmentsHorizontalIcon}
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'active' : ''}
              >
                Filtres
              </Button>
            )}
          </div>
          
          <div className="table__toolbar-right">
            {bulkActions.length > 0 && selectedRows.length > 0 && (
              <div className="table__bulk-actions">
                <span className="table__selection-count">
                  {selectedRows.length} sélectionné{selectedRows.length > 1 ? 's' : ''}
                </span>
                {bulkActions.map((action, index) => (
                  <Button
                    key={index}
                    size="small"
                    variant={action.variant || 'secondary'}
                    icon={action.icon}
                    onClick={() => action.onClick(selectedRows)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
            
            {exportable && (
              <Button
                variant="ghost"
                icon={ArrowDownTrayIcon}
                onClick={onExport}
              >
                Exporter
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Filtres */}
      {showFilters && filterable && (
        <div className="table__filters">
          <p>Filtres (à implémenter selon vos besoins)</p>
        </div>
      )}
      
      {/* Table */}
      <div className="table__wrapper">
        <table className="table">
          {/* Header */}
          <thead className="table__head">
            <tr className="table__row table__row--header">
              {selectable && (
                <th className="table__cell table__cell--checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === processedData.length && processedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="table__checkbox"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`table__cell table__cell--header ${
                    column.sortable !== false && sortable ? 'table__cell--sortable' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="table__header-content">
                    <span className="table__header-text">{column.title}</span>
                    
                    {column.sortable !== false && sortable && (
                      <span className="table__sort-icon">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon className="icon" />
                          ) : (
                            <ChevronDownIcon className="icon" />
                          )
                        ) : (
                          <ChevronUpDownIcon className="icon" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              
              {actions.length > 0 && (
                <th className="table__cell table__cell--actions">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody className="table__body">
            {loading ? (
              // ✅ Loading state
              Array.from({ length: loadingRows }).map((_, index) => (
                <tr key={`loading-${index}`} className="table__row table__row--loading">
                  {selectable && (
                    <td className="table__cell">
                      <div className="table__skeleton table__skeleton--checkbox"></div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="table__cell">
                      <div className="table__skeleton"></div>
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="table__cell">
                      <div className="table__skeleton table__skeleton--actions"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : error ? (
              // ✅ Error state
              <tr className="table__row table__row--error">
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="table__cell table__cell--error"
                >
                  <div className="table__error">
                    <p>Erreur lors du chargement des données</p>
                    <p className="table__error-message">{error}</p>
                  </div>
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              // ✅ Empty state
              <tr className="table__row table__row--empty">
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="table__cell table__cell--empty"
                >
                  <div className="table__empty">
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // ✅ Data rows
              <AnimatePresence>
                {processedData.map((row, index) => (
                  <motion.tr
                    key={row.id || index}
                    className={`table__row ${selectedRows.includes(row.id) ? 'table__row--selected' : ''}`}
                    onClick={(e) => handleRowClick(row, e)}
                    onDoubleClick={(e) => handleRowDoubleClick(row, e)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                  >
                    {selectable && (
                      <td className="table__cell table__cell--checkbox">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => handleRowSelection(row.id, e.target.checked)}
                          className="table__checkbox"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    
                    {columns.map((column) => {
                      const value = getNestedValue(row, column.key);
                      
                      return (
                        <td
                          key={column.key}
                          className={`table__cell ${column.className || ''}`}
                          style={column.cellStyle}
                        >
                          {formatCellValue(value, column, row)}
                        </td>
                      );
                    })}
                    
                    {actions.length > 0 && (
                      <td className="table__cell table__cell--actions">
                        <div className="table__actions">
                          {actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              size="small"
                              variant={action.variant || 'ghost'}
                              icon={action.icon}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                              }}
                              disabled={action.disabled?.(row)}
                              title={action.title}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'date', 'currency', 'number', 'boolean', 'badge', 'custom']),
    sortable: PropTypes.bool,
    width: PropTypes.string,
    render: PropTypes.func,
    className: PropTypes.string,
    cellStyle: PropTypes.object
  })).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  pagination: PropTypes.bool,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  sortable: PropTypes.bool,
  searchable: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.array,
  onSelectionChange: PropTypes.func,
  actions: PropTypes.array,
  bulkActions: PropTypes.array,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  emptyMessage: PropTypes.string
};

export default Table;