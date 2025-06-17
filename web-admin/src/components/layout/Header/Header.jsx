// Header de l'interface admin
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import {
  toggleSidebar,
  toggleTheme,
  setSearchQuery,
  setSearchActive,
  markAllNotificationsAsRead,
  openModal
} from '@/store/slices/uiSlice';
import { logoutUser } from '@/store/slices/authSlice';

// Sélecteurs
import {
  selectCurrentUser,
  selectIsAuthenticated
} from '@/store/slices/authSlice';
import {
  selectSidebar,
  selectTheme,
  selectNotifications,
  selectSearch,
  selectResponsive
} from '@/store/slices/uiSlice';

// Hooks
import { useClickOutside } from '@/hooks/ui/useClickOutside';
import { useDebounce } from '@/hooks/ui/useDebounce';

// Composants
import SearchResults from './SearchResults';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

// Styles
import './Header.scss';

// ========================================
// 🏗️ COMPOSANT HEADER
// ========================================

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // États Redux
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sidebar = useSelector(selectSidebar);
  const theme = useSelector(selectTheme);
  const notifications = useSelector(selectNotifications);
  const search = useSelector(selectSearch);
  const responsive = useSelector(selectResponsive);
  
  // États locaux
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(search.query);
  
  // Refs
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);
  
  // Hooks personnalisés
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);
  
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));
  useClickOutside(notificationsRef, () => setIsNotificationsOpen(false));
  useClickOutside(searchRef, () => {
    setIsSearchFocused(false);
    if (!search.query) {
      dispatch(setSearchActive(false));
    }
  });
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Mise à jour de la recherche avec debounce
  useEffect(() => {
    if (debouncedSearchQuery !== search.query) {
      dispatch(setSearchQuery(debouncedSearchQuery));
      if (debouncedSearchQuery) {
        dispatch(setSearchActive(true));
      }
    }
  }, [debouncedSearchQuery, dispatch, search.query]);
  
  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K pour la recherche
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        setIsSearchFocused(true);
        dispatch(setSearchActive(true));
      }
      
      // Escape pour fermer la recherche
      if (e.key === 'Escape' && isSearchFocused) {
        searchRef.current?.blur();
        setIsSearchFocused(false);
        setLocalSearchQuery('');
        dispatch(setSearchQuery(''));
        dispatch(setSearchActive(false));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, isSearchFocused]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    dispatch(setSearchActive(true));
  };
  
  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };
  
  const handleSearchClear = () => {
    setLocalSearchQuery('');
    dispatch(setSearchQuery(''));
    dispatch(setSearchActive(false));
    searchRef.current?.focus();
  };
  
  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen && notifications.unreadCount > 0) {
      dispatch(markAllNotificationsAsRead());
    }
  };
  
  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };
  
  const handleSettingsClick = () => {
    setIsUserMenuOpen(false);
    navigate('/settings');
  };
  
  // ========================================
  // 🎨 CLASSES CSS DYNAMIQUES
  // ========================================
  
  const getHeaderClasses = () => {
    const classes = ['admin-header'];
    
    if (sidebar.isOpen && !responsive.isMobile) {
      classes.push('sidebar-open');
    }
    
    if (isSearchFocused) {
      classes.push('search-focused');
    }
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🏷️ HELPERS
  // ========================================
  
  const getPageTitle = () => {
    const pathMap = {
      '/': 'Dashboard',
      '/users': 'Gestion des utilisateurs',
      '/restaurants': 'Gestion des restaurants',
      '/menu': 'Gestion du menu',
      '/orders': 'Commandes',
      '/reservations': 'Réservations',
      '/tables': 'Gestion des tables',
      '/analytics': 'Analytics',
      '/settings': 'Paramètres'
    };
    
    return pathMap[location.pathname] || 'Zengest Admin';
  };
  
  const getUserInitials = () => {
    if (!currentUser) return 'ZA';
    const { firstName, lastName } = currentUser;
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'ZA';
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <header className={getHeaderClasses()}>
      <div className="header-content">
        {/* Section gauche */}
        <div className="header-left">
          {/* Bouton menu mobile/sidebar */}
          <motion.button
            className="header-menu-button"
            onClick={handleSidebarToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle sidebar"
          >
            {responsive.isMobile ? (
              sidebar.isOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />
            ) : (
              <Bars3Icon className="icon" />
            )}
          </motion.button>
          
          {/* Logo et titre */}
          <div className="header-brand">
            <img 
              src="/assets/logos/zengest-admin.svg" 
              alt="Zengest Admin" 
              className="header-logo"
            />
            {!responsive.isMobile && (
              <div className="header-title">
                <h1>{getPageTitle()}</h1>
              </div>
            )}
          </div>
        </div>
        
        {/* Section centrale - Recherche */}
        <div className="header-center">
          <div className="search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Rechercher... (Ctrl+K)"
                value={localSearchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="search-input"
              />
              {localSearchQuery && (
                <motion.button
                  className="search-clear"
                  onClick={handleSearchClear}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="icon" />
                </motion.button>
              )}
            </div>
            
            {/* Résultats de recherche */}
            <AnimatePresence>
              {isSearchFocused && search.isActive && (
                <SearchResults />
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Section droite */}
        <div className="header-right">
          {/* Bouton thème */}
          <motion.button
            className="header-action-button theme-toggle"
            onClick={handleThemeToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Passer en mode ${theme.mode === 'light' ? 'sombre' : 'clair'}`}
          >
            {theme.mode === 'light' ? (
              <MoonIcon className="icon" />
            ) : (
              <SunIcon className="icon" />
            )}
          </motion.button>
          
          {/* Notifications */}
          <div className="notifications-container" ref={notificationsRef}>
            <motion.button
              className="header-action-button notifications-button"
              onClick={handleNotificationsToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Notifications"
            >
              <BellIcon className="icon" />
              {notifications.unreadCount > 0 && (
                <motion.span
                  className="notification-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {notifications.unreadCount > 99 ? '99+' : notifications.unreadCount}
                </motion.span>
              )}
            </motion.button>
            
            <AnimatePresence>
              {isNotificationsOpen && (
                <NotificationDropdown
                  notifications={notifications.list}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
          
          {/* Menu utilisateur */}
          <div className="user-menu-container" ref={userMenuRef}>
            <motion.button
              className="user-menu-button"
              onClick={handleUserMenuToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="user-avatar">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.firstName} />
                ) : (
                  <span className="user-initials">{getUserInitials()}</span>
                )}
              </div>
              {!responsive.isMobile && (
                <>
                  <div className="user-info">
                    <span className="user-name">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </span>
                    <span className="user-role">{currentUser?.role}</span>
                  </div>
                  <ChevronDownIcon className="chevron-icon" />
                </>
              )}
            </motion.button>
            
            <AnimatePresence>
              {isUserMenuOpen && (
                <UserDropdown
                  user={currentUser}
                  onProfile={handleProfileClick}
                  onSettings={handleSettingsClick}
                  onLogout={handleLogout}
                  onClose={() => setIsUserMenuOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;