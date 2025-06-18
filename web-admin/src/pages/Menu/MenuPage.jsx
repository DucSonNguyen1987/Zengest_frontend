

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  CheckBadgeIcon,
  XMarkIcon
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
import MenuItemForm from '@/components/menu/MenuItemForm/MenuItemForm';
import MenuFilters from '@/components/menu/MenuFilters/MenuFilters';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { usePermissions } from '@/hooks/auth/usePermissions';

// Utilitaires
import { formatCurrency } from '../../../shared/utils/formatters';
import { hasPermission } from '@/utils/permissions';

// Styles
import './MenuPage.scss';

// ========================================
// 🍽️ PAGE GESTION MENU
// ========================================

const MenuPage = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const menuItems = useSelector(selectMenuItems);
  const categories = useSelector(selectMenuCategories);
  const loading = useSelector(selectMenuLoading);
  const pagination = useSelector(selectMenuPagination);
  const currentUser = useSelector(selectCurrentUser);
  
  // États locaux
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    priceRange: { min: '', max: '' }
  });
  
  // Hooks personnalisés
  useDocumentTitle('Gestion du Menu - Zengest Admin');
  const permissions = usePermissions();
  
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
  // 📊 CONFIGURATION DES COLONNES
  // ========================================
  
  const columns = [
    {
      key: 'image',
      title: 'Photo',
      type: 'custom',
      width: '80px',
      render: (item) => (
        <div className="menu-item-image">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
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
      type: 'text',
      sortable: true,
      render: (item) => (
        <div>
          <p className="has-text-weight-semibold">{item.name}</p>
          <p className="is-size-7 has-text-grey">{item.category?.name}</p>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      type: 'text',
      render: (item) => (
        <p className="menu-item-description">
          {item.description?.substring(0, 100)}
          {item.description?.length > 100 && '...'}
        </p>
      )
    },
    {
      key: 'basePrice',
      title: 'Prix',
      type: 'currency',
      sortable: true,
      render: (item) => (
        <div>
          <p className="has-text-weight-semibold">
            {formatCurrency(item.basePrice)}
          </p>
          {item.priceVariants?.length > 0 && (
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
      type: 'badge',
      render: (item) => (
        <span className={`tag ${item.availability?.isAvailable ? 'is-success' : 'is-danger'}`}>
          {item.availability?.isAvailable ? 'Disponible' : 'Indisponible'}
        </span>
      )
    },
    {
      key: 'featured',
      title: 'Mise en avant',
      type: 'custom',
      render: (item) => (
        item.featured && (
          <span className="icon has-text-warning">
            <StarIcon className="h-5 w-5" />
          </span>
        )
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
          
          {hasPermission(currentUser, 'update_menu_item') && (
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
          
          {hasPermission(currentUser, 'delete_menu_item') && (
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
    // TODO: Ouvrir modal de détails ou naviguer vers page détail
    console.log('Voir item:', item);
  };
  
  const handleDeleteItem = (item) => {
    setItemToDelete(item);
  };
  
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteMenuItem(itemToDelete._id)).unwrap();
      setItemToDelete(null);
      // Recharger la liste
      dispatch(fetchMenuItems({ page: 1, limit: 20, ...filters }));
    } catch (error) {
      console.error('Erreur suppression:', error);
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
      console.error('Erreur sauvegarde:', error);
    }
  };
  
  const handlePageChange = (page) => {
    dispatch(fetchMenuItems({ 
      page, 
      limit: pagination.limit, 
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
              {hasPermission(currentUser, 'create_menu_item') && (
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
              <p className="title is-5">{pagination?.total || 0}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Disponibles</p>
              <p className="title is-5 has-text-success">
                {menuItems.filter(item => item.availability?.isAvailable).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">En vedette</p>
              <p className="title is-5 has-text-warning">
                {menuItems.filter(item => item.featured).length}
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
        <Table
          columns={columns}
          data={menuItems}
          loading={loading}
          pagination
          currentPage={pagination?.currentPage || 1}
          pageSize={pagination?.itemsPerPage || 20}
          totalItems={pagination?.totalItems || 0}
          onPageChange={handlePageChange}
          searchable
          sortable
          className="menu-items-table"
          emptyMessage="Aucun article trouvé"
        />
        
        {/* Modal de formulaire */}
        {isFormOpen && (
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
        )}
        
        {/* Modal de confirmation de suppression */}
        {itemToDelete && (
          <ConfirmModal
            isOpen={!!itemToDelete}
            title="Supprimer l'article"
            message={`Êtes-vous sûr de vouloir supprimer l'article "${itemToDelete.name}" ? Cette action est irréversible.`}
            confirmText="Supprimer"
            confirmClass="is-danger"
            onConfirm={handleConfirmDelete}
            onCancel={() => setItemToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;