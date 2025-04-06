import React from 'react';

const MessageInput = ({ input, setInput, handleSend, isLoading, clearChat }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() && !isLoading) handleSend();
  };

  return (
    <div className="message-input-container mt-2 p-2 bg-dark border-top border-secondary">
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary custom-input"
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
        {/* <button
          onClick={clearChat}
          className="btn btn-outline-danger ms-2"
          disabled={isLoading}
        >
          Clear
        </button> */}
      </div>
    </div>
  );
};

export default MessageInput;
