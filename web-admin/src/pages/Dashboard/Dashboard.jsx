// web-admin/src/pages/Dashboard/Dashboard.jsx - VERSION ADAPTÉE BULMA
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  TableCellsIcon,
  CurrencyEuroIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

// === COMPOSANTS ===
import { Input, Button } from '@/components/common';
import ReservationDetailsModal from '@/components/reservations/ReservationDetailsModal/ReservationDetailsModal';
import MenuCategoryFormModal from '@/components/menu/MenuCategoryFormModal/MenuCategoryFormModal';
import ReservationFormModal from '@/components/reservations/ReservationForm/ReservationFormModal';

// === HOOKS ===
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import useReservationHandlers from '@/hooks/reservations/useReservationHandlers';

// === UTILITAIRES PARTAGÉS ===
import { 
  formatDate, 
  formatTime, 
  formatDateTime,
  formatTimeAgo,
  formatCurrency,
  formatGuestCount,
  getStatusColor,
  formatStatus,
  truncateText 
} from '@shared/utils/formatters';

// === CONSTANTES PARTAGÉES ===
import { 
  RESERVATION_STATUS, 
  ORDER_STATUS 
} from '@shared/constants';

// ========================================
// 🏠 DASHBOARD PRINCIPAL
// ========================================

const Dashboard = () => {
  useDocumentTitle('Dashboard - Zengest Admin');
  
  // ========================================
  // 🔄 ÉTATS LOCAUX
  // ========================================
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hook de gestion des réservations
  const {
    handleViewReservation,
    handleConfirmReservation,
    handleCancelReservation,
    closeDetailsModal,
    isDetailsModalOpen,
    isFormModalOpen,
    closeFormModal,
    selectedReservation,
    handleCreateReservation,
    handleUpdateReservation,
    loading: reservationLoading
  } = useReservationHandlers();

  // ========================================
  // 🎯 DONNÉES DE DÉMONSTRATION
  // ========================================
  
  // Statistiques en temps réel
  const [stats, setStats] = useState({
    totalReservations: 142,
    pendingReservations: 8,
    todayReservations: 23,
    totalRevenue: 15420.50,
    avgOrderValue: 45.80,
    activeOrders: 12,
    availableTables: 15,
    totalTables: 20
  });

  // Réservations récentes pour test
  const recentReservations = [
    {
      _id: '1',
      reservationNumber: 'RES-2025-001',
      customer: {
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@email.com',
        phone: '06 12 34 56 78'
      },
      dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      guestsCount: 4,
      status: RESERVATION_STATUS.CONFIRMED,
      table: { number: 5 },
      specialRequests: 'Table près de la fenêtre',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      confirmedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '2',
      reservationNumber: 'RES-2025-002',
      customer: {
        firstName: 'Jean',
        lastName: 'Martin',
        email: 'jean.martin@email.com',
        phone: '06 98 76 54 32'
      },
      dateTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      guestsCount: 2,
      status: RESERVATION_STATUS.PENDING,
      table: null,
      specialRequests: 'Anniversaire - dessert spécial',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      _id: '3',
      reservationNumber: 'RES-2025-003',
      customer: {
        firstName: 'Sophie',
        lastName: 'Laurent',
        email: 'sophie.laurent@email.com',
        phone: '06 11 22 33 44'
      },
      dateTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      guestsCount: 6,
      status: RESERVATION_STATUS.SEATED,
      table: { number: 12 },
      specialRequests: '',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      confirmedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Commandes récentes
  const recentOrders = [
    {
      id: 'CMD-001',
      table: 7,
      items: ['Pizza Margherita', 'Salade César', 'Tiramisu'],
      total: 42.50,
      status: ORDER_STATUS.READY,
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
      id: 'CMD-002',
      table: 3,
      items: ['Burger du Chef', 'Frites', 'Coca'],
      total: 18.90,
      status: ORDER_STATUS.PREPARING,
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
    },
    {
      id: 'CMD-003',
      table: 15,
      items: ['Plateau de fromages', 'Vin rouge'],
      total: 28.00,
      status: ORDER_STATUS.CONFIRMED,
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    }
  ];

  // Catégorie de test pour le modal
  const testCategory = {
    _id: 'test-1',
    name: 'Spécialités du Chef',
    description: 'Nos créations signature et plats d\'exception',
    slug: 'specialites-chef',
    color: '#eb2f06',
    position: 1,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300'
  };

  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleTestReservationModal = (reservation) => {
    handleViewReservation(reservation);
  };

  const handleTestCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = (categoryData) => {
    console.log('Données catégorie soumises:', categoryData);
    toast.success(`Catégorie "${categoryData.name}" ${testCategory ? 'mise à jour' : 'créée'} !`);
    setIsCategoryModalOpen(false);
  };

  const handleQuickAction = (action) => {
    setLoading(true);
    
    setTimeout(() => {
      switch (action) {
        case 'refresh':
          toast.info('Données actualisées');
          setStats(prev => ({
            ...prev,
            totalReservations: prev.totalReservations + Math.floor(Math.random() * 3)
          }));
          break;
        case 'backup':
          toast.success('Sauvegarde effectuée');
          break;
        case 'reports':
          toast.info('Génération du rapport en cours...');
          break;
        default:
          toast.info(`Action "${action}" exécutée`);
      }
      setLoading(false);
    }, 1500);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // ========================================
  // 🔄 SIMULATION DONNÉES EN TEMPS RÉEL
  // ========================================
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + (Math.random() * 50),
        activeOrders: Math.max(5, prev.activeOrders + Math.floor(Math.random() * 3) - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ========================================
  // 🎨 RENDU DU COMPOSANT
  // ========================================

  return (
    <div className="dashboard-page">
      <div className="container is-fluid">
        
        {/* En-tête avec recherche */}
        <div className="dashboard-header mb-5">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div>
                  <h1 className="title is-3">
                    <span className="icon-text">
                      <span className="icon">
                        <HomeIcon className="icon is-small" />
                      </span>
                      <span>Dashboard Zengest</span>
                    </span>
                  </h1>
                  <p className="subtitle is-5">
                    Tableau de bord - {formatDate(new Date())}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="level-right">
              <div className="level-item">
                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <span className="icon is-small is-left">
                      <HomeIcon />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="level-item">
                <button
                  className="button is-primary"
                  onClick={() => toast.info('Centre de notifications')}
                >
                  <span className="icon">
                    <BellIcon />
                  </span>
                  <span>Notifications</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="dashboard-stats mb-5">
          <div className="columns">
            <div className="column">
              <div className="box has-background-white">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <p className="heading">Réservations</p>
                        <p className="title is-4">{stats.totalReservations}</p>
                        <p className="help has-text-warning">
                          {stats.pendingReservations} en attente
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <span className="icon has-text-primary is-large">
                        <CalendarDaysIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box has-background-white">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <p className="heading">Chiffre d'affaires</p>
                        <p className="title is-4">{formatCurrency(stats.totalRevenue)}</p>
                        <p className="help">
                          Panier moyen: {formatCurrency(stats.avgOrderValue)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <span className="icon has-text-success is-large">
                        <CurrencyEuroIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box has-background-white">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <p className="heading">Commandes actives</p>
                        <p className="title is-4">{stats.activeOrders}</p>
                        <p className="help">En cours de traitement</p>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <span className="icon has-text-info is-large">
                        <ShoppingBagIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box has-background-white">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <p className="heading">Tables</p>
                        <p className="title is-4">{stats.availableTables}/{stats.totalTables}</p>
                        <p className="help">Disponibles</p>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <span className="icon has-text-warning is-large">
                        <TableCellsIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section de test des composants */}
        <div className="component-testing-section mb-5">
          <div className="box">
            <h2 className="title is-4">
              <span className="icon-text">
                <span className="icon">
                  <Cog6ToothIcon />
                </span>
                <span>Test des Composants Phase 1</span>
              </span>
            </h2>
            
            <div className="columns">
              <div className="column">
                <h3 className="title is-5">Modals de test</h3>
                <div className="buttons">
                  <button
                    className="button is-primary"
                    onClick={() => handleTestReservationModal(recentReservations[0])}
                  >
                    <span className="icon">
                      <EyeIcon />
                    </span>
                    <span>Tester Modal Réservation</span>
                  </button>
                  
                  <button
                    className="button is-success"
                    onClick={handleTestCategoryModal}
                  >
                    <span className="icon">
                      <PlusIcon />
                    </span>
                    <span>Tester Modal Catégorie</span>
                  </button>
                </div>
              </div>
              
              <div className="column">
                <h3 className="title is-5">Actions rapides</h3>
                <div className="buttons">
                  <button
                    className={`button is-info ${loading ? 'is-loading' : ''}`}
                    onClick={() => handleQuickAction('refresh')}
                    disabled={loading}
                  >
                    <span className="icon">
                      <ChartBarIcon />
                    </span>
                    <span>Actualiser</span>
                  </button>
                  
                  <button
                    className={`button is-warning ${loading ? 'is-loading' : ''}`}
                    onClick={() => handleQuickAction('backup')}
                    disabled={loading}
                  >
                    <span>Sauvegarde</span>
                  </button>
                  
                  <button
                    className={`button is-outlined ${loading ? 'is-loading' : ''}`}
                    onClick={() => handleQuickAction('reports')}
                    disabled={loading}
                  >
                    <span>Rapports</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableaux de données avec formatage */}
        <div className="columns">
          
          {/* Réservations récentes */}
          <div className="column is-half">
            <div className="box">
              <header className="box-header level">
                <div className="level-left">
                  <h3 className="title is-5">
                    <span className="icon-text">
                      <span className="icon">
                        <CalendarDaysIcon />
                      </span>
                      <span>Réservations récentes</span>
                    </span>
                  </h3>
                </div>
                <div className="level-right">
                  <Link to="/reservations" className="button is-small is-primary">
                    Voir tout
                  </Link>
                </div>
              </header>
              
              <div className="reservation-list">
                {recentReservations.map((reservation) => (
                  <div key={reservation._id} className="box is-shadowless has-background-light mb-3">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <div>
                            <p className="has-text-weight-semibold">
                              {reservation.customer.firstName} {reservation.customer.lastName}
                            </p>
                            <div className="is-size-7 has-text-grey">
                              <span className="mr-3">
                                <span className="icon is-small">
                                  <ClockIcon />
                                </span>
                                {formatTime(reservation.dateTime)}
                              </span>
                              <span className="mr-3">
                                <span className="icon is-small">
                                  <UserGroupIcon />
                                </span>
                                {formatGuestCount(reservation.guestsCount)}
                              </span>
                              {reservation.table && (
                                <span>
                                  <span className="icon is-small">
                                    <TableCellsIcon />
                                  </span>
                                  Table {reservation.table.number}
                                </span>
                              )}
                            </div>
                            {reservation.specialRequests && (
                              <p className="is-size-7 has-text-grey-dark mt-1">
                                {truncateText(reservation.specialRequests, 40)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="level-right">
                        <div className="level-item">
                          <div className="field is-grouped">
                            <div className="control">
                              <span className={`tag is-${getStatusColor(reservation.status)}`}>
                                {formatStatus(reservation.status)}
                              </span>
                            </div>
                            <div className="control">
                              <button
                                className="button is-small is-outlined"
                                onClick={() => handleTestReservationModal(reservation)}
                              >
                                <span className="icon is-small">
                                  <EyeIcon />
                                </span>
                                <span>Voir</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commandes en cours */}
          <div className="column is-half">
            <div className="box">
              <header className="box-header level">
                <div className="level-left">
                  <h3 className="title is-5">
                    <span className="icon-text">
                      <span className="icon">
                        <ShoppingBagIcon />
                      </span>
                      <span>Commandes en cours</span>
                    </span>
                  </h3>
                </div>
                <div className="level-right">
                  <Link to="/orders" className="button is-small is-primary">
                    Voir tout
                  </Link>
                </div>
              </header>
              
              <div className="orders-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="box is-shadowless has-background-light mb-3">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <div>
                            <div className="level is-mobile mb-2">
                              <div className="level-left">
                                <span className="has-text-weight-semibold">{order.id}</span>
                              </div>
                              <div className="level-right">
                                <span className="tag is-light">Table {order.table}</span>
                              </div>
                            </div>
                            
                            <div className="content is-small">
                              {order.items.slice(0, 2).map((item, index) => (
                                <span key={index}>
                                  {item}
                                  {index < Math.min(order.items.length, 2) - 1 && ', '}
                                </span>
                              ))}
                              {order.items.length > 2 && (
                                <span className="has-text-grey">
                                  {' '}+{order.items.length - 2} autre{order.items.length > 3 ? 's' : ''}
                                </span>
                              )}
                            </div>
                            
                            <div className="level is-mobile is-size-7">
                              <div className="level-left">
                                <span className="has-text-weight-semibold">
                                  {formatCurrency(order.total)}
                                </span>
                              </div>
                              <div className="level-right">
                                <span className="has-text-grey">
                                  {formatTimeAgo(order.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="level-right">
                        <div className="level-item">
                          <span className={`tag is-${getStatusColor(order.status, 'order')}`}>
                            {formatStatus(order.status, 'order')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="quick-actions mb-5">
          <div className="box">
            <h3 className="title is-5 mb-4">Actions rapides</h3>
            
            <div className="columns">
              <div className="column">
                <Link to="/reservations" className="box has-background-primary-light has-text-primary">
                  <div className="has-text-centered">
                    <span className="icon is-large">
                      <CalendarDaysIcon />
                    </span>
                    <h4 className="title is-6 has-text-primary">Nouvelle réservation</h4>
                    <p className="is-size-7">Créer une réservation</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/menu/categories" className="box has-background-success-light has-text-success">
                  <div className="has-text-centered">
                    <span className="icon is-large">
                      <PlusIcon />
                    </span>
                    <h4 className="title is-6 has-text-success">Ajouter un plat</h4>
                    <p className="is-size-7">Gérer le menu</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/tables" className="box has-background-info-light has-text-info">
                  <div className="has-text-centered">
                    <span className="icon is-large">
                      <TableCellsIcon />
                    </span>
                    <h4 className="title is-6 has-text-info">Plan de salle</h4>
                    <p className="is-size-7">Gérer les tables</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/analytics" className="box has-background-warning-light has-text-warning-dark">
                  <div className="has-text-centered">
                    <span className="icon is-large">
                      <ChartBarIcon />
                    </span>
                    <h4 className="title is-6 has-text-warning-dark">Analytics</h4>
                    <p className="is-size-7">Voir les rapports</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Debug info */}
        <div className="debug-section">
          <div className="notification is-light">
            <h5 className="title is-6">
              <span className="icon-text">
                <span className="icon has-text-success">
                  <CheckCircleIcon />
                </span>
                <span>Phase 1 - Tests fonctionnels</span>
              </span>
            </h5>
            <div className="content">
              <div className="columns">
                <div className="column">
                  <ul>
                    <li>✅ <strong>Alias Vite:</strong> Configuration optimisée</li>
                    <li>✅ <strong>Shared constants:</strong> Import centralisé</li>
                    <li>✅ <strong>Formatters:</strong> Fonctions partagées</li>
                    <li>✅ <strong>Utils:</strong> Helpers et validation</li>
                  </ul>
                </div>
                <div className="column">
                  <ul>
                    <li>✅ <strong>ReservationDetailsModal:</strong> Modal interactif</li>
                    <li>✅ <strong>MenuCategoryFormModal:</strong> Formulaire complet</li>
                    <li>✅ <strong>Hooks:</strong> useReservationHandlers</li>
                    <li>✅ <strong>Styles:</strong> Design system cohérent</li>
                  </ul>
                </div>
              </div>
              
              <div className="test-status mt-4">
                <span className="tag is-success is-large">
                  <span className="icon">
                    <CheckCircleIcon />
                  </span>
                  <span>Phase 1 - Bulma Classes Adaptées</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals de test */}
      <ReservationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        reservation={selectedReservation}
        onConfirm={handleConfirmReservation}
        onCancel={handleCancelReservation}
        loading={reservationLoading}
      />

      <ReservationFormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        onSubmit={handleCreateReservation}
        loading={reservationLoading}
      />

      <MenuCategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCategorySubmit}
        category={testCategory}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;