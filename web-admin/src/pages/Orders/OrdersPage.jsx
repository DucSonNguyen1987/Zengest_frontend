import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyEuroIcon,
  TableCellsIcon,
  UserIcon,
  EyeIcon,
  PencilIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { 
  fetchOrders, 
  createOrder, 
  updateOrderStatus,
  deleteOrder 
} from '@/store/slices/ordersSlice';

// Sélecteurs
import { 
  selectOrders, 
  selectOrdersLoading,
  selectOrdersPagination,
  selectActiveOrders 
} from '@/store/slices/ordersSlice';
import { selectCurrentUser } from '@/store/slices/authSlice';

// Composants
import Table from '@/components/common/Table/Table';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';
import OrderForm from '@/components/orders/OrderForm/OrderForm';
import OrderFilters from '@/components/orders/OrderFilters/OrderFilters';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge/OrderStatusBadge';
import OrderDetailsModal from '@/components/orders/OrderDetailsModal/OrderDetailsModal';
import KitchenMonitor from '@/components/orders/KitchenMonitor/KitchenMonitor';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';
import { useWebSocket } from '@/hooks/useWebSocket';
import { usePermissions } from '@/hooks/auth/usePermissions';

// Utilitaires
import { formatCurrency, formatDateTime, formatTimeAgo } from '../../../shared/utils/formatters';
import { hasPermission } from '@shared/constants/permissions';

// Constantes
import { ORDER_STATUS, ORDER_STATUS_TRANSITIONS } from '@shared/utils/constants';

// Styles
import './OrdersPage.scss';

// ========================================
// 🛒 PAGE GESTION COMMANDES
// ========================================

const OrdersPage = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const pagination = useSelector(selectOrdersPagination);
  const activeOrders = useSelector(selectActiveOrders);
  const currentUser = useSelector(selectCurrentUser);
  
  // États locaux
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // table, kanban, kitchen
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    table: '',
    dateFrom: '',
    dateTo: '',
    assignedServer: ''
  });
  const [statusUpdating, setStatusUpdating] = useState({});
  
  // Hooks personnalisés
  useDocumentTitle('Gestion des Commandes - Zengest Admin');
  const permissions = usePermissions();
  
  // WebSocket pour les mises à jour temps réel
  const { socket, isConnected } = useWebSocket();
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Chargement initial des données
  useEffect(() => {
    dispatch(fetchOrders({ 
      page: 1, 
      limit: 20,
      ...filters 
    }));
  }, [dispatch, filters]);
  
  // Écoute des événements WebSocket
  useEffect(() => {
    if (socket && isConnected) {
      socket.on('orderCreated', handleOrderCreated);
      socket.on('orderUpdated', handleOrderUpdated);
      socket.on('orderStatusChanged', handleOrderStatusChanged);
      
      return () => {
        socket.off('orderCreated');
        socket.off('orderUpdated');
        socket.off('orderStatusChanged');
      };
    }
  }, [socket, isConnected]);
  
  // Actualisation automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (viewMode === 'kitchen' || activeOrders.length > 0) {
        dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [dispatch, filters, viewMode, activeOrders.length]);
  
  // ========================================
  // 🔔 GESTIONNAIRES WEBSOCKET
  // ========================================
  
  const handleOrderCreated = useCallback((newOrder) => {
    // Rafraîchir la liste des commandes
    dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
    
    // Notification
    if (Notification.permission === 'granted') {
      new Notification('Nouvelle commande !', {
        body: `Table ${newOrder.tableNumber} - ${formatCurrency(newOrder.pricing.total)}`,
        icon: '/icon-192x192.png'
      });
    }
  }, [dispatch, filters]);
  
  const handleOrderUpdated = useCallback((updatedOrder) => {
    dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
  }, [dispatch, filters]);
  
  const handleOrderStatusChanged = useCallback((data) => {
    dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
    
    // Sons de notification selon le statut
    if (data.status === 'ready') {
      // Son pour commande prête
      const audio = new Audio('/sounds/order-ready.mp3');
      audio.play().catch(() => {});
    }
  }, [dispatch, filters]);
  
  // ========================================
  // 📊 CONFIGURATION DES COLONNES
  // ========================================
  
  const columns = [
    {
      key: 'orderNumber',
      title: 'N° Commande',
      type: 'text',
      sortable: true,
      render: (order) => (
        <div>
          <p className="has-text-weight-semibold">{order.orderNumber}</p>
          <p className="is-size-7 has-text-grey">
            {formatTimeAgo(order.timestamps.ordered)}
          </p>
        </div>
      )
    },
    {
      key: 'table',
      title: 'Table',
      type: 'text',
      render: (order) => (
        <div className="has-text-centered">
          <span className="tag is-medium">
            <span className="icon">
              <TableCellsIcon className="h-4 w-4" />
            </span>
            <span>{order.tableNumber}</span>
          </span>
        </div>
      )
    },
    {
      key: 'customer',
      title: 'Client',
      type: 'text',
      render: (order) => (
        <div>
          <p className="has-text-weight-semibold">
            {order.customer?.firstName} {order.customer?.lastName}
          </p>
          {order.customer?.phone && (
            <p className="is-size-7 has-text-grey">{order.customer.phone}</p>
          )}
        </div>
      )
    },
    {
      key: 'items',
      title: 'Articles',
      type: 'text',
      render: (order) => (
        <div>
          <p className="has-text-weight-semibold">{order.items?.length || 0} article(s)</p>
          <p className="is-size-7 has-text-grey">
            {order.items?.slice(0, 2).map(item => item.menuItem?.name).join(', ')}
            {order.items?.length > 2 && '...'}
          </p>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Statut',
      type: 'custom',
      render: (order) => (
        <OrderStatusBadge 
          status={order.status}
          canUpdate={hasPermission(currentUser, 'update_order')}
          isUpdating={statusUpdating[order._id]}
          onStatusChange={(newStatus) => handleStatusChange(order, newStatus)}
        />
      )
    },
    {
      key: 'total',
      title: 'Total',
      type: 'currency',
      sortable: true,
      render: (order) => (
        <div className="has-text-right">
          <p className="has-text-weight-semibold">
            {formatCurrency(order.pricing?.total || 0)}
          </p>
          {order.priority === 'urgent' && (
            <span className="tag is-danger is-small">Urgent</span>
          )}
        </div>
      )
    },
    {
      key: 'server',
      title: 'Serveur',
      type: 'text',
      render: (order) => (
        order.assignedServer && (
          <div>
            <span className="icon-text">
              <span className="icon">
                <UserIcon className="h-4 w-4" />
              </span>
              <span className="is-size-7">
                {order.assignedServer.firstName} {order.assignedServer.lastName}
              </span>
            </span>
          </div>
        )
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      type: 'custom',
      width: '120px',
      render: (order) => (
        <div className="buttons is-small">
          <button 
            className="button is-small is-outlined"
            onClick={() => handleViewOrder(order)}
            title="Voir les détails"
          >
            <span className="icon">
              <EyeIcon className="h-4 w-4" />
            </span>
          </button>
          
          {hasPermission(currentUser, 'update_order') && (
            <button 
              className="button is-small is-info is-outlined"
              onClick={() => handleEditOrder(order)}
              title="Modifier"
            >
              <span className="icon">
                <PencilIcon className="h-4 w-4" />
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
  
  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsFormOpen(true);
  };
  
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsFormOpen(true);
  };
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
  const handleStatusChange = async (order, newStatus) => {
    // Vérifier si la transition est autorisée
    const allowedTransitions = ORDER_STATUS_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      console.error('Transition de statut non autorisée');
      return;
    }
    
    setStatusUpdating({ ...statusUpdating, [order._id]: true });
    
    try {
      await dispatch(updateOrderStatus({
        id: order._id,
        status: newStatus,
        notes: `Statut changé vers ${newStatus}`
      })).unwrap();
      
      // Rafraîchir la liste
      dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
    } catch (error) {
      console.error('Erreur changement de statut:', error);
    } finally {
      setStatusUpdating({ ...statusUpdating, [order._id]: false });
    }
  };
  
  const handleOrderSubmit = async (orderData) => {
    try {
      if (selectedOrder) {
        // Mise à jour existante
        await dispatch(updateOrder({ 
          id: selectedOrder._id, 
          data: orderData 
        })).unwrap();
      } else {
        // Nouvelle commande
        await dispatch(createOrder(orderData)).unwrap();
      }
      
      setIsFormOpen(false);
      setSelectedOrder(null);
      
      // Recharger la liste
      dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
    } catch (error) {
      console.error('Erreur sauvegarde commande:', error);
    }
  };
  
  const handlePageChange = (page) => {
    dispatch(fetchOrders({ 
      page, 
      limit: pagination.limit, 
      ...filters 
    }));
  };
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleRefresh = () => {
    dispatch(fetchOrders({ page: 1, limit: 20, ...filters }));
  };
  
  // ========================================
  // 🎨 RENDU PAR MODE
  // ========================================
  
  const renderTableView = () => (
    <Table
      columns={columns}
      data={orders}
      loading={loading}
      pagination
      currentPage={pagination?.currentPage || 1}
      pageSize={pagination?.itemsPerPage || 20}
      totalItems={pagination?.totalItems || 0}
      onPageChange={handlePageChange}
      searchable
      sortable
      className="orders-table"
      emptyMessage="Aucune commande trouvée"
      onRowClick={handleViewOrder}
    />
  );
  
  const renderKitchenView = () => (
    <KitchenMonitor 
      orders={activeOrders}
      onStatusChange={handleStatusChange}
      isConnected={isConnected}
    />
  );
  
  // ========================================
  // 🎨 RENDU PRINCIPAL
  // ========================================
  
  if (loading && orders.length === 0) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="orders-page">
      <div className="container is-fluid">
        {/* En-tête */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div>
                <h1 className="title is-4">
                  Gestion des Commandes
                  {isConnected && (
                    <span className="tag is-success is-small ml-2">
                      Temps réel
                    </span>
                  )}
                </h1>
                <p className="subtitle is-6">
                  Suivi des commandes en temps réel
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
                
                {hasPermission(currentUser, 'create_order') && (
                  <button 
                    className="button is-primary"
                    onClick={handleAddOrder}
                  >
                    <span className="icon">
                      <PlusIcon className="h-5 w-5" />
                    </span>
                    <span>Nouvelle Commande</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sélecteur de vue */}
        <div className="tabs is-boxed">
          <ul>
            <li className={viewMode === 'table' ? 'is-active' : ''}>
              <a onClick={() => setViewMode('table')}>
                <span>Vue Tableau</span>
              </a>
            </li>
            <li className={viewMode === 'kitchen' ? 'is-active' : ''}>
              <a onClick={() => setViewMode('kitchen')}>
                <span>Vue Cuisine</span>
              </a>
            </li>
          </ul>
        </div>
        
        {/* Statistiques rapides */}
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Commandes Actives</p>
              <p className="title is-5 has-text-info">{activeOrders.length}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">En Préparation</p>
              <p className="title is-5 has-text-warning">
                {orders.filter(o => o.status === 'preparing').length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Prêtes</p>
              <p className="title is-5 has-text-success">
                {orders.filter(o => o.status === 'ready').length}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <p className="heading">Total Jour</p>
              <p className="title is-5">
                {formatCurrency(
                  orders
                    .filter(o => o.status === 'paid')
                    .reduce((sum, o) => sum + (o.pricing?.total || 0), 0)
                )}
              </p>
            </div>
          </div>
        </div>
        
        {/* Filtres */}
        {viewMode === 'table' && (
          <OrderFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        )}
        
        {/* Contenu selon le mode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'table' ? renderTableView() : renderKitchenView()}
          </motion.div>
        </AnimatePresence>
        
        {/* Modal de formulaire */}
        {isFormOpen && (
          <OrderForm
            order={selectedOrder}
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedOrder(null);
            }}
            onSubmit={handleOrderSubmit}
          />
        )}
        
        {/* Modal de détails */}
        {isDetailsOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            isOpen={isDetailsOpen}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedOrder(null);
            }}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;