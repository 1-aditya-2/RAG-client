import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`msg ${message.role}`}>
      <div className="bubble">{message.content}</div>
    </div>
  );
};

export const TypingIndicator: React.FC = () => {
  return (
    <div className="msg assistant">
      <div className="bubble typing">
        AI is thinking
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};
