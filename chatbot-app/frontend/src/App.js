import React from 'react';
import { ChatProvider } from './contexts/chatContexts';  // Correct import
import ChatWindow from './components/ChatWindow';

const App = () => {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
};

export default App;
