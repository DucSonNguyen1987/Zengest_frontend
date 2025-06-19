import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action de connexion simplifiée
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('🔐 Connexion avec:', credentials.email);
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // Sauvegarder le token
      if (data.data.token) {
        localStorage.setItem('zengest_admin_token', data.data.token);
        localStorage.setItem('zengest_admin_user', JSON.stringify(data.data.user));
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux minimal
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('zengest_admin_token');
      localStorage.removeItem('zengest_admin_user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

// Sélecteurs
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;