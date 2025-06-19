// Export centralisé des composants d'authentification

export { default as ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
export { default as PublicRoute } from './PublicRoute/PublicRoute';
export { default as LoginForm } from './LoginForm/LoginForm';

// Exports depuis ProtectedRoute pour les utilitaires
export { RoleGuard, useAuth, withAuthorization } from './ProtectedRoute/ProtectedRoute';