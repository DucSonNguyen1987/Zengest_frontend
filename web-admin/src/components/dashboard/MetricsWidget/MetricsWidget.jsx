import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import './MetricsWidget.scss';

const MetricsWidget = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'neutral',
  color = 'default',
  size = 'normal',
  loading = false
}) => {
  
  const getWidgetClasses = () => {
    const classes = ['metrics-widget'];
    
    classes.push(`metrics-widget--${color}`);
    classes.push(`metrics-widget--${size}`);
    classes.push(`metrics-widget--trend-${trend}`);
    
    if (loading) classes.push('metrics-widget--loading');
    
    return classes.join(' ');
  };
  
  if (loading) {
    return (
      <div className={getWidgetClasses()}>
        <div className="metrics-widget__content">
          <div className="metrics-widget__icon skeleton"></div>
          <div className="metrics-widget__info">
            <div className="skeleton skeleton--text"></div>
            <div className="skeleton skeleton--small"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      className={getWidgetClasses()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="metrics-widget__content">
        {Icon && (
          <div className="metrics-widget__icon">
            <Icon className="icon" />
          </div>
        )}
        
        <div className="metrics-widget__info">
          <h4 className="metrics-widget__title">{title}</h4>
          <div className="metrics-widget__value">{value}</div>
          {subtitle && (
            <p className="metrics-widget__subtitle">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

MetricsWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  loading: PropTypes.bool
};

export default MetricsWidget;