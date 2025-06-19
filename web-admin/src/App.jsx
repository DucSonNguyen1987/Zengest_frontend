// web-admin/src/App.jsx
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Actions Redux
import { restoreSession } from './store/slices/authSlice';

// Sélecteurs
import { 
  selectIsAuthenticated, 
  selectIsInitialized,
  selectAuthLoading 
} from './store/slices/authSlice';

// Composants de Layout
import Layout from './components/layout/Layout/Layout';
import LoadingSpinner, { PageLoader } from './components/common/Loading/LoadingSpinner';

// Guards de protection
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute/PublicRoute';

// Pages principales (chargement paresseux)
const LoginPage = React.lazy(() => import('./pages/Login/LoginPage'));
const DashboardPage = React.lazy(() => import('./pages/Dashboard/Dashboard'));

// Pages Menu
const MenuPage = React.lazy(() => import('./pages/Menu/MenuPage'));
const MenuItemsPage = React.lazy(() => import('./pages/Menu/MenuItemsPage'));
const MenuCategoriesPage = React.lazy(() => import('./pages/Menu/MenuCategoriesPage'));
const DailySpecialsPage = React.lazy(() => import('./pages/Menu/DailySpecialsPage'));

// Pages Opérations
const OrdersPage = React.lazy(() => import('./pages/Orders/OrdersPage'));
const ReservationsPage = React.lazy(() => import('./pages/Reservations/ReservationsPage'));
const TablesPage = React.lazy(() => import('./pages/Tables/TablesPage'));

// Pages Gestion
const UsersPage = React.lazy(() => import('./pages/Users/UserManagement'));

// ========================================
// 🎯 COMPOSANT APP PRINCIPAL
// ========================================

const App = () => {
  const dispatch = useDispatch();
  
  // États Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoading = useSelector(selectAuthLoading);

  // ========================================
  // 🔄 INITIALISATION DE L'APPLICATION
  // ========================================
  
  useEffect(() => {
    console.log('🚀 Initialisation de l\'application Zengest Admin');
    
    // Restaurer la session si elle existe
    if (!isInitialized) {
      console.log('🔄 Restauration de la session...');
      dispatch(restoreSession());
    }
  }, [dispatch, isInitialized]);

  // Debug des états d'authentification
  useEffect(() => {
    console.log('📊 État authentification:', {
      isAuthenticated,
      isInitialized,
      isLoading
    });
  }, [isAuthenticated, isInitialized, isLoading]);

  // ========================================
  // 🔄 LOADER INITIAL
  // ========================================
  
  if (!isInitialized) {
    return (
      <PageLoader 
        message="Initialisation de l'application..."
        showProgress={true}
      />
    );
  }

  // ========================================
  // 🛣️ ROUTAGE PRINCIPAL
  // ========================================
  
  return (
    <Router>
      <div className="App">
        <Suspense 
          fallback={
            <PageLoader 
              message="Chargement de la page..."
              showProgress={false}
            />
          }
        >
          <Routes>
            {/* ===== ROUTES PUBLIQUES ===== */}
            <Route path="/login" element={
              <PublicRoute redirectTo="/dashboard">
                <LoginPage />
              </PublicRoute>
            } />
            
            {/* ===== ROUTES PROTÉGÉES ===== */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              {/* Dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              
              {/* Gestion Menu */}
              <Route path="menu" element={<MenuPage />} />
              <Route path="menu/items" element={<MenuItemsPage />} />
              <Route path="menu/categories" element={<MenuCategoriesPage />} />
              <Route path="menu/daily-specials" element={<DailySpecialsPage />} />
              
              {/* Opérations */}
              <Route path="orders" element={<OrdersPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="tables" element={<TablesPage />} />
              
              {/* Gestion */}
              <Route path="users" element={<UsersPage />} />
              
              {/* Route par défaut pour routes inconnues */}
              <Route path="*" element={
                <div className="hero is-fullheight">
                  <div className="hero-body">
                    <div className="container has-text-centered">
                      <h1 className="title">Page non trouvée</h1>
                      <p className="subtitle">La page que vous cherchez n'existe pas.</p>
                      <button 
                        className="button is-primary"
                        onClick={() => window.history.back()}
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
        
        {/* ===== NOTIFICATIONS TOAST ===== */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName={() => 
            "relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
          bodyClassName={() => "text-sm font-white font-med block p-3"}
        />
      </div>
    </Router>
  );
};

export default App;