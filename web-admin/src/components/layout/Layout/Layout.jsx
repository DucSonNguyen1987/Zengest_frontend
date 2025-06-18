// Layout principal de l'admin
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

// Composants de layout
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

// Actions Redux
import { 
  setScreenSize, 
  setSidebarMobile, 
  setLastRoute,
  updateLastActivity 
} from '@/store/slices/uiSlice';
import { selectResponsive, selectSidebar, selectTheme } from '@/store/slices/uiSlice';

// Hooks
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useWebSocketConnection } from '@/hooks/api/useWebSocket';

// Styles
//import './Layout.scss';

// ========================================
// 🏗️ COMPOSANT LAYOUT PRINCIPAL
// ========================================

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // États Redux
  const responsive = useSelector(selectResponsive);
  const sidebar = useSelector(selectSidebar);
  const theme = useSelector(selectTheme);
  
  // État local
  const [isLoading, setIsLoading] = useState(true);
  
  // Hooks personnalisés
  useAuthCheck(); // Vérification auth automatique
  useWebSocketConnection(); // Connexion WebSocket
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Détection de la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      dispatch(setScreenSize({ width, height }));
      dispatch(setSidebarMobile(width < 1024));
    };
    
    // Initialisation
    handleResize();
    
    // Listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);
  
  // Suivi de l'activité utilisateur
  useEffect(() => {
    const handleUserActivity = () => {
      dispatch(updateLastActivity());
    };
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [dispatch]);
  
  // Suivi des changements de route
  useEffect(() => {
    dispatch(setLastRoute(location.pathname));
    
    // Fermer la sidebar sur mobile après navigation
    if (responsive.isMobile && sidebar.isOpen) {
      dispatch({ type: 'ui/closeSidebar' });
    }
    
    // Scroll to top sur changement de page
    window.scrollTo(0, 0);
  }, [location.pathname, dispatch, responsive.isMobile, sidebar.isOpen]);
  
  // Chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // ========================================
  // 🎨 CLASSES CSS DYNAMIQUES
  // ========================================
  
  const getLayoutClasses = () => {
    const classes = ['admin-layout'];
    
    // Thème
    classes.push(`theme-${theme.mode}`);
    
    // Sidebar état
    if (sidebar.isOpen && !responsive.isMobile) {
      classes.push('sidebar-open');
    }
    if (sidebar.isCollapsed) {
      classes.push('sidebar-collapsed');
    }
    
    // Responsive
    if (responsive.isMobile) classes.push('layout-mobile');
    if (responsive.isTablet) classes.push('layout-tablet');
    if (responsive.isDesktop) classes.push('layout-desktop');
    
    // Densité
    classes.push(`density-${theme.density}`);
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: responsive.isMobile ? 0 : 20,
      y: responsive.isMobile ? 20 : 0 
    },
    in: { 
      opacity: 1, 
      x: 0, 
      y: 0 
    },
    out: { 
      opacity: 0, 
      x: responsive.isMobile ? 0 : -20,
      y: responsive.isMobile ? -20 : 0 
    }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };
  
  // ========================================
  // 🔄 LOADER INITIAL
  // ========================================
  
  if (isLoading) {
    return (
      <div className="admin-layout-loader">
        <motion.div
          className="loader-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loader-logo">
            <img src="/assets/logos/zengest-admin.svg" alt="Zengest Admin" />
          </div>
          <motion.div
            className="loader-spinner"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <p>Chargement de l'interface...</p>
        </motion.div>
      </div>
    );
  }
  
  // ========================================
  // 🎯 RENDU PRINCIPAL
  // ========================================
  
  return (
    <div className={getLayoutClasses()}>
      {/* Header principal */}
      <Header />
      
      {/* Container principal */}
      <div className="layout-container">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Overlay mobile pour fermer sidebar */}
        <AnimatePresence>
          {responsive.isMobile && sidebar.isOpen && (
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: 'ui/closeSidebar' })}
            />
          )}
        </AnimatePresence>
        
        {/* Zone de contenu principal */}
        <main className="layout-main">
          <div className="main-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="page-container"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Footer (optionnel) */}
          <Footer />
        </main>
      </div>
      
      {/* Container pour les notifications toast */}
      <ToastContainer
        position={responsive.isMobile ? "bottom-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.mode}
        className="toast-container"
      />
      
      {/* Variables CSS dynamiques */}
      <style jsx>{`
        :root {
          --primary-color: ${theme.primaryColor};
          --accent-color: ${theme.accentColor};
          --font-size-base: ${theme.fontSize === 'small' ? '14px' : theme.fontSize === 'large' ? '18px' : '16px'};
        }
      `}</style>
    </div>
  );
};

export default Layout;