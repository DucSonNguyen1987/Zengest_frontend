import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

/**
 * Hook pour la connexion WebSocket
 */
export const useWebSocket = (url, options = {}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);

  const { 
    maxReconnectAttempts = 5, 
    reconnectInterval = 3000,
    autoConnect = true
  } = options;

  const connect = useCallback(() => {
    if (!isAuthenticated || !autoConnect) return;

    try {
      const token = localStorage.getItem('zengest_admin_token');
      const wsUrl = `${url}?token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connecté');
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Traiter les messages selon le type
          if (options.onMessage) {
            options.onMessage(data);
          }
        } catch (err) {
          console.error('Erreur parsing message WebSocket:', err);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket fermé');
        setIsConnected(false);
        setSocket(null);

        // Tentative de reconnexion
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        console.error('Erreur WebSocket:', error);
        setError('Erreur de connexion WebSocket');
      };

      setSocket(ws);
    } catch (err) {
      setError('Impossible de créer la connexion WebSocket');
    }
  }, [url, isAuthenticated, autoConnect, maxReconnectAttempts, reconnectInterval, options]);

  useEffect(() => {
    if (isAuthenticated && autoConnect) {
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [isAuthenticated, connect]);

  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  }, [socket, isConnected]);

  return {
    socket,
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect: () => socket?.close()
  };
};