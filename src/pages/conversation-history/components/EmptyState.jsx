import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            No conversations found
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            We couldn't find any conversations matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Icon name="MessageSquare" size={32} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          No conversations yet
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Start a conversation with SmartBrain AI to see your chat history here. All your conversations will be saved and easily accessible.
        </p>
        <Button
          variant="default"
          onClick={() => navigate('/chat-interface')}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Start New Chat
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;