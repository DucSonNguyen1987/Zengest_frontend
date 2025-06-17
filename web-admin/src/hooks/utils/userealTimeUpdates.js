import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Hook pour les mises à jour en temps réel
 */
export const useRealTimeUpdates = (actions = [], interval = 30000, enabled = true) => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled || actions.length === 0) return;

    const executeActions = () => {
      actions.forEach(action => {
        if (typeof action === 'function') {
          dispatch(action());
        }
      });
    };

    // Exécuter immédiatement
    executeActions();

    // Puis à intervalle régulier
    intervalRef.current = setInterval(executeActions, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, actions, interval, enabled]);

  const stopUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startUpdates = () => {
    if (!intervalRef.current && enabled) {
      intervalRef.current = setInterval(() => {
        actions.forEach(action => {
          if (typeof action === 'function') {
            dispatch(action());
          }
        });
      }, interval);
    }
  };

  return { stopUpdates, startUpdates };
};