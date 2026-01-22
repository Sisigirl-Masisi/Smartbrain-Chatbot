import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, disabled }) => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const suggestions = [
    "Explain quantum computing",
    "Write a Python function",
    "Summarize this document",
    "Help me debug code"
  ];

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = '';
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    textareaRef?.current?.focus();
  };

  return (
    <div className="border-t border-border bg-card p-4 md:p-6">
      {!isExpanded && message?.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm caption bg-muted hover:bg-muted/80 text-foreground rounded-full transition-all duration-250 ease-out focus-ring"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 md:gap-3">
        <button
          type="button"
          onClick={handleFileClick}
          disabled={disabled}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all duration-250 ease-out focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Upload file"
        >
          <Icon name="Paperclip" size={20} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        />

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => message?.length === 0 && setIsExpanded(false)}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 md:px-5 md:py-3.5 text-sm md:text-base bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-250 ease-out"
            style={{ minHeight: '48px', maxHeight: '200px' }}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12"
          aria-label="Send message"
        >
          <Icon name="Send" size={20} />
        </Button>
      </form>
      <p className="text-xs caption text-muted-foreground mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};

export default MessageInput;