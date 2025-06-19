import { createSlice } from '@reduxjs/toolkit';

// ========================================
// 🎨 ÉTAT INITIAL UI
// ========================================

const initialState = {
  // Sidebar
  sidebar: {
    isOpen: true,
    isCollapsed: false,
    isMobile: false,
    activeSection: 'dashboard'
  },
  
  // Thème et apparence
  theme: 'light',
  primaryColor: '#eb2f06',
  fontSize: 'normal',
  density: 'comfortable',
  
  // Modales
  modals: {},
  
  // Notifications
  notifications: [],
  
  // États de chargement
  loading: {
    global: false,
    page: false,
    components: {}
  },
  
  // Tables
  tables: {},
  
  // Filtres globaux
  filters: {
    dateRange: {
      start: null,
      end: null
    },
    restaurant: null,
    status: null
  },
  
  // Vues et layouts
  views: {
    dashboard: {
      layout: 'grid',
      widgets: ['stats', 'charts', 'recent-activity']
    },
    orders: {
      view: 'table',
      groupBy: 'status'
    },
    reservations: {
      view: 'calendar',
      timeFrame: 'week'
    }
  },
  
  // Formulaires
  forms: {},
  
  // Breadcrumb
  breadcrumb: [
    { label: 'Dashboard', path: '/' }
  ],
  
  // Recherche
  search: {
    query: '',
    isActive: false,
    results: [],
    loading: false
  },
  
  // Paramètres d'affichage
  display: {
    showHelpTips: true,
    showAnimations: true,
    showNotifications: true,
    autoSave: true,
    compactMode: false
  },
  
  // Responsive
  responsive: {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'desktop',
    orientation: 'landscape'
  },
  
  // Cache et état de session
  cache: {
    lastRoute: '/',
    scrollPositions: {},
    tabStates: {}
  },
  
  // Activité utilisateur
  activity: {
    lastActivity: null,
    sessionStart: null,
    isActive: true
  }
};

// ========================================
// 🎛️ SLICE UI
// ========================================

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ========================================
    // 📱 SIDEBAR
    // ========================================
    
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
    },
    
    setActiveSection: (state, action) => {
      state.sidebar.activeSection = action.payload;
    },
    
    // ========================================
    // 🎨 THÈME
    // ========================================
    
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    
    setDensity: (state, action) => {
      state.density = action.payload;
    },
    
    // ========================================
    // 🪟 MODALES
    // ========================================
    
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
        state.modals[modalId].data = { ...state.modals[modalId].data, ...data };
      }
    },
    
    // ========================================
    // 🔔 NOTIFICATIONS
    // ========================================
    
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      };
      state.notifications.unshift(notification);
      
      // Limiter à 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },
    
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },
    
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // ========================================
    // ⏳ CHARGEMENT
    // ========================================
    
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
    
    // ========================================
    // 📊 TABLES
    // ========================================
    
    setTableConfig: (state, action) => {
      const { tableId, config } = action.payload;
      state.tables[tableId] = { ...state.tables[tableId], ...config };
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
      state.tables[tableId].filters = { ...state.tables[tableId].filters, ...filters };
    },
    
    // ========================================
    // 🔍 FILTRES
    // ========================================
    
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
      state.filters = initialState.filters;
    },
    
    // ========================================
    // 🎛️ VUES
    // ========================================
    
    setDashboardLayout: (state, action) => {
      state.views.dashboard.layout = action.payload;
    },
    
    setDashboardWidgets: (state, action) => {
      state.views.dashboard.widgets = action.payload;
    },
    
    setOrdersView: (state, action) => {
      state.views.orders = { ...state.views.orders, ...action.payload };
    },
    
    setReservationsView: (state, action) => {
      state.views.reservations = { ...state.views.reservations, ...action.payload };
    },
    
    // ========================================
    // 📝 FORMULAIRES
    // ========================================
    
    setFormState: (state, action) => {
      const { formId, formState } = action.payload;
      state.forms[formId] = { ...state.forms[formId], ...formState };
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
    
    // ========================================
    // 🍞 BREADCRUMB
    // ========================================
    
    setBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
    
    addToBreadcrumb: (state, action) => {
      state.breadcrumb.push(action.payload);
    },
    
    // ========================================
    // 🔍 RECHERCHE
    // ========================================
    
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
      state.search.loading = action.payload;
    },
    
    clearSearch: (state) => {
      state.search = initialState.search;
    },
    
    // ========================================
    // 🎮 AFFICHAGE
    // ========================================
    
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
    
    // ========================================
    // 📱 RESPONSIVE
    // ========================================
    
    setScreenSize: (state, action) => {
      const { width, height } = action.payload;
      state.responsive.isMobile = width < 768;
      state.responsive.isTablet = width >= 768 && width < 1024;
      state.responsive.isDesktop = width >= 1024;
      state.responsive.screenSize = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
      state.responsive.orientation = width > height ? 'landscape' : 'portrait';
    },
    
    // ========================================
    // 💾 CACHE
    // ========================================
    
    setLastRoute: (state, action) => {
      state.cache.lastRoute = action.payload;
    },
    
    setScrollPosition: (state, action) => {
      const { route, position } = action.payload;
      state.cache.scrollPositions[route] = position;
    },
    
    setTabState: (state, action) => {
      const { tabId, tabState } = action.payload;
      state.cache.tabStates[tabId] = tabState;
    },
    
    // ========================================
    // 👤 ACTIVITÉ UTILISATEUR
    // ========================================
    
    updateLastActivity: (state) => {
      state.activity.lastActivity = new Date().toISOString();
      state.activity.isActive = true;
    },
    
    setSessionStart: (state) => {
      state.activity.sessionStart = new Date().toISOString();
    },
    
    setUserInactive: (state) => {
      state.activity.isActive = false;
    },
    
    // ========================================
    // 🔄 RESET
    // ========================================
    
    resetUI: (state) => {
      // Garder certains états lors du reset
      const { theme, primaryColor, fontSize, density } = state;
      Object.assign(state, initialState);
      state.theme = theme;
      state.primaryColor = primaryColor;
      state.fontSize = fontSize;
      state.density = density;
    }
  },
});

// ========================================
// 🎯 SÉLECTEURS
// ========================================

export const selectSidebar = (state) => state.ui.sidebar;
export const selectTheme = (state) => state.ui.theme;
export const selectNotifications = (state) => state.ui.notifications;
export const selectLoading = (state) => state.ui.loading;
export const selectSearch = (state) => state.ui.search;
export const selectDisplay = (state) => state.ui.display;
export const selectResponsive = (state) => state.ui.responsive;
export const selectCache = (state) => state.ui.cache;
export const selectActivity = (state) => state.ui.activity;

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
  
  // Activité
  updateLastActivity,
  setSessionStart,
  setUserInactive,
  
  // Reset
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;