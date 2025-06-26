// web-admin/src/components/common/index.js - VERSION CORRIGÉE

// ========================================
// 📝 FORMULAIRES ET INPUTS
// ========================================
export { default as Input } from './Input/Input';

// ========================================
// ⏳ LOADING ET ÉTATS
// ========================================
// Import du composant LoadingSpinner
import LoadingSpinnerComponent from './Loading/LoadingSpinner';

// Re-export avec le bon nom
export const LoadingSpinner = LoadingSpinnerComponent;
export { default as LoadingSpinnerDefault } from './Loading/LoadingSpinner';

// Export des autres variantes aussi
export { 
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