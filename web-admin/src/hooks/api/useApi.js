import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

/**
 * Hook générique pour les appels API
 */
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const {
    immediate = true,
    showErrorToast = true,
    showSuccessToast = false,
    onSuccess,
    onError
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      setData(result);
      
      if (showSuccessToast) {
        toast.success('Opération réussie');
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur inconnue';
      setError(errorMessage);
      
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, showErrorToast, showSuccessToast, onSuccess, onError]);

  useEffect(() => {
    if (immediate && apiFunction) {
      execute();
    }
  }, [...dependencies, execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute
  };
};