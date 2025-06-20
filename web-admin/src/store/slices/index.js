// web-admin/src/store/slices/index.js
// Export centralisé de tous les slices et leurs actions/sélecteurs

// Auth
export {
  default as authReducer,
  login as loginUser,
  logout as logoutUser,
  verifyToken,
  updateProfile,
  setInitialized,
  restoreSession,
  clearError,
  updateUser,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectIsInitialized,
  selectUserRole,
  selectUserPermissions,
  selectIsAdmin,
  selectIsOwner,
  selectIsManager,
  selectIsStaff
} from './authSlice';

// UI
export {
  default as uiReducer,
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
  // Notifications
  addNotification as showNotification,
  removeNotification as hideNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
  // Chargement
  setGlobalLoading as setLoading,
  setPageLoading,
  setComponentLoading,
  // Modales
  openModal,
  closeModal,
  closeAllModals,
  updateModalData,
  // Recherche
  setSearchQuery,
  setSearchActive,
  setSearchResults,
  setSearchLoading,
  clearSearch,
  // Responsive
  setScreenSize,
  // Cache et activité
  setLastRoute,
  updateLastActivity,
  setUserActivity,
  setScrollPosition,
  setTabState,
  // Autres
  setBreadcrumb,
  addToBreadcrumb,
  clearFilters,
  resetUI,
  // Sélecteurs
  selectSidebar,
  selectTheme,
  selectNotifications,
  selectLoading,
  selectResponsive,
  selectModals,
  selectSearch,
  selectBreadcrumb,
  selectCache,
  selectDisplay,
  selectViews,
  selectFilters,
  selectTables,
  selectForms
} from './uiSlice';

// Menu
export {
  default as menuReducer,
  fetchMenuItems,
  fetchMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
  fetchMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  fetchDailySpecials,
  createDailySpecial,
  approveDailySpecial,
  rejectDailySpecial,
  setFilters as setMenuFilters,
  clearFilters as clearMenuFilters,
  selectMenuItems,
  selectCurrentMenuItem,
  selectMenuLoading,
  selectMenuError,
  selectMenuPagination,
  selectMenuCategories,
  selectDailySpecials,
  selectFeaturedMenuItems,
  selectAvailableMenuItems
} from './menuSlice';

// Reservations

export {
  default as reservationReducer,
  // Actions asynchrones
  fetchReservations,
  fetchReservationById,
  createReservation,
  updateReservation,
  updateReservationStatus,
  deleteReservation,
  assignTableToReservation,
  fetchTodayReservations,
  fetchUpcomingReservations,
  searchAvailableSlots,
  // Actions synchrones
  setFilters as setReservationFilters,
  clearFilters as clearReservationFilters,
  setSelectedDate,
  setCurrentReservation,
  clearCurrentReservation,
  clearErrors as clearReservationErrors,
  optimisticUpdateStatus,
  optimisticDelete as optimisticDeleteReservation,
  updateStats as updateReservationStats,
  resetReservationState,
  // Sélecteurs de base
  selectReservations,
  selectCurrentReservation,
  selectTodayReservations,
  selectUpcomingReservations,
  // Sélecteurs de chargement
  selectReservationsLoading,
  selectReservationLoading,
  selectTodayLoading,
  selectUpcomingLoading,
  // Sélecteurs d'erreurs
  selectReservationsError,
  selectReservationError,
  selectTodayError,
  selectUpcomingError,
  // Sélecteurs de métadonnées
  selectReservationsPagination,
  selectReservationsFilters,
  selectReservationsStats,
  selectSelectedDate,
  selectLastFetch as selectReservationsLastFetch,
  // Sélecteurs composés
  selectPendingReservations,
  selectConfirmedReservations,
  selectSeatedReservations,
  selectActiveReservations,
  selectReservationsByDate,
  selectReservationById,
  selectReservationsCount,
  selectTodayReservationsCount,
  selectUpcomingReservationsCount
} from './reservationSlice';
