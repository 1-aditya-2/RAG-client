import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { ChatState, Message } from '../types/chat';
import { useChatAPI } from '../hooks/useChatAPI';

interface ChatContextValue extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'RESET' };

const initialState: ChatState = {
  sessionId: localStorage.getItem('sessionId') || '',
  messages: [],
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.payload };
    case 'RESET':
      return { ...initialState, sessionId: '' };
    default:
      return state;
  }
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { sendMessage: apiSendMessage, resetSession, getHistory } = useChatAPI();

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await apiSendMessage(content, state.sessionId);
      if (!state.sessionId && response.sessionId) {
        dispatch({ type: 'SET_SESSION_ID', payload: response.sessionId });
        localStorage.setItem('sessionId', response.sessionId);
      }
      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { role: 'assistant', content: response.answer }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      // Remove the user message if the request failed
      dispatch({ 
        type: 'SET_MESSAGES', 
        payload: state.messages.filter(m => m !== userMessage)
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.sessionId, state.messages, apiSendMessage]);

  const resetChat = useCallback(async () => {
    if (state.sessionId) {
      try {
        await resetSession(state.sessionId);
        localStorage.removeItem('sessionId');
        dispatch({ type: 'RESET' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to reset chat';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      }
    }
  }, [state.sessionId, resetSession]);

  React.useEffect(() => {
    if (state.sessionId) {
      getHistory(state.sessionId)
        .then(response => dispatch({ type: 'SET_MESSAGES', payload: response.history }))
        .catch(error => {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load history';
          dispatch({ type: 'SET_ERROR', payload: errorMessage });
        });
    }
  }, [state.sessionId, getHistory]);

  const value = {
    ...state,
    sendMessage,
    resetChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};