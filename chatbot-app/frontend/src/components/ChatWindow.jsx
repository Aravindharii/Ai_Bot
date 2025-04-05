// src/components/ChatWindow.jsx
import React, { useState, useContext } from 'react';
import { ChatContext } from '../contexts/chatContexts';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';
import '../styles/ChatWindow.css'; // Import custom CSS for styling

const ChatWindow = () => {
  const { messages, setMessages } = useContext(ChatContext);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await axios.post('http://localhost:5000/chat', { message: input });
        const botReply = { text: response.data.reply, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      } catch (error) {
        console.error('Error sending message:', error);

        const errorMessage = { text: 'Sorry, there was an error. Please try again.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-window bg-dark p-4 rounded shadow-lg d-flex flex-column">
        <MessageList messages={messages} />
        {isLoading && <div className="text-center text-info">Typing...</div>}
        <MessageInput input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
