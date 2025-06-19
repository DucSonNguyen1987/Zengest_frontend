import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      // Simulation API - remplacer par vraie API plus tard
      console.log('🍽️ Récupération items menu avec params:', params);
      
      // Données de test
      const mockData = {
        success: true,
        data: {
          items: [
            {
              _id: '1',
              name: 'Burger Classic',
              description: 'Burger avec steak, salade, tomate',
              category: { _id: 'cat1', name: 'Burgers' },
              price: 12.50,
              featured: true,
              availability: { isAvailable: true }
            },
            {
              _id: '2', 
              name: 'Pizza Margherita',
              description: 'Pizza traditionnelle italienne',
              category: { _id: 'cat2', name: 'Pizzas' },
              price: 14.00,
              featured: false,
              availability: { isAvailable: true }
            }
          ],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 20
          }
        }
      };
      
      // Simuler délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockData;
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
      console.log('🍽️ Récupération item menu:', id);
      
      // Données de test
      const mockData = {
        success: true,
        data: {
          _id: id,
          name: 'Item de test',
          description: 'Description de test',
          price: 10.00
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('🍽️ Création item menu:', itemData);
      
      const mockData = {
        success: true,
        data: {
          _id: Date.now().toString(),
          ...itemData,
          createdAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData;
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
      console.log('🍽️ Mise à jour item menu:', id, data);
      
      const mockData = {
        success: true,
        data: {
          _id: id,
          ...data,
          updatedAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('🍽️ Suppression item menu:', id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, id };
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
      console.log('🍽️ Toggle disponibilité:', id, isAvailable);
      
      const mockData = {
        success: true,
        data: {
          _id: id,
          availability: { isAvailable },
          updatedAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Récupérer les catégories
 */
export const fetchMenuCategories = createAsyncThunk(
  'menu/fetchMenuCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🗂️ Récupération catégories menu');
      
      const mockData = {
        success: true,
        data: [
          { _id: 'cat1', name: 'Burgers', description: 'Burgers et sandwichs' },
          { _id: 'cat2', name: 'Pizzas', description: 'Pizzas traditionnelles et originales' },
          { _id: 'cat3', name: 'Salades', description: 'Salades fraîches et variées' },
          { _id: 'cat4', name: 'Desserts', description: 'Desserts maison' }
        ]
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('🗂️ Création catégorie:', categoryData);
      
      const mockData = {
        success: true,
        data: {
          _id: Date.now().toString(),
          ...categoryData,
          createdAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('🗂️ Mise à jour catégorie:', id, data);
      
      const mockData = {
        success: true,
        data: {
          _id: id,
          ...data,
          updatedAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('🗂️ Suppression catégorie:', id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, id };
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
      console.log('⭐ Récupération plats du jour:', params);
      
      const mockData = {
        success: true,
        data: [
          {
            _id: 'special1',
            name: 'Plat du jour - Coq au vin',
            description: 'Coq au vin traditionnel avec légumes de saison',
            price: 18.50,
            status: 'active',
            date: new Date().toISOString().split('T')[0]
          }
        ]
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Créer un plat du jour
 */
export const createDailySpecial = createAsyncThunk(
  'menu/createDailySpecial',
  async (specialData, { rejectWithValue }) => {
    try {
      console.log('⭐ Création plat du jour:', specialData);
      
      const mockData = {
        success: true,
        data: {
          _id: Date.now().toString(),
          ...specialData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('✅ Approbation plat du jour:', id);
      
      const mockData = {
        success: true,
        data: {
          _id: id,
          status: 'active',
          approvedAt: new Date().toISOString()
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData;
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
      console.log('❌ Rejet plat du jour:', id, reason);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, id };
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
            state.items[index] = { ...state.items[index], ...updatedItem };
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
    // ⭐ PLATS DU JOUR
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
          state.dailySpecials.push(action.payload.data);
        }
      });
    
    // Approve daily special
    builder
      .addCase(approveDailySpecial.fulfilled, (state, action) => {
        const updatedSpecial = action.payload.data;
        if (updatedSpecial) {
          const index = state.dailySpecials.findIndex(special => special._id === updatedSpecial._id);
          if (index !== -1) {
            state.dailySpecials[index] = { ...state.dailySpecials[index], ...updatedSpecial };
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