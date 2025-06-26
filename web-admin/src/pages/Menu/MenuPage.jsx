// web-admin/src/pages/Menu/MenuPage.jsx - VERSION COMPLÈTE AVEC COMPOSANTS INTÉGRÉS
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  CheckBadgeIcon,
  XMarkIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { 
  fetchMenuItems, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  fetchMenuCategories 
} from '@/store/slices/menuSlice';

// Sélecteurs
import { 
  selectMenuItems, 
  selectMenuCategories, 
  selectMenuLoading,
  selectMenuPagination 
} from '@/store/slices/menuSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';

// Composants
import Table from '@/components/common/Table/Table';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';

// Utilitaires - IMPORTS CORRIGÉS
import { formatCurrency } from '@shared/utils/formatters';
import { hasPermission } from '@shared/constants';

// Styles - CHEMIN CORRIGÉ
import '../../styles/pages/MenuPage.scss';

// ========================================
// 🔍 COMPOSANT FILTRES INTÉGRÉ
// ========================================
const MenuFilters = ({ filters, categories, onFiltersChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div className="box mb-5">
      <h3 className="title is-5 mb-4">
        <span className="icon-text">
          <span className="icon">
            <FunnelIcon />
          </span>
          <span>Filtres et recherche</span>
        </span>
      </h3>
      
      {/* Filtres de base */}
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Recherche</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Rechercher un article..."
                value={filters.search || ''}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              />
              <span className="icon is-small is-left">
                <MagnifyingGlassIcon />
              </span>
            </div>
          </div>
        </div>
        
        <div className="column">
          <div className="field">
            <label className="label">Catégorie</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={filters.category || ''}
                  onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
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
          </div>
        </div>
        
        <div className="column">
          <div className="field">
            <label className="label">Statut</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={filters.status || ''}
                  onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
                >
                  <option value="">Tous les statuts</option>
                  <option value="available">Disponible</option>
                  <option value="unavailable">Indisponible</option>
                  <option value="limited">Stock limité</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="column is-narrow">
          <div className="field">
            <label className="label">&nbsp;</label>
            <div className="control">
              <button
                className={`button ${showAdvanced ? 'is-primary' : 'is-outlined'}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span className="icon">
                  <AdjustmentsHorizontalIcon />
                </span>
                <span>Avancé</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtres avancés */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <hr />
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Prix minimum</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={filters.priceRange?.min || ''}
                      onChange={(e) => onFiltersChange({ 
                        ...filters, 
                        priceRange: { ...filters.priceRange, min: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="column">
                <div className="field">
                  <label className="label">Prix maximum</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      step="0.01"
                      placeholder="999.99"
                      value={filters.priceRange?.max || ''}
                      onChange={(e) => onFiltersChange({ 
                        ...filters, 
                        priceRange: { ...filters.priceRange, max: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="column">
                <div className="field">
                  <label className="label">Mise en avant</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={filters.featured || ''}
                        onChange={(e) => onFiltersChange({ ...filters, featured: e.target.value })}
                      >
                        <option value="">Peu importe</option>
                        <option value="true">En vedette uniquement</option>
                        <option value="false">Pas en vedette</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ========================================
// 📝 COMPOSANT FORMULAIRE ARTICLE INTÉGRÉ
// ========================================
const MenuItemForm = ({ item, categories, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: '',
    image: '',
    featured: false,
    availability: {
      isAvailable: true,
      availableFrom: '',
      availableTo: ''
    },
    dietary: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isOrganic: false
    },
    tags: '',
    allergens: '',
    preparationTime: '',
    calories: '',
    spiceLevel: 0
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les données de l'item à modifier
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category?._id || '',
        basePrice: item.basePrice || '',
        image: item.image || '',
        featured: item.featured || false,
        availability: {
          isAvailable: item.availability?.isAvailable ?? true,
          availableFrom: item.availability?.availableFrom || '',
          availableTo: item.availability?.availableTo || ''
        },
        dietary: {
          isVegetarian: item.dietary?.isVegetarian || false,
          isVegan: item.dietary?.isVegan || false,
          isGlutenFree: item.dietary?.isGlutenFree || false,
          isOrganic: item.dietary?.isOrganic || false
        },
        tags: item.tags?.join(', ') || '',
        allergens: item.allergens?.join(', ') || '',
        preparationTime: item.preparationTime || '',
        calories: item.calories || '',
        spiceLevel: item.spiceLevel || 0
      });
    } else {
      // Réinitialiser pour nouvel item
      setFormData({
        name: '',
        description: '',
        category: '',
        basePrice: '',
        image: '',
        featured: false,
        availability: { isAvailable: true, availableFrom: '', availableTo: '' },
        dietary: { isVegetarian: false, isVegan: false, isGlutenFree: false, isOrganic: false },
        tags: '',
        allergens: '',
        preparationTime: '',
        calories: '',
        spiceLevel: 0
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Nettoyer l'erreur sur ce champ
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    
    if (!formData.basePrice || formData.basePrice <= 0) {
      newErrors.basePrice = 'Le prix doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Préparer les données
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        allergens: formData.allergens ? formData.allergens.split(',').map(a => a.trim()).filter(Boolean) : [],
        basePrice: parseFloat(formData.basePrice),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        spiceLevel: parseInt(formData.spiceLevel)
      };
      
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Erreur soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ width: '90%', maxWidth: '800px' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">
            {item ? 'Modifier l\'article' : 'Nouvel article du menu'}
          </p>
          <button className="delete" onClick={onClose}></button>
        </header>
        
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="columns">
              {/* Colonne gauche */}
              <div className="column">
                <h4 className="title is-5">Informations de base</h4>
                
                <div className="field">
                  <label className="label">
                    Nom de l'article <span className="has-text-danger">*</span>
                  </label>
                  <div className="control">
                    <input
                      className={`input ${errors.name ? 'is-danger' : ''}`}
                      type="text"
                      placeholder="Ex: Pizza Margherita"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="help is-danger">{errors.name}</p>}
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Description de l'article..."
                      rows="3"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        Catégorie <span className="has-text-danger">*</span>
                      </label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className={errors.category ? 'is-danger' : ''}
                          >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.category && <p className="help is-danger">{errors.category}</p>}
                    </div>
                  </div>
                  
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        Prix de base <span className="has-text-danger">*</span>
                      </label>
                      <div className="control">
                        <input
                          className={`input ${errors.basePrice ? 'is-danger' : ''}`}
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={formData.basePrice}
                          onChange={(e) => handleInputChange('basePrice', e.target.value)}
                        />
                      </div>
                      {errors.basePrice && <p className="help is-danger">{errors.basePrice}</p>}
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">URL de l'image</label>
                  <div className="control">
                    <input
                      className="input"
                      type="url"
                      placeholder="https://exemple.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Colonne droite */}
              <div className="column">
                <h4 className="title is-5">Paramètres avancés</h4>
                
                {/* Disponibilité */}
                <div className="field">
                  <label className="label">Disponibilité</label>
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={formData.availability.isAvailable}
                        onChange={(e) => handleNestedChange('availability', 'isAvailable', e.target.checked)}
                      />
                      <span className="ml-2">Article disponible</span>
                    </label>
                  </div>
                </div>

                {/* Mise en avant */}
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                      />
                      <span className="ml-2">
                        <span className="icon has-text-warning">
                          <StarIcon className="h-4 w-4" />
                        </span>
                        Mettre en vedette
                      </span>
                    </label>
                  </div>
                </div>

                {/* Régime alimentaire */}
                <div className="field">
                  <label className="label">Régime alimentaire</label>
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={formData.dietary.isVegetarian}
                          onChange={(e) => handleNestedChange('dietary', 'isVegetarian', e.target.checked)}
                        />
                        <span className="ml-2">🥬 Végétarien</span>
                      </label>
                    </div>
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={formData.dietary.isVegan}
                          onChange={(e) => handleNestedChange('dietary', 'isVegan', e.target.checked)}
                        />
                        <span className="ml-2">🌱 Vegan</span>
                      </label>
                    </div>
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={formData.dietary.isGlutenFree}
                          onChange={(e) => handleNestedChange('dietary', 'isGlutenFree', e.target.checked)}
                        />
                        <span className="ml-2">🌾 Sans gluten</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Informations nutritionnelles */}
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Temps de préparation (min)</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          min="0"
                          placeholder="15"
                          value={formData.preparationTime}
                          onChange={(e) => handleInputChange('preparationTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Calories</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          min="0"
                          placeholder="350"
                          value={formData.calories}
                          onChange={(e) => handleInputChange('calories', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Niveau d'épices</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={formData.spiceLevel}
                        onChange={(e) => handleInputChange('spiceLevel', e.target.value)}
                      >
                        <option value={0}>🌶️ Aucun</option>
                        <option value={1}>🌶️ Doux</option>
                        <option value={2}>🌶️🌶️ Moyen</option>
                        <option value={3}>🌶️🌶️🌶️ Fort</option>
                        <option value={4}>🌶️🌶️🌶️🌶️ Très fort</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Étiquettes (séparées par des virgules)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="spécialité, populaire, nouveau"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Allergènes (séparés par des virgules)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="gluten, lactose, noix"
                      value={formData.allergens}
                      onChange={(e) => handleInputChange('allergens', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
        
        <footer className="modal-card-foot">
          <button 
            className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {item ? 'Modifier' : 'Créer'}
          </button>
          <button 
            className="button" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </button>
        </footer>
      </div>
    </div>
  );
};

// ========================================
// ⚠️ COMPOSANT CONFIRMATION INTÉGRÉ
// ========================================
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={onCancel}></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          <button 
            className={`button is-danger ${loading ? 'is-loading' : ''}`}
            onClick={onConfirm}
            disabled={loading}
          >
            Confirmer
          </button>
          <button 
            className="button" 
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
        </footer>
      </div>
    </div>
  );
};

// ========================================
// 🍽️ PAGE PRINCIPALE MENU
// ========================================
const MenuPage = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const menuItems = useSelector(selectMenuItems) || [];
  const categories = useSelector(selectMenuCategories) || [];
  const loading = useSelector(selectMenuLoading) || false;
  const pagination = useSelector(selectMenuPagination) || {};
  const currentUser = useSelector(selectCurrentUser);
  
  // États locaux
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    featured: '',
    priceRange: { min: '', max: '' }
  });
  
  // Hooks personnalisés
  useDocumentTitle('Gestion du Menu - Zengest Admin');
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Chargement initial des données
  useEffect(() => {
    dispatch(fetchMenuItems({ 
      page: 1, 
      limit: 20,
      ...filters 
    }));
    dispatch(fetchMenuCategories());
  }, [dispatch, filters]);
  
  // ========================================
  // 📊 CONFIGURATION DES COLONNES - SÉCURISÉE
  // ========================================
  
  const columns = [
    {
      key: 'image',
      title: 'Photo',
      type: 'custom',
      width: '80px',
      render: (item) => (
        <div className="menu-item-image">
          {item?.image ? (
            <img 
              src={item.image} 
              alt={item.name || 'Menu item'}
              className="image is-48x48 is-rounded"
            />
          ) : (
            <div className="image is-48x48 is-rounded has-background-grey-lighter">
              <span className="icon is-large">🍽️</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      title: 'Nom',
      type: 'custom',
      sortable: true,
      render: (item) => (
        <div>
          <p className="has-text-weight-semibold">{item?.name || 'Sans nom'}</p>
          <p className="is-size-7 has-text-grey">
            {item?.category?.name || 'Non classé'}
          </p>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      type: 'custom',
      render: (item) => (
        <p className="menu-item-description">
          {item?.description ? (
            <>
              {item.description.substring(0, 100)}
              {item.description.length > 100 && '...'}
            </>
          ) : (
            <span className="has-text-grey-light">Aucune description</span>
          )}
        </p>
      )
    },
    {
      key: 'basePrice',
      title: 'Prix',
      type: 'custom',
      sortable: true,
      render: (item) => (
        <div>
          <p className="has-text-weight-semibold">
            {formatCurrency(item?.basePrice || 0)}
          </p>
          {item?.priceVariants?.length > 0 && (
            <p className="is-size-7 has-text-grey">
              + {item.priceVariants.length} variante(s)
            </p>
          )}
        </div>
      )
    },
    {
      key: 'availability',
      title: 'Disponibilité',
      type: 'custom',
      render: (item) => {
        // Gestion sécurisée de l'availability
        let isAvailable = true;
        
        if (item?.availability !== undefined) {
          if (typeof item.availability === 'boolean') {
            isAvailable = item.availability;
          } else if (typeof item.availability === 'object' && item.availability !== null) {
            isAvailable = item.availability.isAvailable !== false;
          }
        }
        
        return (
          <span className={`tag ${isAvailable ? 'is-success' : 'is-danger'}`}>
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </span>
        );
      }
    },
    {
      key: 'featured',
      title: 'Mise en avant',
      type: 'custom',
      render: (item) => (
        item?.featured ? (
          <span className="icon has-text-warning">
            <StarIcon className="h-5 w-5" />
          </span>
        ) : null
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      type: 'custom',
      width: '120px',
      render: (item) => (
        <div className="buttons is-small">
          <button 
            className="button is-small is-outlined"
            onClick={() => handleViewItem(item)}
            title="Voir les détails"
          >
            <span className="icon">
              <EyeIcon className="h-4 w-4" />
            </span>
          </button>
          
          {currentUser && hasPermission && hasPermission(currentUser, 'update_menu_item') && (
            <button 
              className="button is-small is-info is-outlined"
              onClick={() => handleEditItem(item)}
              title="Modifier"
            >
              <span className="icon">
                <PencilIcon className="h-4 w-4" />
              </span>
            </button>
          )}
          
          {currentUser && hasPermission && hasPermission(currentUser, 'delete_menu_item') && (
            <button 
              className="button is-small is-danger is-outlined"
              onClick={() => handleDeleteItem(item)}
              title="Supprimer"
            >
              <span className="icon">
                <TrashIcon className="h-4 w-4" />
              </span>
            </button>
          )}
        </div>
      )
    }
  ];
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleAddItem = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };
  
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };
  
  const handleViewItem = (item) => {
    console.log('👁️ Voir item:', item);
    // TODO: Implémenter vue détaillée
  };
  
  const handleDeleteItem = (item) => {
    setItemToDelete(item);
  };
  
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await dispatch(deleteMenuItem(itemToDelete._id)).unwrap();
      setItemToDelete(null);
      // Recharger la liste
      dispatch(fetchMenuItems({ page: 1, limit: 20, ...filters }));
    } catch (error) {
      console.error('❌ Erreur suppression:', error);
    }
  };
  
  const handleItemSubmit = async (itemData) => {
    try {
      if (selectedItem) {
        await dispatch(updateMenuItem({ 
          id: selectedItem._id, 
          data: itemData 
        })).unwrap();
      } else {
        await dispatch(createMenuItem(itemData)).unwrap();
      }
      
      setIsFormOpen(false);
      setSelectedItem(null);
      
      // Recharger la liste
      dispatch(fetchMenuItems({ page: 1, limit: 20, ...filters }));
    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error);
    }
  };
  
  const handlePageChange = (page) => {
    dispatch(fetchMenuItems({ 
      page, 
      limit: pagination?.limit || 20, 
      ...filters 
    }));
  };
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (loading && menuItems.length === 0) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="menu-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">Gestion du Menu</h1>
                <p className="subtitle is-6">
                  Gérez les articles, catégories et prix de votre menu
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {currentUser && hasPermission && hasPermission(currentUser, 'create_menu_item') && (
                <button 
                  className="button is-primary"
                  onClick={handleAddItem}
                >
                  <span className="icon">
                    <PlusIcon className="h-5 w-5" />
                  </span>
                  <span>Nouvel Article</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Filtres et recherche */}
        <MenuFilters
          filters={filters}
          categories={categories}
          onFiltersChange={handleFiltersChange}
        />
        
        {/* Statistiques rapides */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Articles</p>
              <p className="title is-5">{pagination?.total || menuItems.length}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Disponibles</p>
              <p className="title is-5 has-text-success">
                {menuItems.filter(item => {
                  if (typeof item.availability === 'boolean') return item.availability;
                  if (typeof item.availability === 'object' && item.availability !== null) {
                    return item.availability.isAvailable !== false;
                  }
                  return true;
                }).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">En vedette</p>
              <p className="title is-5 has-text-warning">
                {menuItems.filter(item => item?.featured).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Catégories</p>
              <p className="title is-5 has-text-info">
                {categories.length}
              </p>
            </div>
          </div>
        </div>
        
        {/* Table des articles */}
        <div className="box">
          <Table
            columns={columns}
            data={menuItems}
            loading={loading}
            sortable
            hoverable
            striped
            className="menu-items-table"
            emptyMessage="Aucun article trouvé"
          />
        </div>
        
        {/* Modals */}
        <MenuItemForm
          item={selectedItem}
          categories={categories}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedItem(null);
          }}
          onSubmit={handleItemSubmit}
        />
        
        <ConfirmModal
          isOpen={!!itemToDelete}
          title="Supprimer l'article"
          message={`Êtes-vous sûr de vouloir supprimer l'article "${itemToDelete?.name}" ? Cette action est irréversible.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setItemToDelete(null)}
        />
        
        {/* Section de debug */}
        <div className="notification is-light mt-5">
          <h4 className="title is-6">🚧 État de développement</h4>
          <div className="content">
            <p><strong>Statut actuel:</strong></p>
            <ul>
              <li>✅ Interface et table fonctionnelles</li>
              <li>✅ Formulaire complet intégré</li>
              <li>✅ Filtres avancés intégrés</li>
              <li>✅ Modal de confirmation intégrée</li>
              <li>✅ Actions Redux intégrées</li>
              <li>✅ Gestion sécurisée des données</li>
            </ul>
            <p><strong>Items chargés:</strong> {menuItems.length}</p>
            <p><strong>Catégories:</strong> {categories.length}</p>
            <p><strong>Utilisateur:</strong> {currentUser?.email || 'Non connecté'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;