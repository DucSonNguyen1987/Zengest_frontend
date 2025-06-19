// web-admin/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import menuReducer from './slices/menuSlice';

// ========================================
// 🔧 CONFIGURATION REDUX PERSIST
// ========================================

const persistConfig = {
  key: 'zengest-admin',
  storage,
  whitelist: [], // Pas de persistance automatique pour éviter les conflits
  blacklist: ['auth', 'ui', 'menu'] // Gérer manuellement l'auth via localStorage
};

// ========================================
// 🏗️ COMBINAISON DES REDUCERS
// ========================================

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  menu: menuReducer
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
    'menu/fetchMenuItems'
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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['_persist']
      },
      immutableCheck: {
        // Ignorer les chemins qui peuvent contenir des objets non-sérialisables
        ignoredPaths: ['_persist']
      }
    }).concat(actionDebugMiddleware),
  devTools: process.env.NODE_ENV === 'development' && {
    trace: true,
    traceLimit: 25,
    name: 'Zengest Admin Store'
  }
});

export const persistor = persistStore(store);

// ========================================
// 🧪 TESTS ET DEBUG
// ========================================

if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Redux Store configuré avec:');
  console.log('  - Auth Slice: ✅');
  console.log('  - UI Slice: ✅');
  console.log('  - Menu Slice: ✅');
  console.log('  - Persistance: ✅ (configuration minimale)');
  console.log('  - DevTools: ✅');
  console.log('  - Action Debug Middleware: ✅');
  
  // Test du store
  try {
    const state = store.getState();
    console.log('✅ Store initial OK:', {
      auth: !!state.auth,
      ui: !!state.ui,
      menu: !!state.menu
    });
  } catch (error) {
    console.error('❌ Erreur initialisation store:', error);
  }
}

// ========================================
// 📱 HOT RELOAD POUR DÉVELOPPEMENT (VITE)
// ========================================

if (import.meta.hot) {
  import.meta.hot.accept('./slices/authSlice.js', (newModule) => {
    if (newModule) {
      store.replaceReducer(combineReducers({
        auth: newModule.default,
        ui: uiReducer,
        menu: menuReducer
      }));
    }
  });
}

export default store;