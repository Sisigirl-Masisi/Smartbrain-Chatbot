import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ conversations, activeConversationId, onSelectConversation, onNewConversation, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return date?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[130] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed lg:relative top-0 left-0 h-full w-80 bg-card border-r border-border z-[140] lg:z-auto transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Conversations</h2>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted focus-ring"
            aria-label="Close sidebar"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 border-b border-border">
          <Button
            variant="default"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={onNewConversation}
            className="mb-4"
          >
            New Conversation
          </Button>

          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
          {filteredConversations?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground caption">No conversations found</p>
            </div>
          ) : (
            filteredConversations?.map((conv) => (
              <button
                key={conv?.id}
                onClick={() => {
                  onSelectConversation(conv?.id);
                  onClose();
                }}
                className={`w-full text-left p-3 md:p-4 rounded-lg transition-all duration-250 ease-out focus-ring ${
                  activeConversationId === conv?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                    {conv?.title}
                  </h3>
                  <span className="text-xs caption text-muted-foreground whitespace-nowrap">
                    {formatDate(conv?.lastMessageTime)}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {conv?.lastMessage}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default ConversationSidebar;