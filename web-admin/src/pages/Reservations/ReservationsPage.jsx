import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Composants
import Table from '@/components/common/Table/Table';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';

// Utilitaires
import { formatDateTime, formatDate, formatTime } from '../../../shared/utils/formatters';

// ========================================
// 📅 PAGE GESTION RÉSERVATIONS
// ========================================

const ReservationsPage = () => {
  const dispatch = useDispatch();
  
  // États locaux
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    status: '',
    search: ''
  });
  
  useDocumentTitle('Gestion des Réservations - Zengest Admin');
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  useEffect(() => {
    // Simuler le chargement des réservations
    setTimeout(() => {
      setReservations([
        {
          _id: '1',
          reservationNumber: 'RES-2025-001',
          customer: {
            firstName: 'Jean',
            lastName: 'Dupont',
            phone: '+33123456789',
            email: 'jean.dupont@email.com'
          },
          dateTime: new Date('2025-06-17T19:30:00'),
          partySize: 4,
          status: 'confirmed',
          specialRequests: ['Table près de la fenêtre'],
          assignedTable: { number: '12' },
          createdAt: new Date('2025-06-15T10:00:00')
        },
        {
          _id: '2',
          reservationNumber: 'RES-2025-002',
          customer: {
            firstName: 'Marie',
            lastName: 'Martin',
            phone: '+33987654321',
            email: 'marie.martin@email.com'
          },
          dateTime: new Date('2025-06-17T20:00:00'),
          partySize: 2,
          status: 'pending',
          specialRequests: [],
          assignedTable: null,
          createdAt: new Date('2025-06-16T14:30:00')
        },
        {
          _id: '3',
          reservationNumber: 'RES-2025-003',
          customer: {
            firstName: 'Pierre',
            lastName: 'Bernard',
            phone: '+33555666777',
            email: 'pierre.bernard@email.com'
          },
          dateTime: new Date('2025-06-18T12:30:00'),
          partySize: 6,
          status: 'confirmed',
          specialRequests: ['Anniversaire', 'Menu végétarien'],
          assignedTable: { number: '8' },
          createdAt: new Date('2025-06-14T16:45:00')
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [filters]);
  
  // ========================================
  // 📊 CONFIGURATION DES COLONNES
  // ========================================
  
  const columns = [
    {
      key: 'reservationNumber',
      title: 'N° Réservation',
      type: 'text',
      sortable: true,
      render: (reservation) => (
        <div>
          <p className="has-text-weight-semibold">{reservation.reservationNumber}</p>
          <p className="is-size-7 has-text-grey">
            {formatDate(reservation.createdAt)}
          </p>
        </div>
      )
    },
    {
      key: 'customer',
      title: 'Client',
      type: 'text',
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
      type: 'datetime',
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
      key: 'partySize',
      title: 'Personnes',
      type: 'number',
      render: (reservation) => (
        <div className="has-text-centered">
          <span className="tag is-light is-medium">
            <span className="icon">
              <UserGroupIcon className="h-4 w-4" />
            </span>
            <span>{reservation.partySize}</span>
          </span>
        </div>
      )
    },
    {
      key: 'table',
      title: 'Table',
      type: 'text',
      render: (reservation) => (
        reservation.assignedTable ? (
          <span className="tag is-info">
            Table {reservation.assignedTable.number}
          </span>
        ) : (
          <span className="tag is-light">Non assignée</span>
        )
      )
    },
    {
      key: 'status',
      title: 'Statut',
      type: 'badge',
      render: (reservation) => {
        const statusConfig = {
          pending: { color: 'warning', label: 'En attente' },
          confirmed: { color: 'success', label: 'Confirmée' },
          seated: { color: 'info', label: 'Installée' },
          completed: { color: 'primary', label: 'Terminée' },
          cancelled: { color: 'danger', label: 'Annulée' },
          no_show: { color: 'dark', label: 'Absence' }
        };
        
        const config = statusConfig[reservation.status] || statusConfig.pending;
        
        return (
          <span className={`tag is-${config.color}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      key: 'specialRequests',
      title: 'Demandes spéciales',
      type: 'text',
      render: (reservation) => (
        reservation.specialRequests.length > 0 ? (
          <div>
            {reservation.specialRequests.slice(0, 2).map((request, index) => (
              <span key={index} className="tag is-light is-small mr-1 mb-1">
                {request}
              </span>
            ))}
            {reservation.specialRequests.length > 2 && (
              <span className="tag is-light is-small">
                +{reservation.specialRequests.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="has-text-grey">Aucune</span>
        )
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      type: 'custom',
      width: '150px',
      render: (reservation) => (
        <div className="buttons is-small">
          <button 
            className="button is-small is-outlined"
            onClick={() => handleViewReservation(reservation)}
            title="Voir les détails"
          >
            <span className="icon">
              <EyeIcon className="h-4 w-4" />
            </span>
          </button>
          
          <button 
            className="button is-small is-info is-outlined"
            onClick={() => handleEditReservation(reservation)}
            title="Modifier"
          >
            <span className="icon">
              <PencilIcon className="h-4 w-4" />
            </span>
          </button>
          
          {reservation.status === 'pending' && (
            <button 
              className="button is-small is-success is-outlined"
              onClick={() => handleConfirmReservation(reservation)}
              title="Confirmer"
            >
              <span className="icon">
                <CheckIcon className="h-4 w-4" />
              </span>
            </button>
          )}
          
          {reservation.status !== 'cancelled' && (
            <button 
              className="button is-small is-danger is-outlined"
              onClick={() => handleCancelReservation(reservation)}
              title="Annuler"
            >
              <span className="icon">
                <XMarkIcon className="h-4 w-4" />
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
  
  const handleViewReservation = (reservation) => {
    console.log('Voir réservation:', reservation);
    // TODO: Ouvrir modal de détails
  };
  
  const handleEditReservation = (reservation) => {
    console.log('Modifier réservation:', reservation);
    // TODO: Ouvrir formulaire d'édition
  };
  
  const handleConfirmReservation = (reservation) => {
    console.log('Confirmer réservation:', reservation);
    // TODO: Confirmer la réservation
  };
  
  const handleCancelReservation = (reservation) => {
    console.log('Annuler réservation:', reservation);
    // TODO: Annuler la réservation
  };
  
  const handleAddReservation = () => {
    console.log('Ajouter nouvelle réservation');
    // TODO: Ouvrir formulaire de création
  };
  
  // ========================================
  // 📊 STATISTIQUES
  // ========================================
  
  const getStats = () => {
    return {
      total: reservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      seated: reservations.filter(r => r.status === 'seated').length,
      completed: reservations.filter(r => r.status === 'completed').length
    };
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const stats = getStats();
  
  return (
    <div className="reservations-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">Gestion des Réservations</h1>
                <p className="subtitle is-6">
                  Planification et suivi des réservations
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button 
                className="button is-primary"
                onClick={handleAddReservation}
              >
                <span className="icon">
                  <PlusIcon className="h-5 w-5" />
                </span>
                <span>Nouvelle Réservation</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Filtres */}
        <div className="box">
          <div className="field is-grouped">
            <div className="control">
              <label className="label">Date</label>
              <input 
                className="input"
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
            <div className="control">
              <label className="label">Statut</label>
              <div className="select">
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="seated">Installées</option>
                  <option value="completed">Terminées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
            </div>
            <div className="control">
              <label className="label">Recherche</label>
              <input 
                className="input"
                type="text"
                placeholder="Nom, téléphone..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
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
              <p className="heading">En attente</p>
              <p className="title is-5 has-text-warning">{stats.pending}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Confirmées</p>
              <p className="title is-5 has-text-success">{stats.confirmed}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Installées</p>
              <p className="title is-5 has-text-info">{stats.seated}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Terminées</p>
              <p className="title is-5 has-text-primary">{stats.completed}</p>
            </div>
          </div>
        </div>
        
        {/* Table des réservations */}
        <Table
          columns={columns}
          data={reservations}
          loading={loading}
          searchable
          sortable
          className="reservations-table"
          emptyMessage="Aucune réservation trouvée"
          onRowClick={handleViewReservation}
        />
      </div>
    </div>
  );
};

export default ReservationsPage;