import React from 'react';

const TypingIndicator = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="typing-indicator">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
      <span className="text-sm text-muted-foreground caption">AI is thinking...</span>
    </div>
  );
};

export default TypingIndicator;