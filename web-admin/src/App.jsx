// web-admin/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthCheck } from './hooks/auth/useAuthCheck';

// Pages temporaires (simples)
const LoginPage = () => (
  <div className="container mt-6">
    <div className="columns is-centered">
      <div className="column is-4">
        <div className="box">
          <h1 className="title">Zengest Admin</h1>
          <p>Page de connexion (à développer)</p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => (
  <div className="container mt-6">
    <h1 className="title">Dashboard</h1>
    <p>Interface d'administration (à développer)</p>
  </div>
);

const LoadingPage = () => (
  <div className="container mt-6">
    <div className="has-text-centered">
      <p>Chargement...</p>
    </div>
  </div>
);

function App() {
  const { isAuthenticated, isInitialized } = useAuthCheck();

  // Afficher le loading pendant l'initialisation
  if (!isInitialized) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;