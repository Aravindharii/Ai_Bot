// src/components/MessageInput.jsx
import React from 'react';

const MessageInput = ({ input, setInput, handleSend, isLoading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <input
        type="text"
        className="form-control mr-2 custom-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button
        onClick={handleSend}
        className="btn btn-primary custom-btn"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </div>
  );
};

export default MessageInput;
