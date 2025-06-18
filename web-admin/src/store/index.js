import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import des reducers
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import menuReducer from './slices/menuSlice'; // NOUVEAU

// Configuration de la persistance
const persistConfig = {
  key: 'zengest-admin',
  storage,
  whitelist: ['auth', 'ui'], // Slices à persister
  blacklist: ['menu'] // Les données menu ne sont pas persistées (trop volumineuses)
};

// Combinaison des reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  menu: menuReducer, // NOUVEAU
  // À ajouter plus tard :
  // orders: ordersReducer,
  // tables: tablesReducer,
  // reservations: reservationsReducer,
  // analytics: analyticsReducer,
});

// Reducer persisté
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.MODE === 'development',
});

// Persistor pour Redux Persist
export const persistor = persistStore(store);

// Types TypeScript (si utilisé plus tard)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;