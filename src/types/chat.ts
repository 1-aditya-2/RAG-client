export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
  ts?: number;
}

export interface ChatResponse {
  sessionId?: string;
  answer: string;
  citations: Citation[];
}

export interface Citation {
  idx: number;
  title: string;
  url: string;
}

export interface ChatHistory {
  sessionId: string;
  history: Message[];
}

export interface ChatError {
  error: string;
  detail?: string;
}

export interface ChatState {
  sessionId: string;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}