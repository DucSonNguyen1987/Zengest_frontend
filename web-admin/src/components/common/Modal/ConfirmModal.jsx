// web-admin/src/components/common/Modal/ConfirmModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckIcon,
  TrashIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// ========================================
// ⚠️ MODAL DE CONFIRMATION
// ========================================

const ConfirmModal = ({
  isOpen = false,
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmClass = 'is-primary',
  cancelClass = 'is-light',
  icon = 'warning',
  size = 'medium',
  loading = false,
  onConfirm = () => {},
  onCancel = () => {},
  showCloseButton = true,
  preventEscapeClose = false,
  preventBackdropClose = false,
  destructive = false
}) => {
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };
  
  const handleCancel = () => {
    if (!loading) {
      onCancel();
    }
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !preventBackdropClose && !loading) {
      handleCancel();
    }
  };
  
  const handleKeyDown = (e) => {
    if (!loading) {
      if (e.key === 'Escape' && !preventEscapeClose) {
        handleCancel();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        handleConfirm();
      }
    }
  };
  
  // ========================================
  // 🎨 UTILITAIRES DE RENDU
  // ========================================
  
  const getIcon = () => {
    const iconClasses = "h-8 w-8";
    
    switch (icon) {
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClasses} has-text-warning`} />;
      case 'danger':
        return <TrashIcon className={`${iconClasses} has-text-danger`} />;
      case 'info':
        return <InformationCircleIcon className={`${iconClasses} has-text-info`} />;
      case 'success':
        return <CheckIcon className={`${iconClasses} has-text-success`} />;
      default:
        if (typeof icon === 'string') {
          return <span className="icon is-large">{icon}</span>;
        }
        return icon;
    }
  };
  
  const getModalSize = () => {
    switch (size) {
      case 'small':
        return 'is-small';
      case 'large':
        return 'is-large';
      case 'fullscreen':
        return 'is-fullscreen';
      default:
        return '';
    }
  };
  
  const getConfirmButtonClass = () => {
    if (destructive || confirmClass.includes('danger')) {
      return `button is-danger ${loading ? 'is-loading' : ''}`;
    }
    return `button ${confirmClass} ${loading ? 'is-loading' : ''}`;
  };
  
  // ========================================
  // 🎨 RENDU
  // ========================================
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal is-active"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          style={{ outline: 'none' }}
        >
          <motion.div 
            className="modal-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
          />
          
          <motion.div 
            className={`modal-card ${getModalSize()}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            style={{ maxWidth: '500px' }}
          >
            {/* En-tête */}
            <header className="modal-card-head">
              <div className="modal-card-title is-flex is-align-items-center">
                <span className="icon mr-3">
                  {getIcon()}
                </span>
                <span>{title}</span>
              </div>
              
              {showCloseButton && (
                <button 
                  className="delete" 
                  aria-label="close"
                  onClick={handleCancel}
                  disabled={loading}
                />
              )}
            </header>
            
            {/* Corps */}
            <section className="modal-card-body">
              <div className="content">
                {typeof message === 'string' ? (
                  <p className="has-text-grey-dark">{message}</p>
                ) : (
                  message
                )}
              </div>
              
              {destructive && (
                <div className="notification is-warning is-light">
                  <p className="is-size-7">
                    <strong>⚠️ Attention :</strong> Cette action est irréversible.
                  </p>
                </div>
              )}
            </section>
            
            {/* Pied */}
            <footer className="modal-card-foot is-justify-content-flex-end">
              <div className="buttons">
                <button 
                  className={`button ${cancelClass}`}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {cancelText}
                </button>
                
                <button 
                  className={getConfirmButtonClass()}
                  onClick={handleConfirm}
                  disabled={loading}
                  autoFocus
                >
                  {confirmText}
                </button>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ========================================
// 🎛️ VARIANTES PRÉ-CONFIGURÉES
// ========================================

/**
 * Modal de suppression avec style danger
 */
export const DeleteConfirmModal = (props) => (
  <ConfirmModal
    icon="danger"
    confirmText="Supprimer"
    confirmClass="is-danger"
    destructive={true}
    {...props}
  />
);

/**
 * Modal de sauvegarde avec style success
 */
export const SaveConfirmModal = (props) => (
  <ConfirmModal
    icon="success"
    confirmText="Sauvegarder"
    confirmClass="is-success"
    {...props}
  />
);

/**
 * Modal d'information avec style info
 */
export const InfoModal = (props) => (
  <ConfirmModal
    icon="info"
    confirmText="OK"
    confirmClass="is-info"
    cancelText=""
    onCancel={props.onConfirm} // Même action pour les deux boutons
    {...props}
  />
);

/**
 * Modal de logout avec style warning
 */
export const LogoutConfirmModal = (props) => (
  <ConfirmModal
    title="Se déconnecter"
    message="Êtes-vous sûr de vouloir vous déconnecter ?"
    icon="warning"
    confirmText="Se déconnecter"
    confirmClass="is-warning"
    {...props}
  />
);

export default ConfirmModal;