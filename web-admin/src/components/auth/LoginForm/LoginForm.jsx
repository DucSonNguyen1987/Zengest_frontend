// Formulaire de connexion admin
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Actions Redux
import { loginUser, clearError, resetFailedAttempts } from '@/store/slices/authSlice';

// Sélecteurs
import {
  selectAuthError,
  selectIsLoading,
  selectIsLocked,
  selectIsAuthenticated
} from '@/store/slices/authSlice';

// Hooks
import { useDocumentTitle } from '@/hooks/ui/useDocumentTitle';

// Styles
import './LoginForm.scss';

// ========================================
// 🔐 COMPOSANT FORMULAIRE DE CONNEXION
// ========================================

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // États Redux
  const authError = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);
  const isLocked = useSelector(selectIsLocked);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // États locaux
  const [showPassword, setShowPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Configuration du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setFocus
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });
  
  // Observer les valeurs du formulaire
  const watchedFields = watch();
  
  // Hook pour le titre de la page
  useDocumentTitle('Connexion - Zengest Admin');
  
  // ========================================
  // 🔄 EFFETS
  // ========================================
  
  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Focus automatique sur le champ email
  useEffect(() => {
    if (isFormVisible) {
      setFocus('email');
    }
  }, [isFormVisible, setFocus]);
  
  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Nettoyer les erreurs au changement de champs
  useEffect(() => {
    if (authError) {
      dispatch(clearError());
    }
  }, [watchedFields.email, watchedFields.password, dispatch, authError]);
  
  // Vérifier le statut de verrouillage
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLocked) {
        dispatch(resetFailedAttempts());
      }
    }, 60000); // Vérifier chaque minute
    
    return () => clearInterval(interval);
  }, [isLocked, dispatch]);
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const onSubmit = async (data) => {
    if (isLocked) {
      return;
    }
    
    try {
      await dispatch(loginUser({
        email: data.email,
        password: data.password,
        remember: data.remember
      })).unwrap();
      
      // Redirection après connexion réussie
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      // L'erreur est gérée par le reducer
      console.error('Erreur de connexion:', error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  
  // ========================================
  // 🎨 VALIDATIONS
  // ========================================
  
  const emailValidation = {
    required: 'L\'email est requis',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Format d\'email invalide'
    }
  };
  
  const passwordValidation = {
    required: 'Le mot de passe est requis',
    minLength: {
      value: 6,
      message: 'Le mot de passe doit contenir au moins 6 caractères'
    }
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  // ========================================
  // 🎯 RENDU
  // ========================================
  
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-pattern"></div>
      </div>
      
      <motion.div
        className="login-content"
        variants={containerVariants}
        initial="hidden"
        animate={isFormVisible ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div className="login-header" variants={itemVariants}>
          <div className="login-logo">
            <img src="/assets/logos/zengest-admin.svg" alt="Zengest Admin" />
          </div>
          <h1>Interface d'Administration</h1>
          <p>Connectez-vous pour accéder au tableau de bord</p>
        </motion.div>
        
        {/* Formulaire */}
        <motion.div className="login-form-container" variants={itemVariants}>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Message de verrouillage */}
            <AnimatePresence>
              {isLocked && (
                <motion.div
                  className="alert alert-warning"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ExclamationTriangleIcon className="alert-icon" />
                  <div className="alert-content">
                    <h3>Compte temporairement verrouillé</h3>
                    <p>Trop de tentatives de connexion échouées. Veuillez patienter 15 minutes.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Erreur générale */}
            <AnimatePresence>
              {authError && !isLocked && (
                <motion.div
                  className="alert alert-error"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ExclamationTriangleIcon className="alert-icon" />
                  <div className="alert-content">
                    <p>{authError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Champ Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <div className="form-input-wrapper">
                <EnvelopeIcon className="input-icon" />
                <input
                  {...register('email', emailValidation)}
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="votre.email@zengest.com"
                  disabled={isLoading || isLocked}
                  autoComplete="email"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="form-error"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Champ Mot de passe */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="form-input-wrapper">
                <LockClosedIcon className="input-icon" />
                <input
                  {...register('password', passwordValidation)}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Votre mot de passe"
                  disabled={isLoading || isLocked}
                  autoComplete="current-password"
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isLoading || isLocked}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="icon" />
                  ) : (
                    <EyeIcon className="icon" />
                  )}
                </motion.button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className="form-error"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  {...register('remember')}
                  type="checkbox"
                  className="checkbox-input"
                  disabled={isLoading || isLocked}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Se souvenir de moi</span>
              </label>
              
              <motion.button
                type="button"
                className="forgot-password-link"
                onClick={handleForgotPassword}
                whileHover={{ scale: 1.02 }}
                disabled={isLoading || isLocked}
              >
                Mot de passe oublié ?
              </motion.button>
            </div>
            
            {/* Bouton de connexion */}
            <motion.button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={!isValid || isLoading || isLocked}
              whileHover={{ scale: isValid && !isLoading && !isLocked ? 1.02 : 1 }}
              whileTap={{ scale: isValid && !isLoading && !isLocked ? 0.98 : 1 }}
            >
              {isLoading ? (
                <div className="button-loading">
                  <div className="spinner"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <div className="button-content">
                  <ShieldCheckIcon className="button-icon" />
                  <span>Se connecter</span>
                  <ArrowRightIcon className="button-arrow" />
                </div>
              )}
            </motion.button>
            
            {/* Informations de sécurité */}
            <div className="security-info">
              <p>
                <ShieldCheckIcon className="security-icon" />
                Connexion sécurisée SSL
              </p>
            </div>
          </form>
        </motion.div>
        
        {/* Footer */}
        <motion.div className="login-footer" variants={itemVariants}>
          <p>
            Besoin d'aide ? Contactez votre administrateur système
          </p>
          <div className="footer-links">
            <span>© 2024 Zengest</span>
            <span>•</span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Confidentialité
            </a>
            <span>•</span>
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Conditions
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;