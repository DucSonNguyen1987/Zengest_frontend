import React, { useState } from 'react';
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  FireIcon,
  ClockIcon,
  CheckBadgeIcon,
  XMarkIcon,
  CalendarDaysIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const DailySpecialsPage = () => {
  useDocumentTitle('Plats du Jour - Zengest Admin');
  
  // État local pour les plats du jour (simulation)
  const [dailySpecials, setDailySpecials] = useState([
    {
      _id: '1',
      name: 'Saumon grillé au beurre d\'agrumes',
      description: 'Filet de saumon norvégien grillé, beurre blanc aux agrumes, légumes de saison',
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300',
      status: 'active',
      date: new Date().toISOString().split('T')[0],
      availableQuantity: 15,
      soldQuantity: 3,
      createdBy: { firstName: 'Chef', lastName: 'Martin' },
      createdAt: new Date('2025-06-17T08:00:00'),
      approvedAt: new Date('2025-06-17T08:30:00'),
      approvedBy: { firstName: 'Marie', lastName: 'Dubois' }
    },
    {
      _id: '2',
      name: 'Risotto aux cèpes et truffe',
      description: 'Riz arborio, cèpes fraîche, copeaux de truffe noire, parmesan 24 mois',
      price: 28.00,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300',
      status: 'pending',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Demain
      availableQuantity: 12,
      soldQuantity: 0,
      createdBy: { firstName: 'Chef', lastName: 'Martin' },
      createdAt: new Date('2025-06-17T14:00:00'),
      approvedAt: null,
      approvedBy: null
    },
    {
      _id: '3',
      name: 'Tarte fine aux pommes caramélisées',
      description: 'Pâte brisée maison, pommes reinettes, caramel au beurre salé, glace vanille',
      price: 9.50,
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300',
      status: 'sold_out',
      date: new Date().toISOString().split('T')[0],
      availableQuantity: 8,
      soldQuantity: 8,
      createdBy: { firstName: 'Chef', lastName: 'Martin' },
      createdAt: new Date('2025-06-17T06:00:00'),
      approvedAt: new Date('2025-06-17T07:00:00'),
      approvedBy: { firstName: 'Marie', lastName: 'Dubois' }
    }
  ]);
  
  const handleAddSpecial = () => {
    console.log('Ajouter nouveau plat du jour');
    // TODO: Ouvrir modal de création
  };
  
  const handleViewSpecial = (special) => {
    console.log('Voir plat du jour:', special);
    // TODO: Ouvrir modal de détails
  };
  
  const handleApproveSpecial = (special) => {
    setDailySpecials(prev => prev.map(s => 
      s._id === special._id 
        ? { 
            ...s, 
            status: 'active', 
            approvedAt: new Date(),
            approvedBy: { firstName: 'Vous', lastName: '' }
          }
        : s
    ));
  };
  
  const handleRejectSpecial = (special) => {
    if (window.confirm(`Rejeter le plat "${special.name}" ?`)) {
      setDailySpecials(prev => prev.filter(s => s._id !== special._id));
    }
  };
  
  const getStatusBadge = (status, soldQuantity, availableQuantity) => {
    if (soldQuantity >= availableQuantity) {
      return <span className="tag is-dark">Épuisé</span>;
    }
    
    switch (status) {
      case 'active':
        return <span className="tag is-success">Actif</span>;
      case 'pending':
        return <span className="tag is-warning">En attente</span>;
      case 'sold_out':
        return <span className="tag is-dark">Épuisé</span>;
      default:
        return <span className="tag is-light">Inconnu</span>;
    }
  };
  
  const getStats = () => {
    return {
      total: dailySpecials.length,
      active: dailySpecials.filter(s => s.status === 'active').length,
      pending: dailySpecials.filter(s => s.status === 'pending').length,
      soldOut: dailySpecials.filter(s => s.status === 'sold_out' || s.soldQuantity >= s.availableQuantity).length
    };
  };
  
  const stats = getStats();
  
  return (
    <div className="daily-specials-page">
      <div className="container is-fluid">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li className="is-active"><a href="#" aria-current="page">Plats du jour</a></li>
          </ul>
        </nav>
        
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">
                  <FireIcon className="h-6 w-6 has-text-danger mr-2" style={{ display: 'inline' }} />
                  Plats du Jour
                </h1>
                <p className="subtitle is-6">Gestion des spécialités quotidiennes</p>
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
              <button className="button is-primary" onClick={handleAddSpecial}>
                <span className="icon">
                  <PlusIcon className="h-5 w-5" />
                </span>
                <span>Nouveau Plat du Jour</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total</p>
              <p className="title is-5">{stats.total}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Actifs</p>
              <p className="title is-5 has-text-success">{stats.active}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">En attente</p>
              <p className="title is-5 has-text-warning">{stats.pending}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Épuisés</p>
              <p className="title is-5 has-text-dark">{stats.soldOut}</p>
            </div>
          </div>
        </div>
        
        {/* Filtres rapides */}
        <div className="tabs is-boxed">
          <ul>
            <li className="is-active">
              <a>
                <span>Aujourd'hui</span>
              </a>
            </li>
            <li>
              <a>
                <span>Cette semaine</span>
              </a>
            </li>
            <li>
              <a>
                <span>En attente d'approbation</span>
                {stats.pending > 0 && (
                  <span className="tag is-warning is-small ml-2">{stats.pending}</span>
                )}
              </a>
            </li>
          </ul>
        </div>
        
        {/* Liste des plats du jour */}
        <div className="columns is-multiline">
          {dailySpecials.map(special => (
            <div key={special._id} className="column is-4">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img 
                      src={special.image} 
                      alt={special.name}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                  <div className="card-image-overlay">
                    {getStatusBadge(special.status, special.soldQuantity, special.availableQuantity)}
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-6">{special.name}</p>
                      <p className="subtitle is-7 has-text-grey">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" style={{ display: 'inline' }} />
                        {new Date(special.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="media-right">
                      <p className="title is-5 has-text-primary">{special.price}€</p>
                    </div>
                  </div>
                  
                  <div className="content">
                    <p className="is-size-7">{special.description}</p>
                    
                    <div className="level is-mobile mt-3">
                      <div className="level-left">
                        <div className="level-item">
                          <span className="tag is-light is-small">
                            {special.soldQuantity}/{special.availableQuantity} vendus
                          </span>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <span className="is-size-7 has-text-grey">
                            Par {special.createdBy.firstName} {special.createdBy.lastName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <footer className="card-footer">
                  <button 
                    className="card-footer-item button is-ghost"
                    onClick={() => handleViewSpecial(special)}
                  >
                    <span className="icon">
                      <EyeIcon className="h-4 w-4" />
                    </span>
                    <span>Voir</span>
                  </button>
                  
                  {special.status === 'pending' && (
                    <>
                      <button 
                        className="card-footer-item button is-ghost has-text-success"
                        onClick={() => handleApproveSpecial(special)}
                      >
                        <span className="icon">
                          <CheckBadgeIcon className="h-4 w-4" />
                        </span>
                        <span>Approuver</span>
                      </button>
                      
                      <button 
                        className="card-footer-item button is-ghost has-text-danger"
                        onClick={() => handleRejectSpecial(special)}
                      >
                        <span className="icon">
                          <XMarkIcon className="h-4 w-4" />
                        </span>
                        <span>Rejeter</span>
                      </button>
                    </>
                  )}
                </footer>
              </div>
            </div>
          ))}
        </div>
        
        <div className="notification is-info is-light">
          <p><strong>🍽️ Fonctionnement :</strong> Les plats du jour sont créés par l'équipe cuisine et doivent être approuvés avant d'apparaître sur le site vitrine. Ils sont automatiquement archivés après leur date de service.</p>
        </div>
      </div>
    </div>
  );
};

export { DailySpecialsPage };