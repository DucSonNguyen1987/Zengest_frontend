// web-admin/src/store/slices/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuService } from '@/services/api/menu';

// ========================================
// 🔄 THUNKS ASYNC (Actions asynchrones)
// ========================================

/**
 * Récupérer les items du menu avec pagination et filtres
 */
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await menuService.getMenuItems(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer un item de menu par ID
 */
export const fetchMenuItemById = createAsyncThunk(
  'menu/fetchMenuItemById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await menuService.getMenuItemById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Créer un nouvel item de menu
 */
export const createMenuItem = createAsyncThunk(
  'menu/createMenuItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await menuService.createMenuItem(itemData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Mettre à jour un item de menu
 */
export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await menuService.updateMenuItem(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Supprimer un item de menu
 */
export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await menuService.deleteMenuItem(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Changer la disponibilité d'un item
 */
export const toggleMenuItemAvailability = createAsyncThunk(
  'menu/toggleMenuItemAvailability',
  async ({ id, isAvailable }, { rejectWithValue }) => {
    try {
      const response = await menuService.toggleMenuItemAvailability(id, isAvailable);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer les catégories de menu
 */
export const fetchMenuCategories = createAsyncThunk(
  'menu/fetchMenuCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await menuService.getCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Créer une nouvelle catégorie
 */
export const createMenuCategory = createAsyncThunk(
  'menu/createMenuCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await menuService.createCategory(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Mettre à jour une catégorie
 */
export const updateMenuCategory = createAsyncThunk(
  'menu/updateMenuCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await menuService.updateCategory(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Supprimer une catégorie
 */
export const deleteMenuCategory = createAsyncThunk(
  'menu/deleteMenuCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await menuService.deleteCategory(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer les plats du jour
 */
export const fetchDailySpecials = createAsyncThunk(
  'menu/fetchDailySpecials',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await menuService.getDailySpecials(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Créer un nouveau plat du jour
 */
export const createDailySpecial = createAsyncThunk(
  'menu/createDailySpecial',
  async (specialData, { rejectWithValue }) => {
    try {
      const response = await menuService.createDailySpecial(specialData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Approuver un plat du jour
 */
export const approveDailySpecial = createAsyncThunk(
  'menu/approveDailySpecial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await menuService.approveDailySpecial(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Rejeter un plat du jour
 */
export const rejectDailySpecial = createAsyncThunk(
  'menu/rejectDailySpecial',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await menuService.rejectDailySpecial(id, reason);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// 🏪 ÉTAT INITIAL
// ========================================

const initialState = {
  // Items de menu
  items: [],
  currentItem: null,
  itemsLoading: false,
  itemsError: null,
  
  // Catégories
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  
  // Plats du jour
  dailySpecials: [],
  dailySpecialsLoading: false,
  dailySpecialsError: null,
  
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
    category: '',
    status: '',
    featured: '',
    dietary: '',
    priceRange: { min: '', max: '' },
    spiceLevel: '',
    tags: ''
  },
  
  // UI States
  loading: false,
  error: null,
  lastFetch: null
};

// ========================================
// 🍽️ SLICE MENU
// ========================================

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Actions synchrones
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    
    clearErrors: (state) => {
      state.error = null;
      state.itemsError = null;
      state.categoriesError = null;
      state.dailySpecialsError = null;
    },
    
    // Optimistic updates
    optimisticUpdateItem: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex(item => item._id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes };
      }
    },
    
    optimisticDeleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    }
  },
  
  extraReducers: (builder) => {
    // ========================================
    // 📋 ITEMS DE MENU
    // ========================================
    
    // Fetch menu items
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.itemsLoading = true;
        state.itemsError = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.itemsLoading = false;
        state.items = action.payload.data?.items || action.payload.data || [];
        
        // Mise à jour de la pagination si présente
        if (action.payload.data?.pagination) {
          state.pagination = action.payload.data.pagination;
        }
        
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.itemsLoading = false;
        state.itemsError = action.payload;
      });
    
    // Fetch menu item by ID
    builder
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Create menu item
    builder
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        // Ajouter le nouvel item à la liste
        if (action.payload.data) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Update menu item
    builder
      .addCase(updateMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        // Mettre à jour l'item dans la liste
        const updatedItem = action.payload.data;
        if (updatedItem) {
          const index = state.items.findIndex(item => item._id === updatedItem._id);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
          // Mettre à jour currentItem si c'est le même
          if (state.currentItem?._id === updatedItem._id) {
            state.currentItem = updatedItem;
          }
        }
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Delete menu item
    builder
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        // Supprimer l'item de la liste
        const id = action.payload.id;
        state.items = state.items.filter(item => item._id !== id);
        // Clear currentItem si c'est le même
        if (state.currentItem?._id === id) {
          state.currentItem = null;
        }
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Toggle availability
    builder
      .addCase(toggleMenuItemAvailability.fulfilled, (state, action) => {
        const updatedItem = action.payload.data;
        if (updatedItem) {
          const index = state.items.findIndex(item => item._id === updatedItem._id);
          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        }
      });
    
    // ========================================
    // 🗂️ CATÉGORIES
    // ========================================
    
    // Fetch categories
    builder
      .addCase(fetchMenuCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload.data || [];
      })
      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      });
    
    // Create category
    builder
      .addCase(createMenuCategory.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.categories.push(action.payload.data);
        }
      });
    
    // Update category
    builder
      .addCase(updateMenuCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload.data;
        if (updatedCategory) {
          const index = state.categories.findIndex(cat => cat._id === updatedCategory._id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      });
    
    // Delete category
    builder
      .addCase(deleteMenuCategory.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.categories = state.categories.filter(cat => cat._id !== id);
      });
    
    // ========================================
    // 🔥 PLATS DU JOUR
    // ========================================
    
    // Fetch daily specials
    builder
      .addCase(fetchDailySpecials.pending, (state) => {
        state.dailySpecialsLoading = true;
        state.dailySpecialsError = null;
      })
      .addCase(fetchDailySpecials.fulfilled, (state, action) => {
        state.dailySpecialsLoading = false;
        state.dailySpecials = action.payload.data || [];
      })
      .addCase(fetchDailySpecials.rejected, (state, action) => {
        state.dailySpecialsLoading = false;
        state.dailySpecialsError = action.payload;
      });
    
    // Create daily special
    builder
      .addCase(createDailySpecial.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.dailySpecials.unshift(action.payload.data);
        }
      });
    
    // Approve daily special
    builder
      .addCase(approveDailySpecial.fulfilled, (state, action) => {
        const updatedSpecial = action.payload.data;
        if (updatedSpecial) {
          const index = state.dailySpecials.findIndex(special => special._id === updatedSpecial._id);
          if (index !== -1) {
            state.dailySpecials[index] = updatedSpecial;
          }
        }
      });
    
    // Reject daily special
    builder
      .addCase(rejectDailySpecial.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.dailySpecials = state.dailySpecials.filter(special => special._id !== id);
      });
  },
});

// ========================================
// 🎯 ACTIONS ET SÉLECTEURS
// ========================================

// Actions
export const {
  setFilters,
  clearFilters,
  setCurrentItem,
  clearCurrentItem,
  clearErrors,
  optimisticUpdateItem,
  optimisticDeleteItem
} = menuSlice.actions;

// Sélecteurs
export const selectMenuItems = (state) => state.menu.items;
export const selectCurrentMenuItem = (state) => state.menu.currentItem;
export const selectMenuLoading = (state) => state.menu.loading || state.menu.itemsLoading;
export const selectMenuError = (state) => state.menu.error || state.menu.itemsError;
export const selectMenuPagination = (state) => state.menu.pagination;
export const selectMenuFilters = (state) => state.menu.filters;

export const selectMenuCategories = (state) => state.menu.categories;
export const selectCategoriesLoading = (state) => state.menu.categoriesLoading;
export const selectCategoriesError = (state) => state.menu.categoriesError;

export const selectDailySpecials = (state) => state.menu.dailySpecials;
export const selectDailySpecialsLoading = (state) => state.menu.dailySpecialsLoading;
export const selectDailySpecialsError = (state) => state.menu.dailySpecialsError;

// Sélecteurs dérivés
export const selectMenuItemsByCategory = (state) => {
  const items = selectMenuItems(state);
  const categories = selectMenuCategories(state);
  
  return categories.map(category => ({
    ...category,
    items: items.filter(item => item.category?._id === category._id)
  }));
};

export const selectFeaturedMenuItems = (state) => {
  return selectMenuItems(state).filter(item => item.featured);
};

export const selectAvailableMenuItems = (state) => {
  return selectMenuItems(state).filter(item => item.availability?.isAvailable);
};

export const selectActiveDailySpecials = (state) => {
  return selectDailySpecials(state).filter(special => special.status === 'active');
};

export const selectPendingDailySpecials = (state) => {
  return selectDailySpecials(state).filter(special => special.status === 'pending');
};

// Reducer par défaut
export default menuSlice.reducer;