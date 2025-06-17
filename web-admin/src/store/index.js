// web-admin/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';

// Import des slices (seulement ceux qui existent)
import authSlice from './slices/authSlice';

// Configuration du store simplifié
export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

