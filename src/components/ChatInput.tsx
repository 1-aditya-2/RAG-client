import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSend(trimmedInput);
      setInput('');
    }
  };

  return (
    <div className="input-container">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Ask about current news..."
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled || !input.trim()}>
        {disabled ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
};
