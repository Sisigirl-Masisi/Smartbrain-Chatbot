import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ConversationCard = ({ 
  conversation, 
  onSelect, 
  onRename, 
  onExport, 
  onShare, 
  onDelete,
  isSelected 
}) => {
  const formatDate = (date) => {
    const now = new Date();
    const conversationDate = new Date(date);
    const diffTime = Math.abs(now - conversationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return conversationDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMessageCount = () => {
    return conversation?.messageCount || 0;
  };

  return (
    <div 
      className={`card cursor-pointer transition-all duration-250 ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}`}
      onClick={() => onSelect(conversation)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground truncate mb-1">
                {conversation?.title}
              </h3>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {formatDate(conversation?.date)}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={14} />
                  {getMessageCount()} messages
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e?.stopPropagation();
                onRename(conversation);
              }}
              className="w-8 h-8"
            >
              <Icon name="Edit2" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e?.stopPropagation();
                onDelete(conversation);
              }}
              className="w-8 h-8 text-error hover:text-error"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>

        <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
          {conversation?.snippet}
        </p>

        {conversation?.tags && conversation?.tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {conversation?.tags?.slice(0, 3)?.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary"
              >
                {tag}
              </span>
            ))}
            {conversation?.tags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{conversation?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onExport(conversation);
            }}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onShare(conversation);
            }}
            iconName="Share2"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;