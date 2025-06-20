// ========================================
// 🏪 STORE/INDEX.JS - CONFIGURATION REDUX MISE À JOUR
// ========================================
// Fichier: web-admin/src/store/index.js
//
// Configuration du store Redux avec tous les slices
// incluant le nouveau reservationSlice

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import menuReducer from './slices/menuSlice';
import reservationReducer from './slices/reservationSlice';
//import ordersReducer from './slices/ordersSlice';
//import tablesReducer from './slices/tablesSlice';

// ========================================
// 🔧 CONFIGURATION REDUX PERSIST
// ========================================

const persistConfig = {
  key: 'zengest-admin',
  storage,
  whitelist: [], // Pas de persistance automatique pour éviter les conflits
  blacklist: ['auth', 'ui', 'menu', 'reservations'] // Gérer manuellement l'auth via localStorage
};

// ========================================
// 🏗️ COMBINAISON DES REDUCERS
// ========================================

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  menu: menuReducer,
  reservations: reservationReducer,
  //orders: ordersReducer,
  //tables: tablesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ========================================
// 📊 MIDDLEWARE DE DEBUG
// ========================================

const actionDebugMiddleware = (store) => (next) => (action) => {
  // Logger uniquement les actions importantes pour éviter le spam
  const importantActions = [
    'auth/login',
    'auth/logout', 
    'auth/verifyToken',
    'ui/toggleSidebar',
    'menu/fetchMenuItems',
    'reservations/fetchReservations',
    'reservations/createReservation', 
    'reservations/updateReservationStatus', 
    //'orders/fetchOrders',
    //'tables/fetchTables'
  ];
  
  const actionType = action.type;
  const isImportant = importantActions.some(type => actionType.includes(type));
  
  if (isImportant || process.env.NODE_ENV === 'development') {
    console.log('🔄 REDUX ACTION:', actionType, action.payload || '(no payload)');
  }
  
  return next(action);
};

// ========================================
// 🏪 CONFIGURATION DU STORE
// ========================================

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/STOP'
        ],
        ignoredPaths: ['_persist']
      },
      immutableCheck: {
        ignoredPaths: ['_persist']
      }
    }).concat(actionDebugMiddleware),
  devTools: process.env.NODE_ENV !== 'production' && {
    name: 'Zengest Admin Store',
    trace: true,
    traceLimit: 25
  }
});

export const persistor = persistStore(store);

// ========================================
// 🔧 CONFIGURATION FINALE
// ========================================

// Log de la configuration du store
console.log('🔧 Redux Store configuré avec:');
console.log('  - Auth Slice: ✅');
console.log('  - UI Slice: ✅');
console.log('  - Menu Slice: ✅');
console.log('  - Reservations Slice: ✅'); 
//console.log('  - Orders Slice: ✅');
//console.log('  - Tables Slice: ✅');
console.log('  - Persistance: ✅ (configuration minimale)');
console.log('  - DevTools: ✅');
console.log('  - Action Debug Middleware: ✅');

// Validation de l'état initial
const initialState = store.getState();
const hasRequiredSlices = ['auth', 'ui', 'menu', 'reservations'].every(slice => 
  initialState.hasOwnProperty(slice)
);

if (hasRequiredSlices) {
  console.log('✅ Store initial OK:', {
    auth: !!initialState.auth,
    ui: !!initialState.ui,
    menu: !!initialState.menu,
    reservations: !!initialState.reservations, 
    //orders: !!initialState.orders,
   // tables: !!initialState.tables
  });
} else {
  console.error('❌ Configuration du store incomplète:', Object.keys(initialState));
}

// ========================================
// 📤 EXPORTS
// ========================================

export default store;

// ========================================
// 🔍 UTILITAIRES DE DEBUG
// ========================================

// Fonction pour inspecter l'état du store
export const debugStore = () => {
  if (process.env.NODE_ENV === 'development') {
    const state = store.getState();
    console.group('🔍 Debug Store State');
    console.log('Auth:', state.auth);
    console.log('UI:', state.ui);
    console.log('Menu:', state.menu);
    console.log('Reservations:', state.reservations); 
    //console.log('Orders:', state.orders);
    //console.log('Tables:', state.tables);
    console.groupEnd();
  }
};

// Exposer pour le debug en développement
if (process.env.NODE_ENV === 'development') {
  window.__ZENGEST_STORE__ = store;
  window.__DEBUG_STORE__ = debugStore;
}

// ========================================
// 🚀 INITIALISATION DIFFÉRÉE
// ========================================

// Actions d'initialisation à exécuter après le montage de l'app
export const initializeStore = () => {
  console.log('🚀 Initialisation du store Redux');
  
  // Restaurer la session auth si token présent
  const token = localStorage.getItem('zengest_admin_token');
  if (token) {
    console.log('🔐 Token trouvé, restauration de la session...');
    store.dispatch({ type: 'auth/restoreSession' });
  }
  
  console.log('✅ Store initialisé avec succès');
};

// ========================================
// 🧹 NETTOYAGE ET RESET
// ========================================

// Fonction pour réinitialiser le store (logout, tests, etc.)
export const resetStore = () => {
  console.log('🧹 Réinitialisation du store');
  
  // Nettoyer le localStorage
  localStorage.removeItem('zengest_admin_token');
  localStorage.removeItem('zengest_admin_user');
  
  // Dispatcher les actions de reset
  store.dispatch({ type: 'auth/resetAuthState' });
  store.dispatch({ type: 'ui/resetUI' });
  store.dispatch({ type: 'reservations/resetReservationState' }); 
  
  console.log('✅ Store réinitialisé');
};