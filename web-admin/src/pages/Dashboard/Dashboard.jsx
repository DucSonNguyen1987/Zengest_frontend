// web-admin/src/pages/Dashboard/Dashboard.jsx - VERSION AVEC ALIAS CORRIGÉS
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
import { Input, Button, LoadingSpinner } from '@/components/common';
import ReservationDetailsModal from '@/components/reservations/ReservationDetailsModal/ReservationDetailsModal';
import MenuCategoryFormModal from '@/components/menu/MenuCategoryFormModal/MenuCategoryFormModal';
import ReservationFormModal from '@/components/reservations/ReservationForm/ReservationFormModal';

// === HOOKS ===
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { useReservationHandlers } from '@/hooks/reservations/useReservationHandlers';

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
        <div className="dashboard-header">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div>
                  <h1 className="title is-3">
                    <HomeIcon className="h-8 w-8 mr-3" />
                    Dashboard Zengest
                  </h1>
                  <p className="subtitle is-5">
                    Tableau de bord - {formatDate(new Date())}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="level-right">
              <div className="level-item">
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  leftIcon={HomeIcon}
                  size="medium"
                  className="dashboard-search"
                />
              </div>
              
              <div className="level-item">
                <Button
                  variant="primary"
                  leftIcon={BellIcon}
                  onClick={() => toast.info('Centre de notifications')}
                >
                  Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="dashboard-stats">
          <div className="columns is-mobile">
            <div className="column">
              <div className="box stats-card">
                <div className="stats-content">
                  <div className="stats-icon has-text-primary">
                    <CalendarDaysIcon className="h-8 w-8" />
                  </div>
                  <div className="stats-info">
                    <p className="heading">Réservations</p>
                    <p className="title is-4">{stats.totalReservations}</p>
                    <p className="stats-detail">
                      <span className="has-text-warning">
                        {stats.pendingReservations} en attente
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box stats-card">
                <div className="stats-content">
                  <div className="stats-icon has-text-success">
                    <CurrencyEuroIcon className="h-8 w-8" />
                  </div>
                  <div className="stats-info">
                    <p className="heading">Chiffre d'affaires</p>
                    <p className="title is-4">{formatCurrency(stats.totalRevenue)}</p>
                    <p className="stats-detail">
                      Panier moyen: {formatCurrency(stats.avgOrderValue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box stats-card">
                <div className="stats-content">
                  <div className="stats-icon has-text-info">
                    <ShoppingBagIcon className="h-8 w-8" />
                  </div>
                  <div className="stats-info">
                    <p className="heading">Commandes actives</p>
                    <p className="title is-4">{stats.activeOrders}</p>
                    <p className="stats-detail">En cours de traitement</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="box stats-card">
                <div className="stats-content">
                  <div className="stats-icon has-text-warning">
                    <TableCellsIcon className="h-8 w-8" />
                  </div>
                  <div className="stats-info">
                    <p className="heading">Tables</p>
                    <p className="title is-4">{stats.availableTables}/{stats.totalTables}</p>
                    <p className="stats-detail">Disponibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section de test des composants */}
        <div className="component-testing-section">
          <div className="box">
            <h2 className="title is-4">
              <Cog6ToothIcon className="h-6 w-6 mr-2" />
              Test des Composants Phase 1
            </h2>
            
            <div className="columns">
              <div className="column">
                <h3 className="title is-5">Modals de test</h3>
                <div className="buttons">
                  <Button
                    variant="primary"
                    leftIcon={EyeIcon}
                    onClick={() => handleTestReservationModal(recentReservations[0])}
                  >
                    Tester Modal Réservation
                  </Button>
                  
                  <Button
                    variant="success"
                    leftIcon={PlusIcon}
                    onClick={handleTestCategoryModal}
                  >
                    Tester Modal Catégorie
                  </Button>
                </div>
              </div>
              
              <div className="column">
                <h3 className="title is-5">Actions rapides</h3>
                <div className="buttons">
                  <Button
                    variant="info"
                    leftIcon={ChartBarIcon}
                    onClick={() => handleQuickAction('refresh')}
                    loading={loading}
                  >
                    Actualiser
                  </Button>
                  
                  <Button
                    variant="warning"
                    onClick={() => handleQuickAction('backup')}
                    loading={loading}
                  >
                    Sauvegarde
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleQuickAction('reports')}
                    loading={loading}
                  >
                    Rapports
                  </Button>
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
              <header className="box-header">
                <h3 className="title is-5">
                  <CalendarDaysIcon className="h-5 w-5 mr-2" />
                  Réservations récentes
                </h3>
                <Link to="/reservations" className="button is-small is-primary">
                  Voir tout
                </Link>
              </header>
              
              <div className="reservation-list">
                {recentReservations.map((reservation) => (
                  <div key={reservation._id} className="reservation-item">
                    <div className="reservation-info">
                      <div className="customer-name">
                        {reservation.customer.firstName} {reservation.customer.lastName}
                      </div>
                      <div className="reservation-details">
                        <span className="time">
                          {formatTime(reservation.dateTime)}
                        </span>
                        <span className="guests">
                          {formatGuestCount(reservation.guestsCount)}
                        </span>
                        {reservation.table && (
                          <span className="table">
                            Table {reservation.table.number}
                          </span>
                        )}
                      </div>
                      <div className="special-requests">
                        {truncateText(reservation.specialRequests, 40)}
                      </div>
                    </div>
                    
                    <div className="reservation-actions">
                      <span className={`tag is-${getStatusColor(reservation.status)}`}>
                        {formatStatus(reservation.status)}
                      </span>
                      
                      <Button
                        size="small"
                        variant="outline"
                        leftIcon={EyeIcon}
                        onClick={() => handleTestReservationModal(reservation)}
                      >
                        Voir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commandes en cours */}
          <div className="column is-half">
            <div className="box">
              <header className="box-header">
                <h3 className="title is-5">
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Commandes en cours
                </h3>
                <Link to="/orders" className="button is-small is-primary">
                  Voir tout
                </Link>
              </header>
              
              <div className="orders-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <div className="order-header">
                        <span className="order-id">{order.id}</span>
                        <span className="order-table">Table {order.table}</span>
                      </div>
                      
                      <div className="order-items">
                        {order.items.slice(0, 2).map((item, index) => (
                          <span key={index} className="item-name">
                            {item}
                            {index < Math.min(order.items.length, 2) - 1 && ', '}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="items-more">
                            +{order.items.length - 2} autre{order.items.length > 3 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      
                      <div className="order-meta">
                        <span className="order-total">
                          {formatCurrency(order.total)}
                        </span>
                        <span className="order-time">
                          {formatTimeAgo(order.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-status">
                      <span className={`tag is-${getStatusColor(order.status, 'order')}`}>
                        {formatStatus(order.status, 'order')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="quick-actions">
          <div className="box">
            <h3 className="title is-5">Actions rapides</h3>
            
            <div className="columns">
              <div className="column">
                <Link to="/reservations" className="quick-action-card">
                  <div className="action-icon has-text-primary">
                    <CalendarDaysIcon className="h-12 w-12" />
                  </div>
                  <div className="action-content">
                    <h4>Nouvelle réservation</h4>
                    <p>Créer une réservation</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/menu/categories" className="quick-action-card">
                  <div className="action-icon has-text-success">
                    <PlusIcon className="h-12 w-12" />
                  </div>
                  <div className="action-content">
                    <h4>Ajouter un plat</h4>
                    <p>Gérer le menu</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/tables" className="quick-action-card">
                  <div className="action-icon has-text-info">
                    <TableCellsIcon className="h-12 w-12" />
                  </div>
                  <div className="action-content">
                    <h4>Plan de salle</h4>
                    <p>Gérer les tables</p>
                  </div>
                </Link>
              </div>
              
              <div className="column">
                <Link to="/analytics" className="quick-action-card">
                  <div className="action-icon has-text-warning">
                    <ChartBarIcon className="h-12 w-12" />
                  </div>
                  <div className="action-content">
                    <h4>Analytics</h4>
                    <p>Voir les rapports</p>
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
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Phase 1 - Tests fonctionnels
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
              
              <div className="test-status">
                <span className="tag is-success is-large">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Phase 1 - Alias configurés
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