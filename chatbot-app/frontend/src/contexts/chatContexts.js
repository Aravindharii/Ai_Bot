import React, { createContext, useState } from 'react';

const ChatContext = createContext();  // Create the context

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };  // Export both ChatProvider and ChatContext
