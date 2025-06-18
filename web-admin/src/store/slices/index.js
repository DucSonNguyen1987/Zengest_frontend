// Export centralisé de tous les slices et leurs actions/sélecteurs

// Auth
export {
  default as authReducer,
  loginUser,
  logoutUser,
  verifyToken,
  updateProfile,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectIsInitialized
} from './authSlice';

// UI
export {
  default as uiReducer,
  toggleSidebar,
  setTheme,
  showNotification,
  hideNotification,
  setLoading,
  clearLoading,
  selectSidebar,
  selectTheme,
  selectNotifications,
  selectLoading,
  selectResponsive
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