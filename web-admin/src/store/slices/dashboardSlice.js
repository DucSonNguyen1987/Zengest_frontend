// Gestion des données du dashboard
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Services API
import { get } from '../../../shared/api-client/apiClient';

// ========================================
// 🔄 ASYNC THUNKS
// ========================================

// Récupération des données du dashboard
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async ({ period = 'today', forceRefresh = false } = {}, { rejectWithValue }) => {
    try {
      const params = {
        period,
        refresh: forceRefresh ? Date.now() : undefined
      };
      
      const response = await get('/dashboard', { params });
      return {
        ...response,
        lastFetch: Date.now(),
        period
      };
    } catch (error) {
      const message = error.message || 'Erreur lors du chargement du dashboard';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Récupération des métriques en temps réel
export const fetchRealtimeMetrics = createAsyncThunk(
  'dashboard/fetchRealtimeMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get('/dashboard/realtime');
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Récupération de l'activité récente
export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async ({ limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await get('/dashboard/activity', {
        params: { limit }
      });
      return response.activities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Récupération des alertes
export const fetchDashboardAlerts = createAsyncThunk(
  'dashboard/fetchDashboardAlerts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get('/dashboard/alerts');
      return response.alerts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// 🏪 ÉTAT INITIAL
// ========================================

const initialState = {
  // Données principales
  metrics: {
    revenue: 0,
    revenueChange: 0,
    orders: 0,
    ordersChange: 0,
    reservations: 0,
    reservationsChange: 0,
    customers: 0,
    customersChange: 0,
    avgDeliveryTime: 0,
    occupancyRate: 0,
    topDish: null
  },
  
  // Graphiques
  salesChart: {
    labels: [],
    data: []
  },
  ordersChart: {
    labels: [],
    data: []
  },
  reservationsChart: {
    labels: [],
    data: []
  },
  
  // Activité récente
  recentActivities: [],
  
  // Alertes et notifications
  alerts: [],
  
  // États de chargement
  isLoading: false,
  isLoadingMetrics: false,
  isLoadingActivity: false,
  isLoadingAlerts: false,
  
  // Gestion des erreurs
  error: null,
  metricsError: null,
  activityError: null,
  alertsError: null,
  
  // Métadonnées
  lastFetch: null,
  currentPeriod: 'today',
  autoRefreshEnabled: true,
  refreshInterval: 30000, // 30 secondes
  
  // Configuration
  widgets: {
    metrics: true,
    salesChart: true,
    ordersChart: true,
    reservationsChart: true,
    recentActivity: true,
    alerts: true
  },
  
  // Filtres
  filters: {
    dateRange: null,
    restaurant: null
  }
};

// ========================================
// 🏪 SLICE DASHBOARD
// ========================================

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Gestion des erreurs
    clearError: (state) => {
      state.error = null;
      state.metricsError = null;
      state.activityError = null;
      state.alertsError = null;
    },
    
    // Configuration de l'auto-refresh
    setAutoRefresh: (state, action) => {
      state.autoRefreshEnabled = action.payload;
    },
    
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
    },
    
    // Configuration des widgets
    toggleWidget: (state, action) => {
      const widgetName = action.payload;
      state.widgets[widgetName] = !state.widgets[widgetName];
    },
    
    setWidgetVisibility: (state, action) => {
      const { widget, visible } = action.payload;
      state.widgets[widget] = visible;
    },
    
    resetWidgets: (state) => {
      state.widgets = initialState.widgets;
    },
    
    // Gestion des filtres
    setDateRangeFilter: (state, action) => {
      state.filters.dateRange = action.payload;
    },
    
    setRestaurantFilter: (state, action) => {
      state.filters.restaurant = action.payload;
    },
    
    clearFilters: (state) => {
      state.filters = {
        dateRange: null,
        restaurant: null
      };
    },
    
    // Mise à jour en temps réel des métriques
    updateRealtimeMetric: (state, action) => {
      const { metric, value, change } = action.payload;
      if (state.metrics.hasOwnProperty(metric)) {
        state.metrics[metric] = value;
        if (change !== undefined) {
          state.metrics[`${metric}Change`] = change;
        }
      }
    },
    
    // Ajout d'une nouvelle activité
    addRecentActivity: (state, action) => {
      const newActivity = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      state.recentActivities.unshift(newActivity);
      
      // Garder seulement les 20 plus récentes
      if (state.recentActivities.length > 20) {
        state.recentActivities = state.recentActivities.slice(0, 20);
      }
    },
    
    // Gestion des alertes
    addAlert: (state, action) => {
      const newAlert = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      };
      
      state.alerts.unshift(newAlert);
    },
    
    markAlertAsRead: (state, action) => {
      const alertId = action.payload;
      const alert = state.alerts.find(a => a.id === alertId);
      if (alert) {
        alert.read = true;
      }
    },
    
    removeAlert: (state, action) => {
      const alertId = action.payload;
      state.alerts = state.alerts.filter(a => a.id !== alertId);
    },
    
    clearAllAlerts: (state) => {
      state.alerts = [];
    },
    
    // Optimistic updates pour les graphiques
    updateChartData: (state, action) => {
      const { chartType, data } = action.payload;
      if (state[chartType]) {
        state[chartType] = {
          ...state[chartType],
          ...data
        };
      }
    }
  },
  
  extraReducers: (builder) => {
    builder
      // === FETCH DASHBOARD DATA ===
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        
        const { 
          metrics, 
          salesChart, 
          ordersChart, 
          reservationsChart, 
          recentActivities,
          lastFetch,
          period 
        } = action.payload;
        
        // Mise à jour des données
        if (metrics) state.metrics = { ...state.metrics, ...metrics };
        if (salesChart) state.salesChart = salesChart;
        if (ordersChart) state.ordersChart = ordersChart;
        if (reservationsChart) state.reservationsChart = reservationsChart;
        if (recentActivities) state.recentActivities = recentActivities;
        
        // Métadonnées
        state.lastFetch = lastFetch;
        state.currentPeriod = period;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // === FETCH REALTIME METRICS ===
      .addCase(fetchRealtimeMetrics.pending, (state) => {
        state.isLoadingMetrics = true;
        state.metricsError = null;
      })
      .addCase(fetchRealtimeMetrics.fulfilled, (state, action) => {
        state.isLoadingMetrics = false;
        state.metrics = { ...state.metrics, ...action.payload };
        state.metricsError = null;
      })
      .addCase(fetchRealtimeMetrics.rejected, (state, action) => {
        state.isLoadingMetrics = false;
        state.metricsError = action.payload;
      })
      
      // === FETCH RECENT ACTIVITY ===
      .addCase(fetchRecentActivity.pending, (state) => {
        state.isLoadingActivity = true;
        state.activityError = null;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.isLoadingActivity = false;
        state.recentActivities = action.payload;
        state.activityError = null;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.isLoadingActivity = false;
        state.activityError = action.payload;
      })
      
      // === FETCH DASHBOARD ALERTS ===
      .addCase(fetchDashboardAlerts.pending, (state) => {
        state.isLoadingAlerts = true;
        state.alertsError = null;
      })
      .addCase(fetchDashboardAlerts.fulfilled, (state, action) => {
        state.isLoadingAlerts = false;
        state.alerts = action.payload;
        state.alertsError = null;
      })
      .addCase(fetchDashboardAlerts.rejected, (state, action) => {
        state.isLoadingAlerts = false;
        state.alertsError = action.payload;
      });
  }
});

// ========================================
// 🎯 SÉLECTEURS
// ========================================

export const selectDashboard = (state) => state.dashboard;
export const selectDashboardData = (state) => state.dashboard;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectDashboardError = (state) => state.dashboard.error;

export const selectMetrics = (state) => state.dashboard.metrics;
export const selectSalesChart = (state) => state.dashboard.salesChart;
export const selectOrdersChart = (state) => state.dashboard.ordersChart;
export const selectReservationsChart = (state) => state.dashboard.reservationsChart;

export const selectRecentActivities = (state) => state.dashboard.recentActivities;
export const selectDashboardAlerts = (state) => state.dashboard.alerts;
export const selectUnreadAlerts = (state) => 
  state.dashboard.alerts.filter(alert => !alert.read);

export const selectWidgetVisibility = (state) => state.dashboard.widgets;
export const selectDashboardFilters = (state) => state.dashboard.filters;

export const selectAutoRefreshConfig = (state) => ({
  enabled: state.dashboard.autoRefreshEnabled,
  interval: state.dashboard.refreshInterval
});

export const selectLastFetch = (state) => state.dashboard.lastFetch;
export const selectCurrentPeriod = (state) => state.dashboard.currentPeriod;

// Sélecteurs calculés
export const selectDashboardSummary = (state) => {
  const { metrics, lastFetch, currentPeriod } = state.dashboard;
  
  return {
    totalRevenue: metrics.revenue,
    totalOrders: metrics.orders,
    totalReservations: metrics.reservations,
    totalCustomers: metrics.customers,
    averageOrderValue: metrics.revenue / (metrics.orders || 1),
    lastUpdated: lastFetch,
    period: currentPeriod
  };
};

export const selectPerformanceTrends = (state) => {
  const { metrics } = state.dashboard;
  
  return {
    revenue: {
      current: metrics.revenue,
      change: metrics.revenueChange,
      trend: metrics.revenueChange > 0 ? 'up' : metrics.revenueChange < 0 ? 'down' : 'stable'
    },
    orders: {
      current: metrics.orders,
      change: metrics.ordersChange,
      trend: metrics.ordersChange > 0 ? 'up' : metrics.ordersChange < 0 ? 'down' : 'stable'
    },
    reservations: {
      current: metrics.reservations,
      change: metrics.reservationsChange,
      trend: metrics.reservationsChange > 0 ? 'up' : metrics.reservationsChange < 0 ? 'down' : 'stable'
    },
    customers: {
      current: metrics.customers,
      change: metrics.customersChange,
      trend: metrics.customersChange > 0 ? 'up' : metrics.customersChange < 0 ? 'down' : 'stable'
    }
  };
};

export const selectDashboardHealth = (state) => {
  const { 
    isLoading, 
    isLoadingMetrics, 
    isLoadingActivity, 
    error, 
    metricsError, 
    activityError,
    lastFetch 
  } = state.dashboard;
  
  const hasError = !!(error || metricsError || activityError);
  const isLoadingAny = isLoading || isLoadingMetrics || isLoadingActivity;
  const isStale = lastFetch && (Date.now() - lastFetch > 5 * 60 * 1000); // 5 minutes
  
  return {
    status: hasError ? 'error' : isLoadingAny ? 'loading' : isStale ? 'stale' : 'healthy',
    hasError,
    isLoading: isLoadingAny,
    isStale,
    errors: [error, metricsError, activityError].filter(Boolean)
  };
};

// ========================================
// 🎯 ACTIONS ET EXPORT
// ========================================

export const {
  clearError,
  setAutoRefresh,
  setRefreshInterval,
  toggleWidget,
  setWidgetVisibility,
  resetWidgets,
  setDateRangeFilter,
  setRestaurantFilter,
  clearFilters,
  updateRealtimeMetric,
  addRecentActivity,
  addAlert,
  markAlertAsRead,
  removeAlert,
  clearAllAlerts,
  updateChartData
} = dashboardSlice.actions;

export default dashboardSlice.reducer;