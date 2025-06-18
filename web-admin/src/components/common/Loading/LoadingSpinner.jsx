// web-admin/src/components/common/Loading/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.scss';

// ========================================
// 🔄 COMPOSANT LOADING SPINNER
// ========================================

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Chargement...', 
  showMessage = true,
  fullscreen = false,
  color = 'primary'
}) => {
  
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'spinner--small';
      case 'large': return 'spinner--large';
      case 'xlarge': return 'spinner--xlarge';
      default: return 'spinner--medium';
    }
  };
  
  const getColorClass = () => {
    switch (color) {
      case 'white': return 'spinner--white';
      case 'success': return 'spinner--success';
      case 'warning': return 'spinner--warning';
      case 'danger': return 'spinner--danger';
      default: return 'spinner--primary';
    }
  };
  
  const SpinnerContent = () => (
    <div className={`spinner-container ${fullscreen ? 'spinner-container--fullscreen' : ''}`}>
      <div className={`spinner ${getSizeClass()} ${getColorClass()}`}>
        <div className="spinner__circle"></div>
      </div>
      {showMessage && message && (
        <p className="spinner__message">{message}</p>
      )}
    </div>
  );
  
  if (fullscreen) {
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <SpinnerContent />
          </div>
        </div>
      </div>
    );
  }
  
  return <SpinnerContent />;
};

// ========================================
// 📄 PAGE LOADER (pour les pages complètes)
// ========================================

export const PageLoader = ({ message = 'Chargement de la page...', showProgress = false }) => (
  <div className="page-loader">
    <div className="page-loader__content">
      <LoadingSpinner size="large" message={message} color="primary" />
      {showProgress && (
        <div className="page-loader__progress">
          <progress className="progress is-primary" max="100">0%</progress>
        </div>
      )}
    </div>
  </div>
);

// ========================================
// 🔄 SPINNER INLINE (pour les boutons)
// ========================================

export const InlineSpinner = ({ size = 'small', color = 'white' }) => (
  <span className={`spinner-inline ${getSizeClass()} ${getColorClass()}`}>
    <span className="spinner-inline__circle"></span>
  </span>
);

const getSizeClass = (size) => {
  switch (size) {
    case 'small': return 'spinner-inline--small';
    case 'large': return 'spinner-inline--large';
    default: return 'spinner-inline--medium';
  }
};

const getColorClass = (color) => {
  switch (color) {
    case 'white': return 'spinner-inline--white';
    case 'primary': return 'spinner-inline--primary';
    default: return 'spinner-inline--white';
  }
};

export default LoadingSpinner;