import React from 'react';
import { ChatProvider, useChatContext } from './context/ChatContext';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';

const ChatContainer: React.FC = () => {
  const { messages, isLoading, resetChat, sendMessage } = useChatContext();

  return (
    <div className="app">
      <header>
        <h1>RAG News Chatbot</h1>
        <div className="actions">
          <button onClick={resetChat}>New Chat</button>
        </div>
      </header>
      <main>
        <ChatMessages messages={messages} loading={isLoading} />
      </main>
      <footer>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ChatProvider>
      <ChatContainer />
    </ChatProvider>
  );
}


