import React, { useRef, useEffect } from 'react';
import { Message } from '../types/chat';
import { ChatMessage, TypingIndicator } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};