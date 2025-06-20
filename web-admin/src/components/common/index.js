// web-admin/src/components/common/index.js
// Export centralisé des composants communs - VERSION MISE À JOUR

// ========================================
// 📝 FORMULAIRES ET INPUTS
// ========================================
export { default as Input } from './Input/Input';

// ========================================
// ⏳ LOADING ET ÉTATS
// ========================================
export { 
  default as LoadingSpinner, 
  PageLoader, 
  InlineSpinner 
} from './Loading/LoadingSpinner';

// ========================================
// 🪟 MODALS ET DIALOGUES
// ========================================
export { 
  default as ConfirmModal, 
  DeleteConfirmModal, 
  SaveConfirmModal, 
  InfoModal, 
  LogoutConfirmModal 
} from './Modal/ConfirmModal';

// ========================================
// 📊 TABLEAUX ET DONNÉES
// ========================================
export { default as Table } from './Table/Table';

// ========================================
// 🔘 BOUTONS ET INTERACTIONS
// ========================================
export { default as Button } from './Button/Button';

// ========================================
// 🔮 COMPOSANTS À CRÉER PROCHAINEMENT
// ========================================

// DataTable (pour les listes avancées)
// export { default as DataTable } from './DataTable/DataTable';

// Pagination
// export { default as Pagination } from './Pagination/Pagination';

// ErrorBoundary
// export { default as ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

// Charts
// export { 
//   LineChart, 
//   BarChart, 
//   PieChart 
// } from './Charts';

// Composants de layout
// export { default as Header } from './Layout/Header/Header';
// export { default as Sidebar } from './Layout/Sidebar/Sidebar';
// export { default as Footer } from './Layout/Footer/Footer';