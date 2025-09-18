import { useState, useCallback } from 'react';
import { ChatResponse, ChatHistory, Message } from '../types/chat';
import * as api from '../api';

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, sessionId?: string): Promise<ChatResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.sendMessage(content, sessionId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getHistory = useCallback(async (sessionId: string): Promise<ChatHistory> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getHistory(sessionId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get history';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetSession = useCallback(async (sessionId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.resetSession(sessionId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset session';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendMessage,
    getHistory,
    resetSession,
  };
};