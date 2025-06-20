// web-admin/src/pages/Menu/MenuCategoriesPage.jsx - VERSION MISE À JOUR
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  Bars3BottomLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  SwatchIcon 
} from '@heroicons/react/24/outline';

// Actions Redux (à créer/importer)
import {
  fetchMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  toggleCategoryStatus
} from '@/store/slices/menuSlice';

// Sélecteurs
import { 
  selectMenuCategories,
  selectMenuLoading 
} from '@/store/slices/menuSlice';

// Composants
import { Button, LoadingSpinner, ConfirmModal } from '@/components/common';
import MenuCategoryFormModal from '@/components/menu/MenuCategoryFormModal/MenuCategoryFormModal';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { usePermissions } from '@/hooks/auth/usePermissions';

// Utilitaires
import { formatStatus, truncateText, sortBy } from '@/utils';

// Styles
import '../../styles/pages/MenuCategoriesPage.scss';

// ========================================
// 🗂️ PAGE GESTION CATÉGORIES MENU
// ========================================

const MenuCategoriesPage = () => {
  const dispatch = useDispatch();
  
  // ========================================
  // 🔄 ÉTATS REDUX
  // ========================================
  
  const categories = useSelector(selectMenuCategories);
  const loading = useSelector(selectMenuLoading);

  // ========================================
  // 🎯 HOOKS PERSONNALISÉS
  // ========================================
  
  useDocumentTitle('Catégories du Menu - Zengest Admin');
  const { checkPermission } = usePermissions();

  // ========================================
  // 🔄 ÉTATS LOCAUX
  // ========================================
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // État local pour les catégories (simulation temporaire)
  const [localCategories, setLocalCategories] = useState([
    {
      _id: '1',
      name: 'Entrées',
      description: 'Mises en bouche et entrées fraîches',
      slug: 'entrees',
      position: 1,
      isActive: true,
      itemsCount: 8,
      color: '#00d2d3',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-06-15').toISOString()
    },
    {
      _id: '2',
      name: 'Plats principaux',
      description: 'Nos spécialités et plats signature',
      slug: 'plats-principaux',
      position: 2,
      isActive: true,
      itemsCount: 15,
      color: '#eb2f06',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-06-10').toISOString()
    },
    {
      _id: '3',
      name: 'Desserts',
      description: 'Douceurs et créations sucrées',
      slug: 'desserts',
      position: 3,
      isActive: true,
      itemsCount: 6,
      color: '#ffc048',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-06-05').toISOString()
    },
    {
      _id: '4',
      name: 'Boissons',
      description: 'Carte des vins et boissons',
      slug: 'boissons',
      position: 4,
      isActive: false,
      itemsCount: 12,
      color: '#8c7ae6',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-05-20').toISOString()
    }
  ]);

  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  useEffect(() => {
    // Charger les catégories depuis l'API
    // dispatch(fetchMenuCategories());
  }, [dispatch]);

  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsFormModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    if (category.itemsCount > 0) {
      toast.error(
        `Impossible de supprimer "${category.name}" : ${category.itemsCount} article(s) associé(s)`,
        { autoClose: 5000 }
      );
      return;
    }
    
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setActionLoading(true);
      
      // Appel API pour supprimer
      // await dispatch(deleteMenuCategory(categoryToDelete._id)).unwrap();
      
      // Simulation temporaire
      setLocalCategories(prev => 
        prev.filter(c => c._id !== categoryToDelete._id)
      );
      
      toast.success(`Catégorie "${categoryToDelete.name}" supprimée avec succès`);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      setActionLoading(true);
      
      // Appel API pour changer le statut
      // await dispatch(toggleCategoryStatus({ 
      //   id: category._id, 
      //   isActive: !category.isActive 
      // })).unwrap();
      
      // Simulation temporaire
      setLocalCategories(prev => prev.map(c => 
        c._id === category._id 
          ? { ...c, isActive: !c.isActive, updatedAt: new Date().toISOString() }
          : c
      ));
      
      const statusText = !category.isActive ? 'activée' : 'désactivée';
      toast.success(`Catégorie "${category.name}" ${statusText}`);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error('Erreur lors du changement de statut');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitCategory = async (categoryData) => {
    try {
      setActionLoading(true);
      
      if (selectedCategory) {
        // Mode édition
        // await dispatch(updateMenuCategory({
        //   id: selectedCategory._id,
        //   data: categoryData
        // })).unwrap();
        
        // Simulation temporaire
        setLocalCategories(prev => prev.map(c => 
          c._id === selectedCategory._id 
            ? { 
                ...c, 
                ...categoryData, 
                updatedAt: new Date().toISOString() 
              }
            : c
        ));
        
        toast.success(`Catégorie "${categoryData.name}" mise à jour`);
      } else {
        // Mode création
        // const result = await dispatch(createMenuCategory(categoryData)).unwrap();
        
        // Simulation temporaire
        const newCategory = {
          _id: Date.now().toString(),
          ...categoryData,
          itemsCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setLocalCategories(prev => [...prev, newCategory]);
        toast.success(`Catégorie "${categoryData.name}" créée`);
      }
      
      setIsFormModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!actionLoading) {
      setIsFormModalOpen(false);
      setSelectedCategory(null);
    }
  };

  // ========================================
  // 🧮 DONNÉES CALCULÉES
  // ========================================
  
  // Trier les catégories par position
  const sortedCategories = sortBy(localCategories, 'position', 'asc');

  // Permissions
  const canCreate = checkPermission('manage_menu') || checkPermission('create_menu_item');
  const canEdit = checkPermission('manage_menu') || checkPermission('update_menu_item');
  const canDelete = checkPermission('manage_menu') || checkPermission('delete_menu_item');

  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="menu-categories-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Link to="/menu" className="button is-ghost">
                <span className="icon">
                  <ArrowLeftIcon className="h-4 w-4" />
                </span>
                <span>Retour au menu</span>
              </Link>
            </div>
            
            <div className="level-item">
              <div>
                <h1 className="title is-4">
                  <Bars3BottomLeftIcon className="h-6 w-6 mr-2" />
                  Catégories du Menu
                </h1>
                <p className="subtitle is-6">
                  Organisez votre menu par catégories
                </p>
              </div>
            </div>
          </div>
          
          <div className="level-right">
            <div className="level-item">
              {canCreate && (
                <Button
                  variant="primary"
                  leftIcon={PlusIcon}
                  onClick={handleAddCategory}
                  disabled={actionLoading}
                >
                  Nouvelle catégorie
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="columns is-mobile">
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Total catégories</p>
              <p className="title is-5">{sortedCategories.length}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Actives</p>
              <p className="title is-5 has-text-success">
                {sortedCategories.filter(c => c.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Inactives</p>
              <p className="title is-5 has-text-danger">
                {sortedCategories.filter(c => !c.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Articles total</p>
              <p className="title is-5 has-text-info">
                {sortedCategories.reduce((sum, c) => sum + c.itemsCount, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Grille des catégories */}
        <div className="categories-grid">
          {sortedCategories.map((category) => (
            <div key={category._id} className="category-card">
              {/* Image */}
              <div className="category-image">
                {category.image ? (
                  <img src={category.image} alt={category.name} />
                ) : (
                  <div 
                    className="category-placeholder"
                    style={{ backgroundColor: category.color }}
                  >
                    <Bars3BottomLeftIcon className="h-8 w-8" />
                  </div>
                )}
                
                {/* Badge de couleur */}
                <div className="category-color-badge">
                  <SwatchIcon 
                    className="h-4 w-4" 
                    style={{ color: category.color }}
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="category-content">
                <div className="category-header">
                  <h3 className="category-name">{category.name}</h3>
                  <span 
                    className={`tag ${category.isActive ? 'is-success' : 'is-danger'}`}
                  >
                    {category.isActive ? (
                      <>
                        <EyeIcon className="h-3 w-3 mr-1" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeSlashIcon className="h-3 w-3 mr-1" />
                        Masquée
                      </>
                    )}
                  </span>
                </div>

                <p className="category-description">
                  {truncateText(category.description, 80)}
                </p>

                <div className="category-meta">
                  <span className="tag is-light">
                    Position {category.position}
                  </span>
                  <span className="tag is-info">
                    {category.itemsCount} article{category.itemsCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="category-actions">
                <div className="buttons are-small">
                  {canEdit && (
                    <Button
                      size="small"
                      variant="outline"
                      leftIcon={PencilIcon}
                      onClick={() => handleEditCategory(category)}
                      disabled={actionLoading}
                      title="Modifier la catégorie"
                    >
                      Modifier
                    </Button>
                  )}
                  
                  {canEdit && (
                    <Button
                      size="small"
                      variant={category.isActive ? 'danger' : 'success'}
                      leftIcon={category.isActive ? EyeSlashIcon : EyeIcon}
                      onClick={() => handleToggleStatus(category)}
                      disabled={actionLoading}
                      title={category.isActive ? 'Masquer' : 'Afficher'}
                    >
                      {category.isActive ? 'Masquer' : 'Afficher'}
                    </Button>
                  )}
                  
                  {canDelete && (
                    <Button
                      size="small"
                      variant="danger"
                      leftIcon={TrashIcon}
                      onClick={() => handleDeleteCategory(category)}
                      disabled={actionLoading || category.itemsCount > 0}
                      title={
                        category.itemsCount > 0 
                          ? 'Impossible de supprimer (articles associés)'
                          : 'Supprimer la catégorie'
                      }
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Carte d'ajout si pas de catégories */}
          {sortedCategories.length === 0 && (
            <div className="category-card category-card--empty">
              <div className="empty-state">
                <Bars3BottomLeftIcon className="h-12 w-12" />
                <h3>Aucune catégorie</h3>
                <p>Commencez par créer votre première catégorie</p>
                {canCreate && (
                  <Button
                    variant="primary"
                    leftIcon={PlusIcon}
                    onClick={handleAddCategory}
                  >
                    Créer une catégorie
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulaire */}
      <MenuCategoryFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCategory}
        category={selectedCategory}
        loading={actionLoading}
      />

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Supprimer la catégorie"
        type="danger"
        confirmText="Supprimer"
        loading={actionLoading}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer la catégorie <strong>"{categoryToDelete?.name}"</strong> ?
        </p>
        <p className="has-text-grey is-size-7 mt-2">
          Cette action est irréversible.
        </p>
      </ConfirmModal>
    </div>
  );
};

export default MenuCategoriesPage;