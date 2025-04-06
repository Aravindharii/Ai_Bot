import React, { useState, useContext } from 'react';
import { ChatContext } from '../contexts/chatContexts';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const { messages, setMessages } = useContext(ChatContext);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await axios.post('https://ai-bot-backend-fsws.onrender.com/chat', { message: input });
        const botReply = { text: response.data.reply, sender: 'bot' };
        setMessages((prev) => [...prev, botReply]);
      } catch (error) {
        setMessages((prev) => [...prev, { text: 'Error! Try again.', sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-window bg-dark text-light p-3 rounded shadow d-flex flex-column">
        <MessageList messages={messages} />
        {isLoading && <div className="text-center text-info">Typing...</div>}
        <MessageInput input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
