// Hooks Redux typés et personnalisés

import { useDispatch, useSelector } from 'react-redux';



// Hooks personnalisés pour les slices

/**
 * Hook pour les données menu
 */
export const useMenuData = () => {
  const dispatch = useAppDispatch();
  
  const items = useAppSelector(selectMenuItems);
  const categories = useAppSelector(selectMenuCategories);
  const dailySpecials = useAppSelector(selectDailySpecials);
  const loading = useAppSelector(selectMenuLoading);
  const error = useAppSelector(selectMenuError);
  const pagination = useAppSelector(selectMenuPagination);
  
  return {
    items,
    categories,
    dailySpecials,
    loading,
    error,
    pagination,
    // Actions
    fetchItems: (params) => dispatch(fetchMenuItems(params)),
    createItem: (data) => dispatch(createMenuItem(data)),
    updateItem: (id, data) => dispatch(updateMenuItem({ id, data })),
    deleteItem: (id) => dispatch(deleteMenuItem(id)),
    fetchCategories: () => dispatch(fetchMenuCategories()),
    fetchSpecials: (params) => dispatch(fetchDailySpecials(params))
  };
};

/**
 * Hook pour l'authentification
 */
export const useAuthData = () => {
  const dispatch = useAppDispatch();
  
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isInitialized = useAppSelector(selectIsInitialized);
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
    isInitialized,
    // Actions
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    verify: () => dispatch(verifyToken())
  };
};

/**
 * Hook pour les notifications
 */
export const useNotifications = () => {
  const dispatch = useAppDispatch();
  
  const notifications = useAppSelector(selectNotifications);
  
  return {
    notifications,
    // Actions
    showSuccess: (message) => dispatch(showNotification({ type: 'success', message })),
    showError: (message) => dispatch(showNotification({ type: 'error', message })),
    showWarning: (message) => dispatch(showNotification({ type: 'warning', message })),
    showInfo: (message) => dispatch(showNotification({ type: 'info', message })),
    hide: (id) => dispatch(hideNotification(id))
  };
};