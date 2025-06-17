// sGestion de l'état de l'interface utilisateur
import { createSlice } from '@reduxjs/toolkit';

// ========================================
// 🏪 ÉTAT INITIAL
// ========================================

const initialState = {
  // Sidebar et navigation
  sidebar: {
    isOpen: true,
    isCollapsed: false,
    isMobile: false,
    activeSection: 'dashboard'
  },
  
  // Thème et apparence
  theme: {
    mode: localStorage.getItem('zengest_admin_theme') || 'light', // light, dark, auto
    primaryColor: '#eb2f06',
    accentColor: '#00d2d3',
    fontSize: 'medium', // small, medium, large
    density: 'comfortable' // compact, comfortable, spacious
  },
  
  // Modales et overlays
  modals: {
    // Structure: { modalId: { isOpen: boolean, data: any, options: {} } }
  },
  
  // Notifications et toasts
  notifications: {
    list: [],
    unreadCount: 0,
    lastChecked: null
  },
  
  // État de chargement global
  loading: {
    global: false,
    page: false,
    components: {} // { componentId: boolean }
  },
  
  // Configuration de la table/liste
  tables: {
    // Structure: { tableId: { pageSize: number, sortBy: string, sortOrder: 'asc'|'desc', filters: {} } }
  },
  
  // Filtres globaux
  filters: {
    dateRange: {
      start: null,
      end: null
    },
    restaurant: null,
    status: null
  },
  
  // Configuration des vues
  views: {
    dashboard: {
      layout: 'grid', // grid, list
      widgets: ['metrics', 'chart', 'activity', 'actions']
    },
    orders: {
      view: 'table', // table, kanban, calendar
      groupBy: 'status'
    },
    reservations: {
      view: 'calendar', // table, calendar, timeline
      defaultView: 'month'
    }
  },
  
  // État des formulaires
  forms: {
    // Structure: { formId: { isDirty: boolean, hasErrors: boolean, data: {} } }
  },
  
  // Breadcrumb et navigation
  breadcrumb: [
    { label: 'Dashboard', path: '/' }
  ],
  
  // Recherche globale
  search: {
    query: '',
    isActive: false,
    results: [],
    isLoading: false
  },
  
  // Paramètres d'affichage
  display: {
    showHelpTips: true,
    showAnimations: true,
    showNotifications: true,
    autoSave: true,
    compactMode: false
  },
  
  // État responsive
  responsive: {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'large' // small, medium, large
  },
  
  // Cache de l'interface
  cache: {
    lastRoute: '/',
    scrollPositions: {}, // { route: scrollY }
    tabStates: {} // { pageId: activeTabId }
  }
};

// ========================================
// 🏪 SLICE UI
// ========================================

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // === SIDEBAR ===
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },
    
    openSidebar: (state) => {
      state.sidebar.isOpen = true;
    },
    
    collapseSidebar: (state) => {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
    },
    
    setSidebarMobile: (state, action) => {
      state.sidebar.isMobile = action.payload;
      // Sur mobile, fermer la sidebar par défaut
      if (action.payload) {
        state.sidebar.isOpen = false;
      }
    },
    
    setActiveSection: (state, action) => {
      state.sidebar.activeSection = action.payload;
    },
    
    // === THÈME ===
    setTheme: (state, action) => {
      state.theme.mode = action.payload;
      localStorage.setItem('zengest_admin_theme', action.payload);
    },
    
    toggleTheme: (state) => {
      const newTheme = state.theme.mode === 'light' ? 'dark' : 'light';
      state.theme.mode = newTheme;
      localStorage.setItem('zengest_admin_theme', newTheme);
    },
    
    setPrimaryColor: (state, action) => {
      state.theme.primaryColor = action.payload;
    },
    
    setFontSize: (state, action) => {
      state.theme.fontSize = action.payload;
    },
    
    setDensity: (state, action) => {
      state.theme.density = action.payload;
    },
    
    // === MODALES ===
    openModal: (state, action) => {
      const { modalId, data = null, options = {} } = action.payload;
      state.modals[modalId] = {
        isOpen: true,
        data,
        options
      };
    },
    
    closeModal: (state, action) => {
      const modalId = action.payload;
      if (state.modals[modalId]) {
        state.modals[modalId].isOpen = false;
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modalId => {
        state.modals[modalId].isOpen = false;
      });
    },
    
    updateModalData: (state, action) => {
      const { modalId, data } = action.payload;
      if (state.modals[modalId]) {
        state.modals[modalId].data = data;
      }
    },
    
    // === NOTIFICATIONS ===
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      };
      state.notifications.list.unshift(notification);
      state.notifications.unreadCount += 1;
    },
    
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.list.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        state.notifications.unreadCount = Math.max(0, state.notifications.unreadCount - 1);
      }
    },
    
    markAllNotificationsAsRead: (state) => {
      state.notifications.list.forEach(notification => {
        notification.read = true;
      });
      state.notifications.unreadCount = 0;
      state.notifications.lastChecked = new Date().toISOString();
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const index = state.notifications.list.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        const notification = state.notifications.list[index];
        if (!notification.read) {
          state.notifications.unreadCount = Math.max(0, state.notifications.unreadCount - 1);
        }
        state.notifications.list.splice(index, 1);
      }
    },
    
    clearAllNotifications: (state) => {
      state.notifications.list = [];
      state.notifications.unreadCount = 0;
    },
    
    // === CHARGEMENT ===
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    
    setComponentLoading: (state, action) => {
      const { componentId, loading } = action.payload;
      state.loading.components[componentId] = loading;
    },
    
    // === TABLES ===
    setTableConfig: (state, action) => {
      const { tableId, config } = action.payload;
      state.tables[tableId] = {
        ...state.tables[tableId],
        ...config
      };
    },
    
    updateTableSort: (state, action) => {
      const { tableId, sortBy, sortOrder } = action.payload;
      if (!state.tables[tableId]) {
        state.tables[tableId] = {};
      }
      state.tables[tableId].sortBy = sortBy;
      state.tables[tableId].sortOrder = sortOrder;
    },
    
    updateTableFilters: (state, action) => {
      const { tableId, filters } = action.payload;
      if (!state.tables[tableId]) {
        state.tables[tableId] = {};
      }
      state.tables[tableId].filters = {
        ...state.tables[tableId].filters,
        ...filters
      };
    },
    
    // === FILTRES GLOBAUX ===
    setDateRange: (state, action) => {
      state.filters.dateRange = action.payload;
    },
    
    setRestaurantFilter: (state, action) => {
      state.filters.restaurant = action.payload;
    },
    
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    
    clearFilters: (state) => {
      state.filters = {
        dateRange: { start: null, end: null },
        restaurant: null,
        status: null
      };
    },
    
    // === VUES ===
    setDashboardLayout: (state, action) => {
      state.views.dashboard.layout = action.payload;
    },
    
    setDashboardWidgets: (state, action) => {
      state.views.dashboard.widgets = action.payload;
    },
    
    setOrdersView: (state, action) => {
      state.views.orders.view = action.payload;
    },
    
    setReservationsView: (state, action) => {
      state.views.reservations.view = action.payload;
    },
    
    // === FORMULAIRES ===
    setFormState: (state, action) => {
      const { formId, formState } = action.payload;
      state.forms[formId] = {
        ...state.forms[formId],
        ...formState
      };
    },
    
    markFormAsDirty: (state, action) => {
      const formId = action.payload;
      if (!state.forms[formId]) {
        state.forms[formId] = {};
      }
      state.forms[formId].isDirty = true;
    },
    
    markFormAsClean: (state, action) => {
      const formId = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].isDirty = false;
      }
    },
    
    // === BREADCRUMB ===
    setBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
    
    addToBreadcrumb: (state, action) => {
      state.breadcrumb.push(action.payload);
    },
    
    // === RECHERCHE GLOBALE ===
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },
    
    setSearchActive: (state, action) => {
      state.search.isActive = action.payload;
    },
    
    setSearchResults: (state, action) => {
      state.search.results = action.payload;
    },
    
    setSearchLoading: (state, action) => {
      state.search.isLoading = action.payload;
    },
    
    clearSearch: (state) => {
      state.search = {
        query: '',
        isActive: false,
        results: [],
        isLoading: false
      };
    },
    
    // === PARAMÈTRES D'AFFICHAGE ===
    toggleHelpTips: (state) => {
      state.display.showHelpTips = !state.display.showHelpTips;
    },
    
    toggleAnimations: (state) => {
      state.display.showAnimations = !state.display.showAnimations;
    },
    
    toggleNotifications: (state) => {
      state.display.showNotifications = !state.display.showNotifications;
    },
    
    toggleAutoSave: (state) => {
      state.display.autoSave = !state.display.autoSave;
    },
    
    toggleCompactMode: (state) => {
      state.display.compactMode = !state.display.compactMode;
    },
    
    // === RESPONSIVE ===
    setScreenSize: (state, action) => {
      const { width, height } = action.payload;
      state.responsive.isMobile = width < 768;
      state.responsive.isTablet = width >= 768 && width < 1024;
      state.responsive.isDesktop = width >= 1024;
      
      if (width < 768) {
        state.responsive.screenSize = 'small';
      } else if (width < 1024) {
        state.responsive.screenSize = 'medium';
      } else {
        state.responsive.screenSize = 'large';
      }
    },
    
    // === CACHE ===
    setLastRoute: (state, action) => {
      state.cache.lastRoute = action.payload;
    },
    
    setScrollPosition: (state, action) => {
      const { route, scrollY } = action.payload;
      state.cache.scrollPositions[route] = scrollY;
    },
    
    setTabState: (state, action) => {
      const { pageId, activeTabId } = action.payload;
      state.cache.tabStates[pageId] = activeTabId;
    },
    
    // === RESET ===
    resetUI: (state) => {
      // Garder seulement le thème et les préférences
      const { theme, display } = state;
      Object.assign(state, initialState, { theme, display });
    }
  }
});

// ========================================
// 🎯 SÉLECTEURS
// ========================================

export const selectUI = (state) => state.ui;
export const selectSidebar = (state) => state.ui.sidebar;
export const selectTheme = (state) => state.ui.theme;
export const selectModals = (state) => state.ui.modals;
export const selectNotifications = (state) => state.ui.notifications;
export const selectLoading = (state) => state.ui.loading;
export const selectTables = (state) => state.ui.tables;
export const selectFilters = (state) => state.ui.filters;
export const selectViews = (state) => state.ui.views;
export const selectForms = (state) => state.ui.forms;
export const selectBreadcrumb = (state) => state.ui.breadcrumb;
export const selectSearch = (state) => state.ui.search;
export const selectDisplay = (state) => state.ui.display;
export const selectResponsive = (state) => state.ui.responsive;
export const selectCache = (state) => state.ui.cache;

// Sélecteur pour une modale spécifique
export const selectModal = (modalId) => (state) => {
  return state.ui.modals[modalId] || { isOpen: false, data: null, options: {} };
};

// Sélecteur pour une table spécifique
export const selectTable = (tableId) => (state) => {
  return state.ui.tables[tableId] || {};
};

// Sélecteur pour un formulaire spécifique
export const selectForm = (formId) => (state) => {
  return state.ui.forms[formId] || {};
};

// Sélecteur pour le chargement d'un composant spécifique
export const selectComponentLoading = (componentId) => (state) => {
  return state.ui.loading.components[componentId] || false;
};

// ========================================
// 🎯 ACTIONS ET EXPORT
// ========================================

export const {
  // Sidebar
  toggleSidebar,
  closeSidebar,
  openSidebar,
  collapseSidebar,
  setSidebarMobile,
  setActiveSection,
  
  // Thème
  setTheme,
  toggleTheme,
  setPrimaryColor,
  setFontSize,
  setDensity,
  
  // Modales
  openModal,
  closeModal,
  closeAllModals,
  updateModalData,
  
  // Notifications
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
  
  // Chargement
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  
  // Tables
  setTableConfig,
  updateTableSort,
  updateTableFilters,
  
  // Filtres
  setDateRange,
  setRestaurantFilter,
  setStatusFilter,
  clearFilters,
  
  // Vues
  setDashboardLayout,
  setDashboardWidgets,
  setOrdersView,
  setReservationsView,
  
  // Formulaires
  setFormState,
  markFormAsDirty,
  markFormAsClean,
  
  // Breadcrumb
  setBreadcrumb,
  addToBreadcrumb,
  
  // Recherche
  setSearchQuery,
  setSearchActive,
  setSearchResults,
  setSearchLoading,
  clearSearch,
  
  // Affichage
  toggleHelpTips,
  toggleAnimations,
  toggleNotifications,
  toggleAutoSave,
  toggleCompactMode,
  
  // Responsive
  setScreenSize,
  
  // Cache
  setLastRoute,
  setScrollPosition,
  setTabState,
  
  // Reset
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;