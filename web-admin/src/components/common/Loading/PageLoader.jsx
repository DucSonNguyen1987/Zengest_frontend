import React from 'react';

// ========================================
// ⏳ COMPOSANT PAGE LOADER
// ========================================

const PageLoader = ({ 
  message = "Chargement...", 
  showProgress = false,
  size = "large" 
}) => {
  const sizeStyles = {
    small: { width: '24px', height: '24px' },
    medium: { width: '40px', height: '40px' },
    large: { width: '60px', height: '60px' }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Spinner */}
      <div 
        style={{
          ...sizeStyles[size],
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #eb2f06',
          borderRadius: '50%',
          animation: 'pageLoader-spin 1s linear infinite',
          marginBottom: '20px'
        }}
      />
      
      {/* Message */}
      <div style={{
        fontSize: '18px',
        color: '#666',
        textAlign: 'center',
        marginBottom: showProgress ? '20px' : '0'
      }}>
        {message}
      </div>
      
      {/* Barre de progression optionnelle */}
      {showProgress && (
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: '#e0e0e0',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eb2f06',
            animation: 'pageLoader-progress 2s ease-in-out infinite'
          }} />
        </div>
      )}
      
      {/* CSS Animations */}
      <style>{`
        @keyframes pageLoader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pageLoader-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;