import React, { useState } from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  Bars3BottomLeftIcon,
  EyeIcon,
  EyeSlashIcon 
} from '@heroicons/react/24/outline';

const MenuCategoriesPage = () => {
  useDocumentTitle('Catégories du Menu - Zengest Admin');
  
  // État local pour les catégories (simulation)
  const [categories, setCategories] = useState([
    {
      _id: '1',
      name: 'Entrées',
      description: 'Mises en bouche et entrées fraîches',
      position: 1,
      isActive: true,
      itemsCount: 8,
      color: '#00d2d3'
    },
    {
      _id: '2',
      name: 'Plats principaux',
      description: 'Nos spécialités et plats signature',
      position: 2,
      isActive: true,
      itemsCount: 15,
      color: '#eb2f06'
    },
    {
      _id: '3',
      name: 'Desserts',
      description: 'Douceurs et créations sucrées',
      position: 3,
      isActive: true,
      itemsCount: 6,
      color: '#ffc048'
    },
    {
      _id: '4',
      name: 'Boissons',
      description: 'Carte des vins et boissons',
      position: 4,
      isActive: false,
      itemsCount: 12,
      color: '#8c7ae6'
    }
  ]);
  
  const handleAddCategory = () => {
    console.log('Ajouter nouvelle catégorie');
    // TODO: Ouvrir modal de création
  };
  
  const handleEditCategory = (category) => {
    console.log('Modifier catégorie:', category);
    // TODO: Ouvrir modal d'édition
  };
  
  const handleDeleteCategory = (category) => {
    if (category.itemsCount > 0) {
      alert(`Impossible de supprimer "${category.name}" : ${category.itemsCount} articles associés`);
      return;
    }
    
    if (window.confirm(`Supprimer la catégorie "${category.name}" ?`)) {
      setCategories(prev => prev.filter(c => c._id !== category._id));
    }
  };
  
  const handleToggleStatus = (category) => {
    setCategories(prev => prev.map(c => 
      c._id === category._id 
        ? { ...c, isActive: !c.isActive }
        : c
    ));
  };
  
  return (
    <div className="menu-categories-page">
      <div className="container is-fluid">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li className="is-active"><a href="#" aria-current="page">Catégories</a></li>
          </ul>
        </nav>
        
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">Catégories du Menu</h1>
                <p className="subtitle is-6">Organisation et gestion des catégories</p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link to="/menu" className="button is-outlined mr-3">
                <span className="icon">
                  <ArrowLeftIcon className="h-5 w-5" />
                </span>
                <span>Retour au Menu</span>
              </Link>
              <button className="button is-primary" onClick={handleAddCategory}>
                <span className="icon">
                  <PlusIcon className="h-5 w-5" />
                </span>
                <span>Nouvelle Catégorie</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Catégories</p>
              <p className="title is-5">{categories.length}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Actives</p>
              <p className="title is-5 has-text-success">
                {categories.filter(c => c.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Inactives</p>
              <p className="title is-5 has-text-danger">
                {categories.filter(c => !c.isActive).length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Articles</p>
              <p className="title is-5 has-text-info">
                {categories.reduce((sum, c) => sum + c.itemsCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Liste des catégories */}
        <div className="columns is-multiline">
          {categories.map((category, index) => (
            <div key={category._id} className="column is-6">
              <div className={`card ${!category.isActive ? 'has-background-light' : ''}`}>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <div 
                        className="category-color"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: category.color,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        {category.position}
                      </div>
                    </div>
                    <div className="media-content">
                      <p className="title is-5">
                        {category.name}
                        {!category.isActive && (
                          <span className="tag is-danger is-small ml-2">Inactive</span>
                        )}
                      </p>
                      <p className="subtitle is-6">{category.description}</p>
                    </div>
                    <div className="media-right">
                      <span className="tag is-light">
                        {category.itemsCount} article{category.itemsCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                
                <footer className="card-footer">
                  <button 
                    className="card-footer-item button is-ghost"
                    onClick={() => handleToggleStatus(category)}
                  >
                    <span className="icon">
                      {category.isActive ? (
                        <EyeSlashIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </span>
                    <span>{category.isActive ? 'Désactiver' : 'Activer'}</span>
                  </button>
                  
                  <button 
                    className="card-footer-item button is-ghost"
                    onClick={() => handleEditCategory(category)}
                  >
                    <span className="icon">
                      <PencilIcon className="h-4 w-4" />
                    </span>
                    <span>Modifier</span>
                  </button>
                  
                  <button 
                    className="card-footer-item button is-ghost has-text-danger"
                    onClick={() => handleDeleteCategory(category)}
                    disabled={category.itemsCount > 0}
                  >
                    <span className="icon">
                      <TrashIcon className="h-4 w-4" />
                    </span>
                    <span>Supprimer</span>
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
        
        <div className="notification is-info is-light">
          <p><strong>💡 Astuce :</strong> Vous pouvez réorganiser les catégories en modifiant leur position. Les catégories inactives n'apparaissent pas sur le site vitrine.</p>
        </div>
      </div>
    </div>
  );
};

export { MenuCategoriesPage };
