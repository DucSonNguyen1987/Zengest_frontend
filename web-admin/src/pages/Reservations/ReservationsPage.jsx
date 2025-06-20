// web-admin/src/pages/Reservations/ReservationsPage.jsx - VERSION MISE À JOUR
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  PlusIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TableCellsIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { 
  fetchReservations,
  setReservationsFilters,
  setReservationsPagination 
} from '@/store/slices/reservationsSlice';

// Sélecteurs
import { 
  selectReservations,
  selectReservationsLoading,
  selectReservationsPagination,
  selectReservationsFilters 
} from '@/store/slices/reservationsSlice';

// Composants
import { LoadingSpinner, Table, Button, Input } from '@/components/common';
import ReservationDetailsModal from '@/components/reservations/ReservationDetailsModal/ReservationDetailsModal';
import ReservationFormModal from '@/components/reservations/ReservationFormModal/ReservationFormModal';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import useReservationHandlers from '@/hooks/reservations/useReservationHandlers';

// Utilitaires
import { 
  formatDate, 
  formatTime, 
  formatGuestCount,
  formatStatus,
  getStatusColor,
  filterBySearch 
} from '@/utils';
import { RESERVATION_STATUS } from '@/utils';

// Styles
import '../../styles/pages/ReservationsPage.scss';

// ========================================
// 📋 PAGE GESTION RÉSERVATIONS
// ========================================

const ReservationsPage = () => {
  const dispatch = useDispatch();
  
  // ========================================
  // 🔄 ÉTATS REDUX
  // ========================================
  
  const reservations = useSelector(selectReservations);
  const loading = useSelector(selectReservationsLoading);
  const pagination = useSelector(selectReservationsPagination);
  const filters = useSelector(selectReservationsFilters);

  // ========================================
  // 🎯 HOOKS PERSONNALISÉS
  // ========================================
  
  useDocumentTitle('Gestion des Réservations - Zengest Admin');
  
  const {
    selectedReservation,
    isDetailsModalOpen,
    isEditModalOpen,
    isFormModalOpen,
    loading: handlerLoading,
    
    // Gestionnaires principaux
    handleViewReservation,
    handleEditReservation,
    handleConfirmReservation,
    handleCancelReservation,
    handleAddReservation,
    
    // Gestionnaires de modals
    closeDetailsModal,
    closeEditModal,
    closeFormModal,
    
    // Actions CRUD
    handleCreateReservation,
    handleUpdateReservation,
    handleStatusChange
  } = useReservationHandlers();

  // ========================================
  // 🔄 ÉTATS LOCAUX
  // ========================================
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedReservations, setSelectedReservations] = useState([]);

  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  useEffect(() => {
    dispatch(fetchReservations({ 
      page: pagination.page,
      limit: pagination.limit,
      ...filters 
    }));
  }, [dispatch, pagination, filters]);

  // ========================================
  // 🧮 DONNÉES CALCULÉES
  // ========================================
  
  // Filtrer et rechercher dans les réservations
  const filteredReservations = useMemo(() => {
    let filtered = [...reservations];
    
    // Filtre par recherche textuelle
    if (searchTerm.trim()) {
      filtered = filterBySearch(filtered, searchTerm, [
        'customer.firstName',
        'customer.lastName', 
        'customer.email',
        'customer.phone',
        'reservationNumber'
      ]);
    }
    
    // Filtre par statut
    if (statusFilter) {
      filtered = filtered.filter(res => res.status === statusFilter);
    }
    
    // Filtre par date
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toDateString();
      filtered = filtered.filter(res => 
        new Date(res.dateTime).toDateString() === filterDate
      );
    }
    
    return filtered;
  }, [reservations, searchTerm, statusFilter, dateFilter]);

  // Statistiques rapides
  const stats = useMemo(() => {
    return {
      total: reservations.length,
      pending: reservations.filter(r => r.status === RESERVATION_STATUS.PENDING).length,
      confirmed: reservations.filter(r => r.status === RESERVATION_STATUS.CONFIRMED).length,
      seated: reservations.filter(r => r.status === RESERVATION_STATUS.SEATED).length,
      completed: reservations.filter(r => r.status === RESERVATION_STATUS.COMPLETED).length,
      today: reservations.filter(r => {
        const today = new Date().toDateString();
        return new Date(r.dateTime).toDateString() === today;
      }).length
    };
  }, [reservations]);

  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
  };

  const handlePageChange = (newPage) => {
    dispatch(setReservationsPagination({ 
      ...pagination, 
      page: newPage 
    }));
  };

  // ========================================
  // 📊 CONFIGURATION DU TABLEAU
  // ========================================
  
  const tableColumns = [
    {
      key: 'reservationNumber',
      title: 'N° Réservation',
      sortable: true,
      render: (reservation) => (
        <div>
          <p className="has-text-weight-semibold">#{reservation.reservationNumber}</p>
          <p className="is-size-7 has-text-grey">
            {formatDate(reservation.createdAt)}
          </p>
        </div>
      )
    },
    {
      key: 'customer',
      title: 'Client',
      render: (reservation) => (
        <div>
          <p className="has-text-weight-semibold">
            {reservation.customer.firstName} {reservation.customer.lastName}
          </p>
          <p className="is-size-7 has-text-grey">{reservation.customer.phone}</p>
          {reservation.customer.email && (
            <p className="is-size-7 has-text-grey">{reservation.customer.email}</p>
          )}
        </div>
      )
    },
    {
      key: 'dateTime',
      title: 'Date & Heure',
      sortable: true,
      render: (reservation) => (
        <div>
          <p className="has-text-weight-semibold">
            {formatDate(reservation.dateTime)}
          </p>
          <p className="is-size-6">
            {formatTime(reservation.dateTime)}
          </p>
        </div>
      )
    },
    {
      key: 'guestsCount',
      title: 'Personnes',
      render: (reservation) => (
        <div className="has-text-centered">
          <span className="tag is-light is-medium">
            <span className="icon">
              <UserGroupIcon className="h-4 w-4" />
            </span>
            <span>{formatGuestCount(reservation.guestsCount)}</span>
          </span>
        </div>
      )
    },
    {
      key: 'table',
      title: 'Table',
      render: (reservation) => (
        reservation.table ? (
          <span className="tag is-info">
            Table {reservation.table.number}
          </span>
        ) : (
          <span className="tag is-light">Non assignée</span>
        )
      )
    },
    {
      key: 'status',
      title: 'Statut',
      render: (reservation) => {
        const color = getStatusColor(reservation.status);
        const label = formatStatus(reservation.status);
        
        return (
          <span className={`tag is-${color}`}>
            {label}
          </span>
        );
      }
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (reservation) => (
        <div className="buttons are-small">
          <Button
            size="small"
            variant="outline"
            leftIcon={EyeIcon}
            onClick={() => handleViewReservation(reservation)}
            title="Voir les détails"
          >
            Voir
          </Button>
          
          {reservation.status === RESERVATION_STATUS.PENDING && (
            <>
              <Button
                size="small"
                variant="success"
                leftIcon={CheckCircleIcon}
                onClick={() => handleConfirmReservation(reservation)}
                loading={handlerLoading}
                title="Confirmer la réservation"
              >
                Confirmer
              </Button>
              
              <Button
                size="small"
                variant="outline"
                leftIcon={PencilIcon}
                onClick={() => handleEditReservation(reservation)}
                title="Modifier la réservation"
              >
                Modifier
              </Button>
            </>
          )}
          
          {[RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED].includes(reservation.status) && (
            <Button
              size="small"
              variant="danger"
              leftIcon={XMarkIcon}
              onClick={() => handleCancelReservation(reservation)}
              loading={handlerLoading}
              title="Annuler la réservation"
            >
              Annuler
            </Button>
          )}
        </div>
      )
    }
  ];

  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="reservations-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">
                  <CalendarDaysIcon className="h-6 w-6 mr-2" />
                  Gestion des Réservations
                </h1>
                <p className="subtitle is-6">
                  Gérez les réservations de votre restaurant
                </p>
              </div>
            </div>
          </div>
          
          <div className="level-right">
            <div className="level-item">
              <Button
                variant="primary"
                leftIcon={PlusIcon}
                onClick={handleAddReservation}
              >
                Nouvelle réservation
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="columns is-mobile">
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Total</p>
              <p className="title is-5">{stats.total}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">En attente</p>
              <p className="title is-5 has-text-warning">{stats.pending}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Confirmées</p>
              <p className="title is-5 has-text-success">{stats.confirmed}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Installées</p>
              <p className="title is-5 has-text-info">{stats.seated}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered stats-card">
              <p className="heading">Aujourd'hui</p>
              <p className="title is-5 has-text-primary">{stats.today}</p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="box">
          <div className="columns">
            <div className="column is-4">
              <Input
                placeholder="Rechercher par nom, email, téléphone..."
                value={searchTerm}
                onChange={handleSearchChange}
                leftIcon={MagnifyingGlassIcon}
                size="medium"
              />
            </div>
            
            <div className="column is-2">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={statusFilter}
                      onChange={handleStatusFilterChange}
                    >
                      <option value="">Tous les statuts</option>
                      <option value={RESERVATION_STATUS.PENDING}>En attente</option>
                      <option value={RESERVATION_STATUS.CONFIRMED}>Confirmées</option>
                      <option value={RESERVATION_STATUS.SEATED}>Installées</option>
                      <option value={RESERVATION_STATUS.COMPLETED}>Terminées</option>
                      <option value={RESERVATION_STATUS.CANCELLED}>Annulées</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="column is-2">
              <Input
                type="date"
                value={dateFilter}
                onChange={handleDateFilterChange}
                size="medium"
              />
            </div>
            
            <div className="column">
              <Button
                variant="outline"
                leftIcon={FunnelIcon}
                onClick={handleResetFilters}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>

        {/* Tableau des réservations */}
        <div className="box">
          <Table
            data={filteredReservations}
            columns={tableColumns}
            loading={loading}
            pagination={{
              current: pagination.page,
              total: pagination.total,
              pageSize: pagination.limit,
              onChange: handlePageChange
            }}
            rowKey="_id"
            emptyText="Aucune réservation trouvée"
          />
        </div>
      </div>

      {/* Modal de détails */}
      <ReservationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        reservation={selectedReservation}
        onConfirm={handleConfirmReservation}
        onCancel={handleCancelReservation}
        onEdit={handleEditReservation}
        loading={handlerLoading}
      />

      {/* Modal de création/édition */}
      <ReservationFormModal
        isOpen={isFormModalOpen || isEditModalOpen}
        onClose={isEditModalOpen ? closeEditModal : closeFormModal}
        onSubmit={isEditModalOpen ? handleUpdateReservation : handleCreateReservation}
        reservation={isEditModalOpen ? selectedReservation : null}
        loading={handlerLoading}
      />
    </div>
  );
};

export default ReservationsPage;