// web-admin/src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Configuration API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ========================================
// 🔐 ACTIONS ASYNCHRONES
// ========================================

// Connexion utilisateur
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('🔑 Tentative de connexion:', credentials.email);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      if (!data.success) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      console.log('✅ Connexion réussie:', data.data.user.email);

      // Stocker les données d'authentification
      localStorage.setItem('zengest_admin_token', data.data.token);
      localStorage.setItem('zengest_admin_user', JSON.stringify(data.data.user));

      return {
        user: data.data.user,
        token: data.data.token,
        permissions: data.data.permissions,
        restaurant: data.data.restaurant
      };
    } catch (error) {
      console.error('❌ Erreur connexion:', error.message);
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

// Vérification du token
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (token, { rejectWithValue }) => {
    try {
      console.log('🔍 Vérification du token...');
      
      // Utiliser le token fourni ou récupérer depuis le localStorage
      const authToken = token || localStorage.getItem('zengest_admin_token');
      
      if (!authToken) {
        throw new Error('Aucun token trouvé');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        // Token invalide ou expiré
        localStorage.removeItem('zengest_admin_token');
        localStorage.removeItem('zengest_admin_user');
        throw new Error(data.message || 'Token invalide');
      }

      if (!data.success) {
        throw new Error(data.message || 'Échec de la vérification');
      }

      console.log('✅ Token valide pour:', data.data.user.email);

      return {
        user: data.data.user,
        permissions: data.data.permissions,
        restaurant: data.data.restaurant
      };
    } catch (error) {
      console.error('❌ Erreur vérification token:', error.message);
      
      // Nettoyer le localStorage en cas d'erreur
      localStorage.removeItem('zengest_admin_token');
      localStorage.removeItem('zengest_admin_user');
      
      return rejectWithValue(error.message || 'Token invalide');
    }
  }
);

// Déconnexion
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🚪 Déconnexion...');
      
      const token = localStorage.getItem('zengest_admin_token');
      
      if (token) {
        // Appeler l'API de déconnexion
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      // Nettoyer le localStorage
      localStorage.removeItem('zengest_admin_token');
      localStorage.removeItem('zengest_admin_user');
      
      console.log('✅ Déconnexion réussie');
      
      return null;
    } catch (error) {
      console.warn('⚠️ Erreur lors de la déconnexion:', error.message);
      
      // Même en cas d'erreur, nettoyer le localStorage
      localStorage.removeItem('zengest_admin_token');
      localStorage.removeItem('zengest_admin_user');
      
      return null; // Ne pas rejeter, la déconnexion locale est réussie
    }
  }
);

// Mise à jour du profil
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token manquant');
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur mise à jour profil');
      }

      console.log('✅ Profil mis à jour');
      
      // Mettre à jour le localStorage
      localStorage.setItem('zengest_admin_user', JSON.stringify(data.data.user));

      return data.data.user;
    } catch (error) {
      console.error('❌ Erreur mise à jour profil:', error.message);
      return rejectWithValue(error.message || 'Erreur mise à jour profil');
    }
  }
);

// ========================================
// 🏪 SLICE REDUX
// ========================================

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    permissions: [],
    restaurant: null,
    isAuthenticated: false,
    isInitialized: false,
    loading: false,
    error: null
  },
  reducers: {
    // Restaurer la session depuis le localStorage
    restoreSession: (state) => {
      try {
        const token = localStorage.getItem('zengest_admin_token');
        const user = localStorage.getItem('zengest_admin_user');
        
        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
          console.log('🔄 Session restaurée pour:', state.user.email);
        } else {
          console.log('🔄 Aucune session à restaurer');
        }
      } catch (error) {
        console.error('❌ Erreur restauration session:', error);
        // En cas d'erreur, nettoyer
        localStorage.removeItem('zengest_admin_token');
        localStorage.removeItem('zengest_admin_user');
      }
      
      state.isInitialized = true;
    },
    
    // Marquer comme initialisé
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    
    // Effacer les erreurs
    clearError: (state) => {
      state.error = null;
    },
    
    // Réinitialiser l'état (pour les tests)
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.permissions = [];
      state.restaurant = null;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('zengest_admin_token');
      localStorage.removeItem('zengest_admin_user');
    }
  },
  extraReducers: (builder) => {
    builder
      // ===== CONNEXION =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permissions = action.payload.permissions || [];
        state.restaurant = action.payload.restaurant;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
        
        console.log('📦 État auth mis à jour après connexion');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      
      // ===== VÉRIFICATION TOKEN =====
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions || [];
        state.restaurant = action.payload.restaurant;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
        
        console.log('📦 État auth mis à jour après vérification token');
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.permissions = [];
        state.restaurant = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
        state.error = action.payload;
      })
      
      // ===== DÉCONNEXION =====
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.permissions = [];
        state.restaurant = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        
        console.log('📦 État auth réinitialisé après déconnexion');
      })
      
      // ===== MISE À JOUR PROFIL =====
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

// ========================================
// 🔗 ACTIONS ET SÉLECTEURS
// ========================================

export const { 
  restoreSession, 
  setInitialized, 
  clearError, 
  resetAuthState 
} = authSlice.actions;

// Sélecteurs
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectUserPermissions = (state) => state.auth.permissions;
export const selectUserRestaurant = (state) => state.auth.restaurant;

// Sélecteurs composés
export const selectIsLoading = (state) => state.auth.loading;
export const selectHasRole = (role) => (state) => state.auth.user?.role === role;
export const selectHasPermission = (permission) => (state) => 
  state.auth.permissions?.includes(permission) || state.auth.user?.role === 'admin';

export default authSlice.reducer;