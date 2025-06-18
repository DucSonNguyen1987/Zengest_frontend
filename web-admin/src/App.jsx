import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Store Redux
import { store } from './store';

// Composants de Layout
import Layout from './components/layout/Layout/Layout';
import LoadingSpinner from './components/common/Loading/LoadingSpinner';

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
//const RestaurantsPage = React.lazy(() => import('./pages/Restaurants/RestaurantsPage'));

// Pages Analytics
const AnalyticsPage = React.lazy(() => import('./pages/Analytics/AnalyticsPage'));
const ReportsPage = React.lazy(() => import('./pages/Analytics/ReportsPage'));

// Pages Configuration
const SettingsPage = React.lazy(() => import('./pages/Settings/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/auth/ProfilePage'));

// Page 404
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// ========================================
// 🎯 COMPOSANT APP PRINCIPAL
// ========================================

const AppContent = () => {
  return (
    <Routes>
      {/* Routes publiques (non authentifiées) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Routes protégées (authentifiées) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Gestion Menu */}
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/items" element={<MenuItemsPage />} />
          <Route path="/menu/categories" element={<MenuCategoriesPage />} />
          <Route path="/menu/daily-specials" element={<DailySpecialsPage />} />

          {/* Opérations */}
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/tables" element={<TablesPage />} />

          {/* Gestion */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />

          {/* Analytics */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics/reports" element={<ReportsPage />} />

          {/* Configuration */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

// ========================================
// 🏗️ COMPOSANT APP AVEC PROVIDERS
// ========================================

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Suspense fallback={<LoadingSpinner />}>
            <AppContent />
          </Suspense>
          
          {/* Notifications globales */}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;