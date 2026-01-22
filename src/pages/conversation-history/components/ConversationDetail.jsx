import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationDetail = ({ conversation, onClose }) => {
  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-base md:text-lg">Select a conversation to view details</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDuration = () => {
    if (!conversation?.startTime || !conversation?.endTime) return 'N/A';
    const start = new Date(conversation.startTime);
    const end = new Date(conversation.endTime);
    const diffMinutes = Math.floor((end - start) / (1000 * 60));
    if (diffMinutes < 60) return `${diffMinutes} minutes`;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border shadow-md">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Conversation Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            {conversation?.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {conversation?.snippet}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">Date & Time</p>
              <p className="text-sm text-muted-foreground">{formatDate(conversation?.date)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="var(--color-secondary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">Duration</p>
              <p className="text-sm text-muted-foreground">{getDuration()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon name="MessageCircle" size={20} color="var(--color-accent)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">Messages</p>
              <p className="text-sm text-muted-foreground">{conversation?.messageCount} total messages</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Tag" size={20} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-2">Topics</p>
              <div className="flex flex-wrap gap-2">
                {conversation?.tags && conversation?.tags?.length > 0 ? (
                  conversation?.tags?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No tags</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">User Messages</p>
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {Math.floor(conversation?.messageCount / 2)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">AI Responses</p>
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {Math.ceil(conversation?.messageCount / 2)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Avg Response Time</p>
              <p className="text-lg md:text-xl font-semibold text-foreground">2.3s</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Satisfaction</p>
              <p className="text-lg md:text-xl font-semibold text-foreground">95%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 border-t border-border space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="Eye"
          iconPosition="left"
        >
          View Full Conversation
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;