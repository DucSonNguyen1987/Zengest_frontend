// components/common/index.js - Export centralisé de tous les composants communs

import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import Modal from './Modal'
import ConfirmationDialog from './ConfirmationDialog'
import { showToast } from './Toast'
import Badge from './Badge'
import EmptyState from './EmptyState'
import Card from './Card'

// Export individuel pour imports spécifiques
export { default as LoadingSpinner } from './LoadingSpinner'
export { default as ErrorMessage } from './ErrorMessage'
export { default as Modal } from './Modal'
export { default as ConfirmationDialog } from './ConfirmationDialog'
export { showToast } from './Toast'
export { default as Badge } from './Badge'
export { default as EmptyState } from './EmptyState'
export { default as Card } from './Card'

// Export par défaut groupé
export default {
  LoadingSpinner,
  ErrorMessage,
  Modal,
  ConfirmationDialog,
  showToast,
  Badge,
  EmptyState,
  Card
};