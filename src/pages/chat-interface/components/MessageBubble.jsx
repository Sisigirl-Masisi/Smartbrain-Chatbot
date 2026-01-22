import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderContent = () => {
    if (message?.type === 'text') {
      return <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message?.content}</p>;
    }

    if (message?.type === 'code') {
      return (
        <div className="bg-background/50 rounded-lg p-3 md:p-4 overflow-x-auto">
          <pre className="text-xs md:text-sm mono text-foreground">
            <code>{message?.content}</code>
          </pre>
        </div>
      );
    }

    if (message?.type === 'image') {
      return (
        <div className="rounded-lg overflow-hidden max-w-xs md:max-w-sm">
          <Image 
            src={message?.content} 
            alt={message?.contentAlt}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    }

    if (message?.type === 'file') {
      return (
        <div className="flex items-center gap-3 p-3 md:p-4 bg-background/50 rounded-lg">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 rounded-lg">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-medium truncate">{message?.fileName}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{message?.fileSize}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`flex gap-2 md:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4 md:mb-6`}>
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
        {message?.avatar ? (
          <Image 
            src={message?.avatar} 
            alt={message?.avatarAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon 
            name={isUser ? 'User' : 'Bot'} 
            size={16} 
            color="var(--color-primary)" 
          />
        )}
      </div>
      <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
          {renderContent()}
        </div>

        <div className="flex items-center gap-2 px-2">
          <span className="text-xs caption text-muted-foreground">{formatTime(message?.timestamp)}</span>
          {isUser && (
            <Icon 
              name={message?.status === 'sent' ? 'Check' : 'CheckCheck'} 
              size={14} 
              color={message?.status === 'read' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;