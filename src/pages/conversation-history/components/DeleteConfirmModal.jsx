import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ conversation, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm(conversation);
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">Delete Conversation</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isDeleting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <p className="text-sm md:text-base text-foreground">
            Are you sure you want to delete this conversation?
          </p>
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-1">
              {conversation?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {conversation?.messageCount} messages • {new Date(conversation.date)?.toLocaleDateString()}
            </p>
          </div>

          <div className="bg-error/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error mb-1">This action cannot be undone</p>
                <p className="text-sm text-error/80">
                  The conversation and all its messages will be permanently deleted from your history.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            fullWidth
            onClick={handleDelete}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;