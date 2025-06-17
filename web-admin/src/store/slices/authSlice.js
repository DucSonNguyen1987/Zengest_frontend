import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions asynchrones avec API mockée
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // API mockée pour test
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@zengest.com' && credentials.password === 'admin') {
        return {
          user: { id: 1, email: 'admin@zengest.com', role: 'admin', name: 'Admin' },
          token: 'fake-jwt-token'
        };
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (token, { rejectWithValue }) => {
    try {
      // Vérification mockée
      if (token === 'fake-jwt-token') {
        return {
          user: { id: 1, email: 'admin@zengest.com', role: 'admin', name: 'Admin' }
        };
      } else {
        throw new Error('Token invalide');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Token invalide');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
    loading: false,
    error: null
  },
  reducers: {
    restoreSession: (state) => {
      const token = localStorage.getItem('zengest_admin_token');
      const user = localStorage.getItem('zengest_admin_user');
      
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
      state.isInitialized = true;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
        
        localStorage.setItem('zengest_admin_token', action.payload.token);
        localStorage.setItem('zengest_admin_user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
        localStorage.removeItem('zengest_admin_token');
        localStorage.removeItem('zengest_admin_user');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem('zengest_admin_token');
        localStorage.removeItem('zengest_admin_user');
      });
  }
});

export const { restoreSession, setInitialized, clearError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.user?.role;

export default authSlice.reducer;
