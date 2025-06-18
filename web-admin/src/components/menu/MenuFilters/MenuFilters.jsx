// web-admin/src/components/menu/MenuFilters/MenuFilters.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

// Hooks
import { useDebounce } from '@/hooks/ui/useDebounce';

// ========================================
// 🔍 COMPOSANT FILTRES MENU
// ========================================

const MenuFilters = ({ 
  filters = {}, 
  categories = [], 
  onFiltersChange = () => {},
  showAdvanced = true 
}) => {
  
  // États locaux
  const [localFilters, setLocalFilters] = useState({
    search: '',
    category: '',
    status: '',
    featured: '',
    dietary: '',
    priceRange: { min: '', max: '' },
    spiceLevel: '',
    tags: '',
    ...filters
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  
  // Debounce pour la recherche
  const debouncedSearch = useDebounce(localFilters.search, 300);
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Synchronisation avec les props
  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, ...filters }));
  }, [filters]);
  
  // Appel du callback avec debounce pour la recherche
  useEffect(() => {
    const newFilters = { ...localFilters, search: debouncedSearch };
    onFiltersChange(newFilters);
  }, [debouncedSearch]);
  
  // Appel du callback pour les autres filtres
  useEffect(() => {
    const { search, ...otherFilters } = localFilters;
    onFiltersChange({ ...otherFilters, search: debouncedSearch });
  }, [
    localFilters.category,
    localFilters.status,
    localFilters.featured,
    localFilters.dietary,
    localFilters.priceRange,
    localFilters.spiceLevel,
    localFilters.tags
  ]);
  
  // Vérifier si des filtres sont actifs
  useEffect(() => {
    const active = Object.entries(localFilters).some(([key, value]) => {
      if (key === 'search') return value.trim() !== '';
      if (key === 'priceRange') return value.min !== '' || value.max !== '';
      return value !== '';
    });
    setHasActiveFilters(active);
  }, [localFilters]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handlePriceRangeChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };
  
  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      status: '',
      featured: '',
      dietary: '',
      priceRange: { min: '', max: '' },
      spiceLevel: '',
      tags: ''
    };
    setLocalFilters(clearedFilters);
    setShowAdvancedFilters(false);
  };
  
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  return (
    <div className="menu-filters">
      <div className="box">
        {/* Filtres de base */}
        <div className="field is-grouped is-grouped-multiline">
          {/* Recherche */}
          <div className="control is-expanded">
            <div className="field has-addons">
              <div className="control has-icons-left is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Rechercher un article..."
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <span className="icon is-left">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </span>
              </div>
              {localFilters.search && (
                <div className="control">
                  <button
                    className="button"
                    onClick={() => handleFilterChange('search', '')}
                  >
                    <span className="icon">
                      <XMarkIcon className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Catégorie */}
          <div className="control">
            <div className="select">
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Statut */}
          <div className="control">
            <div className="select">
              <select
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Tous les statuts</option>
                <option value="available">Disponible</option>
                <option value="unavailable">Indisponible</option>
              </select>
            </div>
          </div>
          
          {/* Filtres avancés toggle */}
          {showAdvanced && (
            <div className="control">
              <button
                className={`button is-outlined ${showAdvancedFilters ? 'is-active' : ''}`}
                onClick={toggleAdvancedFilters}
              >
                <span className="icon">
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                </span>
                <span>Filtres avancés</span>
              </button>
            </div>
          )}
          
          {/* Effacer tous les filtres */}
          {hasActiveFilters && (
            <div className="control">
              <button
                className="button is-danger is-outlined"
                onClick={clearAllFilters}
              >
                <span className="icon">
                  <XMarkIcon className="h-4 w-4" />
                </span>
                <span>Effacer tout</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Filtres avancés */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="advanced-filters mt-4"
            >
              <hr />
              
              <div className="columns">
                {/* Colonne 1 */}
                <div className="column">
                  {/* Articles en vedette */}
                  <div className="field">
                    <label className="label">Articles en vedette</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={localFilters.featured}
                          onChange={(e) => handleFilterChange('featured', e.target.value)}
                        >
                          <option value="">Tous</option>
                          <option value="true">En vedette uniquement</option>
                          <option value="false">Non en vedette</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Régime alimentaire */}
                  <div className="field">
                    <label className="label">Régime alimentaire</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={localFilters.dietary}
                          onChange={(e) => handleFilterChange('dietary', e.target.value)}
                        >
                          <option value="">Tous</option>
                          <option value="vegetarian">🥬 Végétarien</option>
                          <option value="vegan">🌱 Végan</option>
                          <option value="glutenFree">🌾 Sans gluten</option>
                          <option value="organic">🌿 Bio</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Colonne 2 */}
                <div className="column">
                  {/* Fourchette de prix */}
                  <div className="field">
                    <label className="label">Fourchette de prix (€)</label>
                    <div className="field has-addons">
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          placeholder="Min"
                          min="0"
                          step="0.50"
                          value={localFilters.priceRange.min}
                          onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <span className="button is-static">à</span>
                      </div>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          placeholder="Max"
                          min="0"
                          step="0.50"
                          value={localFilters.priceRange.max}
                          onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Niveau d'épices */}
                  <div className="field">
                    <label className="label">Niveau d'épices</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={localFilters.spiceLevel}
                          onChange={(e) => handleFilterChange('spiceLevel', e.target.value)}
                        >
                          <option value="">Tous les niveaux</option>
                          <option value="0">🌶️ Aucun</option>
                          <option value="1">🌶️ Doux</option>
                          <option value="2">🌶️🌶️ Moyen</option>
                          <option value="3">🌶️🌶️🌶️ Fort</option>
                          <option value="4">🌶️🌶️🌶️🌶️ Très fort</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Colonne 3 */}
                <div className="column">
                  {/* Tags */}
                  <div className="field">
                    <label className="label">Tags</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Ex: Populaire, Nouveau..."
                        value={localFilters.tags}
                        onChange={(e) => handleFilterChange('tags', e.target.value)}
                      />
                    </div>
                    <p className="help">Rechercher par tags séparés par des virgules</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Résumé des filtres actifs */}
        {hasActiveFilters && (
          <div className="active-filters mt-3">
            <div className="tags">
              {localFilters.search && (
                <span className="tag is-info">
                  Recherche: {localFilters.search}
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('search', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.category && (
                <span className="tag is-primary">
                  Catégorie: {categories.find(c => c._id === localFilters.category)?.name}
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('category', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.status && (
                <span className="tag is-warning">
                  Statut: {localFilters.status === 'available' ? 'Disponible' : 'Indisponible'}
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('status', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.featured && (
                <span className="tag is-success">
                  <StarIcon className="h-3 w-3 mr-1" />
                  {localFilters.featured === 'true' ? 'En vedette' : 'Non en vedette'}
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('featured', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.dietary && (
                <span className="tag is-link">
                  Régime: {
                    localFilters.dietary === 'vegetarian' ? '🥬 Végétarien' :
                    localFilters.dietary === 'vegan' ? '🌱 Végan' :
                    localFilters.dietary === 'glutenFree' ? '🌾 Sans gluten' :
                    localFilters.dietary === 'organic' ? '🌿 Bio' : localFilters.dietary
                  }
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('dietary', '')}
                  ></button>
                </span>
              )}
              
              {(localFilters.priceRange.min || localFilters.priceRange.max) && (
                <span className="tag is-dark">
                  Prix: {localFilters.priceRange.min || '0'}€ - {localFilters.priceRange.max || '∞'}€
                  <button 
                    className="delete is-small"
                    onClick={() => handlePriceRangeChange('min', '') || handlePriceRangeChange('max', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.spiceLevel && (
                <span className="tag is-danger">
                  Épices: {
                    localFilters.spiceLevel === '0' ? '🌶️ Aucun' :
                    localFilters.spiceLevel === '1' ? '🌶️ Doux' :
                    localFilters.spiceLevel === '2' ? '🌶️🌶️ Moyen' :
                    localFilters.spiceLevel === '3' ? '🌶️🌶️🌶️ Fort' :
                    localFilters.spiceLevel === '4' ? '🌶️🌶️🌶️🌶️ Très fort' : localFilters.spiceLevel
                  }
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('spiceLevel', '')}
                  ></button>
                </span>
              )}
              
              {localFilters.tags && (
                <span className="tag is-light">
                  Tags: {localFilters.tags}
                  <button 
                    className="delete is-small"
                    onClick={() => handleFilterChange('tags', '')}
                  ></button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuFilters;