import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RenameModal = ({ conversation, onClose, onRename }) => {
  const [newTitle, setNewTitle] = useState(conversation?.title);
  const [isRenaming, setIsRenaming] = useState(false);
  const [error, setError] = useState('');

  const handleRename = async () => {
    if (!newTitle?.trim()) {
      setError('Title cannot be empty');
      return;
    }

    if (newTitle?.trim() === conversation?.title) {
      onClose();
      return;
    }

    setIsRenaming(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRename({ ...conversation, title: newTitle?.trim() });
    setIsRenaming(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Rename Conversation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isRenaming}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <Input
            label="Conversation Title"
            type="text"
            placeholder="Enter new title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e?.target?.value);
              setError('');
            }}
            error={error}
            required
          />

          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Original: </span>
              {conversation?.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isRenaming}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleRename}
            loading={isRenaming}
            iconName="Check"
            iconPosition="left"
          >
            {isRenaming ? 'Renaming...' : 'Rename'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;