import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onExportAll, onDeleteAll, onDeselectAll }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 z-[90]">
      <div className="bg-card rounded-xl border border-border shadow-2xl p-4 max-w-md mx-auto lg:ml-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {selectedCount} selected
              </p>
              <button
                onClick={onDeselectAll}
                className="text-xs text-primary hover:underline"
              >
                Deselect all
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportAll}
              iconName="Download"
              iconSize={16}
            >
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteAll}
              iconName="Trash2"
              iconSize={16}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;