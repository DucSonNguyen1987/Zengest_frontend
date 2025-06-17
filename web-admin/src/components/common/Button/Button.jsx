// src/components/common/Button/Button.jsx - Composant bouton réutilisable
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Styles
import './Button.scss';

// ========================================
// 🎯 COMPOSANT BUTTON
// ========================================

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  style = {},
  animate = true,
  ...rest
}, ref) => {
  
  // ========================================
  // 🎨 CLASSES CSS
  // ========================================
  
  const getButtonClasses = () => {
    const classes = ['button'];
    
    // Variante
    classes.push(`button--${variant}`);
    
    // Taille
    classes.push(`button--${size}`);
    
    // États
    if (disabled) classes.push('button--disabled');
    if (loading) classes.push('button--loading');
    if (fullWidth) classes.push('button--full-width');
    if (Icon) classes.push('button--with-icon');
    if (Icon && !children) classes.push('button--icon-only');
    
    // Position de l'icône
    if (Icon && children) {
      classes.push(`button--icon-${iconPosition}`);
    }
    
    // Classes personnalisées
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  // ========================================
  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS
  // ========================================
  
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  
  const buttonVariants = {
    hover: {
      scale: animate ? 1.02 : 1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: animate ? 0.98 : 1,
      transition: { duration: 0.1 }
    }
  };
  
  // ========================================
  // 🎯 RENDU DU CONTENU
  // ========================================
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="button__content">
          <div className="button__spinner">
            <div className="spinner"></div>
          </div>
          {children && (
            <span className="button__text button__text--loading">
              {children}
            </span>
          )}
        </div>
      );
    }
    
    if (Icon && !children) {
      // Bouton icône seule
      return (
        <div className="button__content">
          <Icon className="button__icon" />
        </div>
      );
    }
    
    if (Icon && children) {
      // Bouton avec icône et texte
      return (
        <div className="button__content">
          {iconPosition === 'left' && (
            <Icon className="button__icon button__icon--left" />
          )}
          <span className="button__text">{children}</span>
          {iconPosition === 'right' && (
            <Icon className="button__icon button__icon--right" />
          )}
        </div>
      );
    }
    
    // Bouton texte seul
    return (
      <div className="button__content">
        <span className="button__text">{children}</span>
      </div>
    );
  };
  
  // ========================================
  // 🎯 RENDU PRINCIPAL
  // ========================================
  
  const ButtonComponent = animate ? motion.button : 'button';
  const animationProps = animate ? {
    variants: buttonVariants,
    whileHover: !disabled && !loading ? 'hover' : {},
    whileTap: !disabled && !loading ? 'tap' : {}
  } : {};
  
  return (
    <ButtonComponent
      ref={ref}
      type={type}
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
      style={style}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...animationProps}
      {...rest}
    >
      {renderContent()}
    </ButtonComponent>
  );
});

Button.displayName = 'Button';

// ========================================
// 🎯 PROP TYPES
// ========================================

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary', 
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'ghost',
    'outline'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  animate: PropTypes.bool
};

// ========================================
// 🎯 VARIANTES DE BOUTONS
// ========================================

// Bouton primaire
export const PrimaryButton = (props) => (
  <Button variant="primary" {...props} />
);

// Bouton secondaire
export const SecondaryButton = (props) => (
  <Button variant="secondary" {...props} />
);

// Bouton de succès
export const SuccessButton = (props) => (
  <Button variant="success" {...props} />
);

// Bouton de danger
export const DangerButton = (props) => (
  <Button variant="danger" {...props} />
);

// Bouton d'avertissement
export const WarningButton = (props) => (
  <Button variant="warning" {...props} />
);

// Bouton fantôme
export const GhostButton = (props) => (
  <Button variant="ghost" {...props} />
);

// Bouton outline
export const OutlineButton = (props) => (
  <Button variant="outline" {...props} />
);

// Bouton icône
export const IconButton = ({ icon: Icon, size = 'medium', ...props }) => (
  <Button 
    icon={Icon} 
    size={size}
    className="button--icon-only"
    {...props} 
  />
);

export default Button;