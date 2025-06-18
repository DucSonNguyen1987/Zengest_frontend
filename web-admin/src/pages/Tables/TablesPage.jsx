// web-admin/src/pages/Tables/TablesPage.jsx - VERSION FINALE
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TableCellsIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { 
  fetchFloorPlans, 
  fetchTables,
  updateTableStatus,
  createTable,
  updateTable,
  deleteTable 
} from '@/store/slices/tablesSlice';

// Sélecteurs
import { 
  selectTables, 
  selectFloorPlans,
  selectTablesLoading,
  selectCurrentFloorPlan 
} from '@/store/slices/tablesSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';

// Composants
import FloorPlanCanvas from '@/components/floorplan/FloorPlanCanvas/FloorPlanCanvas';
import TableForm from '@/components/tables/TableForm/TableForm';
import TableDetailsModal from '@/components/tables/TableDetailsModal/TableDetailsModal';
import FloorPlanSelector from '@/components/floorplan/FloorPlanSelector/FloorPlanSelector';
import TableFilters from '@/components/tables/TableFilters/TableFilters';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { useWebSocket } from '@/hooks/useWebSocket';
import { usePermissions } from '@/hooks/auth/usePermissions';

// Utilitaires
import { hasPermission } from '@/utils/permissions';
import { formatDateTime } from '../../../shared/utils/formatters';

// Constantes
import { TABLE_STATUS } from '@/utils/constants';

// Styles
import './TablesPage.scss';

// ========================================
// 🪑 PAGE GESTION TABLES
// ========================================

const TablesPage = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const tables = useSelector(selectTables);
  const floorPlans = useSelector(selectFloorPlans);
  const loading = useSelector(selectTablesLoading);
  const currentFloorPlan = useSelector(selectCurrentFloorPlan);
  const currentUser = useSelector(selectCurrentUser);
  
  // États locaux
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [isTableFormOpen, setIsTableFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('floorplan'); // floorplan, grid, list
  const [filters, setFilters] = useState({
    status: '',
    capacity: '',
    section: ''
  });
  const [statusUpdating, setStatusUpdating] = useState({});
  
  // Hooks personnalisés
  useDocumentTitle('Gestion des Tables - Zengest Admin');
  const permissions = usePermissions();
  
  // WebSocket pour les mises à jour temps réel
  const { socket, isConnected } = useWebSocket();
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Chargement initial des données
  useEffect(() => {
    dispatch(fetchFloorPlans());
    if (selectedFloorPlan) {
      dispatch(fetchTables(selectedFloorPlan._id));
    }
  }, [dispatch, selectedFloorPlan]);
  
  // Sélection automatique du premier plan de salle
  useEffect(() => {
    if (floorPlans.length > 0 && !selectedFloorPlan) {
      setSelectedFloorPlan(floorPlans[0]);
    }
  }, [floorPlans, selectedFloorPlan]);
  
  // Écoute des événements WebSocket
  useEffect(() => {
    if (socket && isConnected) {
      socket.on('tableStatusChanged', handleTableStatusChanged);
      socket.on('tableOccupancyChanged', handleTableOccupancyChanged);
      
      return () => {
        socket.off('tableStatusChanged');
        socket.off('tableOccupancyChanged');
      };
    }
  }, [socket, isConnected]);
  
  // Actualisation automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedFloorPlan) {
        dispatch(fetchTables(selectedFloorPlan._id));
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [dispatch, selectedFloorPlan]);
  
  // ========================================
  // 🔔 GESTIONNAIRES WEBSOCKET
  // ========================================
  
  const handleTableStatusChanged = useCallback((data) => {
    if (selectedFloorPlan && data.floorPlanId === selectedFloorPlan._id) {
      dispatch(fetchTables(selectedFloorPlan._id));
    }
  }, [dispatch, selectedFloorPlan]);
  
  const handleTableOccupancyChanged = useCallback((data) => {
    if (selectedFloorPlan && data.floorPlanId === selectedFloorPlan._id) {
      dispatch(fetchTables(selectedFloorPlan._id));
    }
  }, [dispatch, selectedFloorPlan]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleFloorPlanChange = (floorPlan) => {
    setSelectedFloorPlan(floorPlan);
  };
  
  const handleAddTable = () => {
    setSelectedTable(null);
    setIsTableFormOpen(true);
  };
  
  const handleEditTable = (table) => {
    setSelectedTable(table);
    setIsTableFormOpen(true);
  };
  
  const handleViewTable = (table) => {
    setSelectedTable(table);
    setIsDetailsOpen(true);
  };
  
  const handleDeleteTable = (table) => {
    setTableToDelete(table);
  };
  
  const handleConfirmDeleteTable = async () => {
    try {
      await dispatch(deleteTable(tableToDelete._id)).unwrap();
      setTableToDelete(null);
      
      // Recharger les tables
      if (selectedFloorPlan) {
        dispatch(fetchTables(selectedFloorPlan._id));
      }
    } catch (error) {
      console.error('Erreur suppression table:', error);
    }
  };
  
  const handleTableStatusChange = async (table, newStatus) => {
    setStatusUpdating({ ...statusUpdating, [table._id]: true });
    
    try {
      await dispatch(updateTableStatus({
        tableId: table._id,
        status: newStatus,
        floorPlanId: selectedFloorPlan._id
      })).unwrap();
      
      // Recharger les tables
      if (selectedFloorPlan) {
        dispatch(fetchTables(selectedFloorPlan._id));
      }
    } catch (error) {
      console.error('Erreur changement de statut:', error);
    } finally {
      setStatusUpdating({ ...statusUpdating, [table._id]: false });
    }
  };
  
  const handleTableSubmit = async (tableData) => {
    try {
      const dataWithFloorPlan = {
        ...tableData,
        floorPlanId: selectedFloorPlan._id
      };
      
      if (selectedTable) {
        await dispatch(updateTable({ 
          id: selectedTable._id, 
          data: dataWithFloorPlan 
        })).unwrap();
      } else {
        await dispatch(createTable(dataWithFloorPlan)).unwrap();
      }
      
      setIsTableFormOpen(false);
      setSelectedTable(null);
      
      // Recharger les tables
      if (selectedFloorPlan) {
        dispatch(fetchTables(selectedFloorPlan._id));
      }
    } catch (error) {
      console.error('Erreur sauvegarde table:', error);
    }
  };
  
  const handleRefresh = () => {
    if (selectedFloorPlan) {
      dispatch(fetchTables(selectedFloorPlan._id));
    }
  };
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // ========================================
  // 📊 UTILITAIRES DE DONNÉES
  // ========================================
  
  const getFilteredTables = () => {
    if (!tables) return [];
    
    return tables.filter(table => {
      if (filters.status && table.status !== filters.status) return false;
      if (filters.capacity && table.capacity !== parseInt(filters.capacity)) return false;
      if (filters.section && table.section !== filters.section) return false;
      return true;
    });
  };
  
  const getTableStats = () => {
    const filteredTables = getFilteredTables();
    
    return {
      total: filteredTables.length,
      available: filteredTables.filter(t => t.status === 'available').length,
      occupied: filteredTables.filter(t => t.status === 'occupied').length,
      reserved: filteredTables.filter(t => t.status === 'reserved').length,
      cleaning: filteredTables.filter(t => t.status === 'cleaning').length,
      outOfService: filteredTables.filter(t => t.status === 'out_of_service').length
    };
  };
  
  // ========================================
  // 🎨 RENDUS PAR MODE
  // ========================================
  
  const renderFloorPlanView = () => (
    <div className="floor-plan-container">
      {selectedFloorPlan ? (
        <FloorPlanCanvas
          floorPlan={selectedFloorPlan}
          tables={getFilteredTables()}
          onTableClick={handleViewTable}
          onTableStatusChange={handleTableStatusChange}
          canEdit={hasPermission(currentUser, 'manage_tables')}
          isConnected={isConnected}
          statusUpdating={statusUpdating}
        />
      ) : (
        <div className="has-text-centered p-6">
          <p className="subtitle">Aucun plan de salle sélectionné</p>
        </div>
      )}
    </div>
  );
  
  const renderGridView = () => (
    <div className="tables-grid">
      <div className="columns is-multiline">
        {getFilteredTables().map(table => (
          <div key={table._id} className="column is-one-quarter">
            <motion.div
              className={`card table-card is-${getTableStatusColor(table.status)}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <span className="icon is-large">
                      <TableCellsIcon className="h-8 w-8" />
                    </span>
                  </div>
                  <div className="media-content">
                    <p className="title is-5">{table.number}</p>
                    <p className="subtitle is-6">{table.section}</p>
                  </div>
                </div>
                
                <div className="content">
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <div className="tags has-addons">
                        <span className="tag">Capacité</span>
                        <span className="tag is-primary">{table.capacity}</span>
                      </div>
                    </div>
                    <div className="control">
                      <span className={`tag is-${getTableStatusColor(table.status)}`}>
                        {getTableStatusLabel(table.status)}
                      </span>
                    </div>
                  </div>
                  
                  {table.currentOrder && (
                    <div className="notification is-light is-small">
                      <p className="is-size-7">
                        Commande #{table.currentOrder.orderNumber}
                      </p>
                    </div>
                  )}
                </div>
                
                <footer className="card-footer">
                  <a 
                    className="card-footer-item"
                    onClick={() => handleViewTable(table)}
                  >
                    <span className="icon">
                      <EyeIcon className="h-4 w-4" />
                    </span>
                    <span>Voir</span>
                  </a>
                  
                  {hasPermission(currentUser, 'manage_tables') && (
                    <a 
                      className="card-footer-item"
                      onClick={() => handleEditTable(table)}
                    >
                      <span className="icon">
                        <PencilIcon className="h-4 w-4" />
                      </span>
                      <span>Modifier</span>
                    </a>
                  )}
                </footer>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // ========================================
  // 🎨 UTILITAIRES D'AFFICHAGE
  // ========================================
  
  const getTableStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'occupied': return 'danger';
      case 'reserved': return 'warning';
      case 'cleaning': return 'info';
      case 'out_of_service': return 'dark';
      default: return 'light';
    }
  };
  
  const getTableStatusLabel = (status) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Occupée';
      case 'reserved': return 'Réservée';
      case 'cleaning': return 'Nettoyage';
      case 'out_of_service': return 'Hors service';
      default: return 'Inconnu';
    }
  };
  
  // ========================================
  // 🎨 RENDU PRINCIPAL
  // ========================================
  
  if (loading && tables.length === 0) {
    return <LoadingSpinner />;
  }
  
  const stats = getTableStats();
  
  return (
    <div className="tables-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">
                  Gestion des Tables
                  {isConnected && (
                    <span className="tag is-success is-small ml-2">
                      Temps réel
                    </span>
                  )}
                </h1>
                <p className="subtitle is-6">
                  Plan de salle et gestion des tables
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="buttons">
                <button 
                  className="button is-outlined"
                  onClick={handleRefresh}
                >
                  <span className="icon">
                    <ArrowPathIcon className="h-5 w-5" />
                  </span>
                  <span>Actualiser</span>
                </button>
                
                {hasPermission(currentUser, 'manage_tables') && (
                  <button 
                    className="button is-primary"
                    onClick={handleAddTable}
                  >
                    <span className="icon">
                      <PlusIcon className="h-5 w-5" />
                    </span>
                    <span>Nouvelle Table</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sélecteur de plan de salle */}
        <FloorPlanSelector
          floorPlans={floorPlans}
          selectedFloorPlan={selectedFloorPlan}
          onFloorPlanChange={handleFloorPlanChange}
        />
        
        {/* Sélecteur de vue */}
        <div className="tabs is-boxed">
          <ul>
            <li className={viewMode === 'floorplan' ? 'is-active' : ''}>
              <a onClick={() => setViewMode('floorplan')}>
                <span>Plan de Salle</span>
              </a>
            </li>
            <li className={viewMode === 'grid' ? 'is-active' : ''}>
              <a onClick={() => setViewMode('grid')}>
                <span>Vue Grille</span>
              </a>
            </li>
          </ul>
        </div>
        
        {/* Statistiques */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Tables</p>
              <p className="title is-5">{stats.total}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Disponibles</p>
              <p className="title is-5 has-text-success">{stats.available}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Occupées</p>
              <p className="title is-5 has-text-danger">{stats.occupied}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Réservées</p>
              <p className="title is-5 has-text-warning">{stats.reserved}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Nettoyage</p>
              <p className="title is-5 has-text-info">{stats.cleaning}</p>
            </div>
          </div>
        </div>
        
        {/* Filtres */}
        <TableFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          tables={tables}
        />
        
        {/* Contenu selon le mode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'floorplan' ? renderFloorPlanView() : renderGridView()}
          </motion.div>
        </AnimatePresence>
        
        {/* Modal de formulaire table */}
        {isTableFormOpen && (
          <TableForm
            table={selectedTable}
            floorPlan={selectedFloorPlan}
            isOpen={isTableFormOpen}
            onClose={() => {
              setIsTableFormOpen(false);
              setSelectedTable(null);
            }}
            onSubmit={handleTableSubmit}
          />
        )}
        
        {/* Modal de détails */}
        {isDetailsOpen && selectedTable && (
          <TableDetailsModal
            table={selectedTable}
            isOpen={isDetailsOpen}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedTable(null);
            }}
            onStatusChange={handleTableStatusChange}
            canEdit={hasPermission(currentUser, 'manage_tables')}
          />
        )}
        
        {/* Modal de confirmation de suppression */}
        {tableToDelete && (
          <ConfirmModal
            isOpen={!!tableToDelete}
            title="Supprimer la table"
            message={`Êtes-vous sûr de vouloir supprimer la table "${tableToDelete.number}" ? Cette action est irréversible.`}
            confirmText="Supprimer"
            confirmClass="is-danger"
            onConfirm={handleConfirmDeleteTable}
            onCancel={() => setTableToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TablesPage;