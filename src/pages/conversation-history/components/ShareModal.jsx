import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShareModal = ({ conversation, onClose, onShare }) => {
  const [shareEmail, setShareEmail] = useState('');
  const [allowEditing, setAllowEditing] = useState(false);
  const [expiresIn, setExpiresIn] = useState('never');
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareLink = `https://smartbrain.app/shared/${conversation?.id}`;

  const handleCopyLink = async () => {
    await navigator.clipboard?.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onShare({
      conversation,
      email: shareEmail,
      allowEditing,
      expiresIn
    });
    setIsSharing(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Share Conversation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSharing}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              {conversation?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {conversation?.messageCount} messages • {new Date(conversation.date)?.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-3">Share Link</p>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="default"
                onClick={handleCopyLink}
                iconName={isCopied ? 'Check' : 'Copy'}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Share Options</p>
            <Checkbox
              label="Allow editing"
              description="Recipients can modify the conversation"
              checked={allowEditing}
              onChange={(e) => setAllowEditing(e?.target?.checked)}
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Anyone with this link will be able to view the conversation. The link will remain active until you revoke access.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isSharing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleShare}
            loading={isSharing}
            iconName="Share2"
            iconPosition="left"
          >
            {isSharing ? 'Sharing...' : 'Share'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;