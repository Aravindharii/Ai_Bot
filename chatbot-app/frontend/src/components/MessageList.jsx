// src/components/MessageList.jsx
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <div className="message-text">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
