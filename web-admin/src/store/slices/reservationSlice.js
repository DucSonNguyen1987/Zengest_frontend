// ========================================
// 📅 RESERVATION-SLICE.JS - SLICE REDUX POUR LES RÉSERVATIONS
// ========================================
// Fichier: web-admin/src/store/slices/reservationSlice.js
//
// Gestion de l'état Redux pour les réservations avec actions asynchrones,
// filtres, pagination et gestion des erreurs.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Services API
import { reservationService } from '@/services/api/reservationService';

// Constantes
import { RESERVATION_STATUS } from '../../../../shared/constants/constants';

// ========================================
// 🔧 CONFIGURATION API
// ========================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ========================================
// 📊 ÉTAT INITIAL
// ========================================

const initialState = {
  // Données principales
  reservations: [],
  currentReservation: null,
  upcomingReservations: [],
  todayReservations: [],
  
  // États de chargement
  loading: false,
  reservationsLoading: false,
  upcomingLoading: false,
  todayLoading: false,
  
  // Erreurs
  error: null,
  reservationsError: null,
  upcomingError: null,
  todayError: null,
  
  // Pagination
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
    hasNextPage: false,
    hasPrevPage: false
  },
  
  // Filtres
  filters: {
    search: '',
    status: '',
    date: '',
    timeSlot: '',
    guests: '',
    table: '',
    customerName: '',
    dateFrom: '',
    dateTo: ''
  },
  
  // Statistiques
  stats: {
    total: 0,
    pending: 0,
    confirmed: 0,
    seated: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0
  },
  
  // Métadonnées
  lastFetch: null,
  selectedDate: new Date().toISOString().split('T')[0]
};

// ========================================
// 🔄 ACTIONS ASYNCHRONES
// ========================================

/**
 * Récupérer toutes les réservations avec filtres et pagination
 */
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (params = {}, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      // Paramètres par défaut
      const defaultParams = {
        page: 1,
        limit: 20,
        sortBy: 'date',
        sortOrder: 'desc'
      };

      const queryParams = { ...defaultParams, ...params };

      const response = await fetch(`${API_BASE_URL}/reservations?${new URLSearchParams(queryParams)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des réservations');
      }

      console.log('✅ Réservations récupérées:', data.data?.reservations?.length || 0);

      return {
        reservations: data.data.reservations || [],
        pagination: data.data.pagination || {},
        stats: data.data.stats || {}
      };
    } catch (error) {
      console.error('❌ Erreur fetchReservations:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer une réservation par ID
 */
export const fetchReservationById = createAsyncThunk(
  'reservations/fetchReservationById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération de la réservation');
      }

      console.log('✅ Réservation récupérée:', data.data.reservation._id);

      return data.data.reservation;
    } catch (error) {
      console.error('❌ Erreur fetchReservationById:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Créer une nouvelle réservation
 */
export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création de la réservation');
      }

      console.log('✅ Réservation créée:', data.data.reservation._id);

      return data.data.reservation;
    } catch (error) {
      console.error('❌ Erreur createReservation:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Mettre à jour une réservation
 */
export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async ({ id, data: updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour de la réservation');
      }

      console.log('✅ Réservation mise à jour:', data.data.reservation._id);

      return data.data.reservation;
    } catch (error) {
      console.error('❌ Erreur updateReservation:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Mettre à jour le statut d'une réservation
 */
export const updateReservationStatus = createAsyncThunk(
  'reservations/updateReservationStatus',
  async ({ id, status, notes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du statut');
      }

      console.log('✅ Statut réservation mis à jour:', id, '→', status);

      return { id, status, reservation: data.data.reservation };
    } catch (error) {
      console.error('❌ Erreur updateReservationStatus:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Supprimer une réservation
 */
export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression de la réservation');
      }

      console.log('✅ Réservation supprimée:', id);

      return id;
    } catch (error) {
      console.error('❌ Erreur deleteReservation:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Assigner une table à une réservation
 */
export const assignTableToReservation = createAsyncThunk(
  'reservations/assignTableToReservation',
  async ({ reservationId, tableId, floorPlanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/assign-table`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          tableId, 
          floorPlanId,
          tableNumber: tableId // Compatibility
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'assignation de la table');
      }

      console.log('✅ Table assignée à la réservation:', reservationId, '→', tableId);

      return data.data.reservation;
    } catch (error) {
      console.error('❌ Erreur assignTableToReservation:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer les réservations du jour
 */
export const fetchTodayReservations = createAsyncThunk(
  'reservations/fetchTodayReservations',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const today = new Date().toISOString().split('T')[0];

      const response = await fetch(`${API_BASE_URL}/reservations/today?date=${today}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des réservations du jour');
      }

      console.log('✅ Réservations du jour récupérées:', data.data?.reservations?.length || 0);

      return data.data.reservations || [];
    } catch (error) {
      console.error('❌ Erreur fetchTodayReservations:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer les prochaines réservations
 */
export const fetchUpcomingReservations = createAsyncThunk(
  'reservations/fetchUpcomingReservations',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/upcoming?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des prochaines réservations');
      }

      console.log('✅ Prochaines réservations récupérées:', data.data?.reservations?.length || 0);

      return data.data.reservations || [];
    } catch (error) {
      console.error('❌ Erreur fetchUpcomingReservations:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Rechercher des créneaux disponibles
 */
export const searchAvailableSlots = createAsyncThunk(
  'reservations/searchAvailableSlots',
  async ({ date, guests, duration = 120 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('zengest_admin_token');
      
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const params = new URLSearchParams({
        date,
        guests: guests.toString(),
        duration: duration.toString()
      });

      const response = await fetch(`${API_BASE_URL}/reservations/availability?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la recherche de créneaux');
      }

      console.log('✅ Créneaux disponibles trouvés:', data.data?.slots?.length || 0);

      return data.data.slots || [];
    } catch (error) {
      console.error('❌ Erreur searchAvailableSlots:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// 🏪 SLICE PRINCIPAL
// ========================================

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    // Actions synchrones pour les filtres
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    
    setCurrentReservation: (state, action) => {
      state.currentReservation = action.payload;
    },
    
    clearCurrentReservation: (state) => {
      state.currentReservation = null;
    },
    
    clearErrors: (state) => {
      state.error = null;
      state.reservationsError = null;
      state.upcomingError = null;
      state.todayError = null;
    },
    
    // Mise à jour optimiste du statut
    optimisticUpdateStatus: (state, action) => {
      const { id, status } = action.payload;
      
      // Mettre à jour dans la liste principale
      const reservation = state.reservations.find(r => r._id === id);
      if (reservation) {
        reservation.status = status;
      }
      
      // Mettre à jour dans les listes spécialisées
      const todayReservation = state.todayReservations.find(r => r._id === id);
      if (todayReservation) {
        todayReservation.status = status;
      }
      
      const upcomingReservation = state.upcomingReservations.find(r => r._id === id);
      if (upcomingReservation) {
        upcomingReservation.status = status;
      }
      
      // Mettre à jour la réservation courante
      if (state.currentReservation?._id === id) {
        state.currentReservation.status = status;
      }
    },
    
    // Suppression optimiste
    optimisticDelete: (state, action) => {
      const id = action.payload;
      state.reservations = state.reservations.filter(r => r._id !== id);
      state.todayReservations = state.todayReservations.filter(r => r._id !== id);
      state.upcomingReservations = state.upcomingReservations.filter(r => r._id !== id);
      
      if (state.currentReservation?._id === id) {
        state.currentReservation = null;
      }
    },
    
    // Mise à jour des statistiques
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    
    // Reset de l'état
    resetReservationState: (state) => {
      return { ...initialState, selectedDate: state.selectedDate };
    }
  },
  
  extraReducers: (builder) => {
    // ========================================
    // 📋 RÉCUPÉRATION DES RÉSERVATIONS
    // ========================================
    
    // Fetch reservations
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.reservationsLoading = true;
        state.reservationsError = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservationsLoading = false;
        state.reservations = action.payload.reservations;
        state.pagination = action.payload.pagination;
        state.stats = action.payload.stats;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.reservationsLoading = false;
        state.reservationsError = action.payload;
      });
    
    // Fetch reservation by ID
    builder
      .addCase(fetchReservationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReservation = action.payload;
      })
      .addCase(fetchReservationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // ========================================
    // ➕ CRÉATION DE RÉSERVATION
    // ========================================
    
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.unshift(action.payload);
        state.stats.total += 1;
        
        // Ajouter aux listes spécialisées si applicable
        const reservationDate = new Date(action.payload.date).toDateString();
        const today = new Date().toDateString();
        
        if (reservationDate === today) {
          state.todayReservations.unshift(action.payload);
        }
        
        if (new Date(action.payload.date) > new Date()) {
          state.upcomingReservations.unshift(action.payload);
        }
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // ========================================
    // ✏️ MISE À JOUR DE RÉSERVATION
    // ========================================
    
    builder
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        
        const updatedReservation = action.payload;
        const id = updatedReservation._id;
        
        // Mettre à jour dans toutes les listes
        const updateInList = (list) => {
          const index = list.findIndex(r => r._id === id);
          if (index !== -1) {
            list[index] = updatedReservation;
          }
        };
        
        updateInList(state.reservations);
        updateInList(state.todayReservations);
        updateInList(state.upcomingReservations);
        
        // Mettre à jour la réservation courante
        if (state.currentReservation?._id === id) {
          state.currentReservation = updatedReservation;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // ========================================
    // 🔄 MISE À JOUR DU STATUT
    // ========================================
    
    builder
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const { id, reservation } = action.payload;
        
        // Mettre à jour dans toutes les listes
        const updateInList = (list) => {
          const index = list.findIndex(r => r._id === id);
          if (index !== -1) {
            list[index] = reservation;
          }
        };
        
        updateInList(state.reservations);
        updateInList(state.todayReservations);
        updateInList(state.upcomingReservations);
        
        // Mettre à jour la réservation courante
        if (state.currentReservation?._id === id) {
          state.currentReservation = reservation;
        }
      })
      .addCase(updateReservationStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
    
    // ========================================
    // 🗑️ SUPPRESSION DE RÉSERVATION
    // ========================================
    
    builder
      .addCase(deleteReservation.fulfilled, (state, action) => {
        const id = action.payload;
        
        state.reservations = state.reservations.filter(r => r._id !== id);
        state.todayReservations = state.todayReservations.filter(r => r._id !== id);
        state.upcomingReservations = state.upcomingReservations.filter(r => r._id !== id);
        
        if (state.currentReservation?._id === id) {
          state.currentReservation = null;
        }
        
        state.stats.total = Math.max(0, state.stats.total - 1);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.error = action.payload;
      });
    
    // ========================================
    // 🪑 ASSIGNATION DE TABLE
    // ========================================
    
    builder
      .addCase(assignTableToReservation.fulfilled, (state, action) => {
        const updatedReservation = action.payload;
        const id = updatedReservation._id;
        
        // Mettre à jour dans toutes les listes
        const updateInList = (list) => {
          const index = list.findIndex(r => r._id === id);
          if (index !== -1) {
            list[index] = updatedReservation;
          }
        };
        
        updateInList(state.reservations);
        updateInList(state.todayReservations);
        updateInList(state.upcomingReservations);
        
        // Mettre à jour la réservation courante
        if (state.currentReservation?._id === id) {
          state.currentReservation = updatedReservation;
        }
      })
      .addCase(assignTableToReservation.rejected, (state, action) => {
        state.error = action.payload;
      });
    
    // ========================================
    // 📅 RÉSERVATIONS DU JOUR
    // ========================================
    
    builder
      .addCase(fetchTodayReservations.pending, (state) => {
        state.todayLoading = true;
        state.todayError = null;
      })
      .addCase(fetchTodayReservations.fulfilled, (state, action) => {
        state.todayLoading = false;
        state.todayReservations = action.payload;
      })
      .addCase(fetchTodayReservations.rejected, (state, action) => {
        state.todayLoading = false;
        state.todayError = action.payload;
      });
    
    // ========================================
    // ⏰ PROCHAINES RÉSERVATIONS
    // ========================================
    
    builder
      .addCase(fetchUpcomingReservations.pending, (state) => {
        state.upcomingLoading = true;
        state.upcomingError = null;
      })
      .addCase(fetchUpcomingReservations.fulfilled, (state, action) => {
        state.upcomingLoading = false;
        state.upcomingReservations = action.payload;
      })
      .addCase(fetchUpcomingReservations.rejected, (state, action) => {
        state.upcomingLoading = false;
        state.upcomingError = action.payload;
      });
  }
});

// ========================================
// 🔗 ACTIONS ET SÉLECTEURS
// ========================================

// Actions
export const {
  setFilters,
  clearFilters,
  setSelectedDate,
  setCurrentReservation,
  clearCurrentReservation,
  clearErrors,
  optimisticUpdateStatus,
  optimisticDelete,
  updateStats,
  resetReservationState
} = reservationSlice.actions;

// ========================================
// 🎯 SÉLECTEURS
// ========================================

// Sélecteurs de base
export const selectReservations = (state) => state.reservations.reservations;
export const selectCurrentReservation = (state) => state.reservations.currentReservation;
export const selectTodayReservations = (state) => state.reservations.todayReservations;
export const selectUpcomingReservations = (state) => state.reservations.upcomingReservations;

// Sélecteurs de chargement
export const selectReservationsLoading = (state) => state.reservations.reservationsLoading;
export const selectReservationLoading = (state) => state.reservations.loading;
export const selectTodayLoading = (state) => state.reservations.todayLoading;
export const selectUpcomingLoading = (state) => state.reservations.upcomingLoading;

// Sélecteurs d'erreurs
export const selectReservationsError = (state) => state.reservations.reservationsError;
export const selectReservationError = (state) => state.reservations.error;
export const selectTodayError = (state) => state.reservations.todayError;
export const selectUpcomingError = (state) => state.reservations.upcomingError;

// Sélecteurs de métadonnées
export const selectReservationsPagination = (state) => state.reservations.pagination;
export const selectReservationsFilters = (state) => state.reservations.filters;
export const selectReservationsStats = (state) => state.reservations.stats;
export const selectSelectedDate = (state) => state.reservations.selectedDate;
export const selectLastFetch = (state) => state.reservations.lastFetch;

// Sélecteurs composés
export const selectPendingReservations = (state) => 
  state.reservations.reservations.filter(r => r.status === RESERVATION_STATUS.PENDING);

export const selectConfirmedReservations = (state) => 
  state.reservations.reservations.filter(r => r.status === RESERVATION_STATUS.CONFIRMED);

export const selectSeatedReservations = (state) => 
  state.reservations.reservations.filter(r => r.status === RESERVATION_STATUS.SEATED);

export const selectActiveReservations = (state) => 
  state.reservations.reservations.filter(r => 
    [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED, RESERVATION_STATUS.SEATED].includes(r.status)
  );

export const selectReservationsByDate = (date) => (state) =>
  state.reservations.reservations.filter(r => r.date?.startsWith(date));

export const selectReservationById = (id) => (state) =>
  state.reservations.reservations.find(r => r._id === id);

// Sélecteurs de statistiques
export const selectReservationsCount = (state) => state.reservations.reservations.length;
export const selectTodayReservationsCount = (state) => state.reservations.todayReservations.length;
export const selectUpcomingReservationsCount = (state) => state.reservations.upcomingReservations.length;

// Export du reducer
export default reservationSlice.reducer;