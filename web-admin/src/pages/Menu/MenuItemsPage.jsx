import React, { useState, useEffect } from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

const MenuItemsPage = () => {
  useDocumentTitle('Articles du Menu - Zengest Admin');
  
  return (
    <div className="menu-items-page">
      <div className="container is-fluid">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li className="is-active"><a href="#" aria-current="page">Articles</a></li>
          </ul>
        </nav>
        
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">Articles du Menu</h1>
                <p className="subtitle is-6">Gestion détaillée des articles</p>
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
              <button className="button is-primary">
                <span className="icon">
                  <PlusIcon className="h-5 w-5" />
                </span>
                <span>Nouvel Article</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="notification is-info is-light">
          <p><strong>Page dédiée aux articles :</strong> Interface détaillée pour la gestion des articles du menu avec fonctionnalités avancées.</p>
          <p>Cette page utilisera le même composant MenuPage mais avec des options étendues.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;