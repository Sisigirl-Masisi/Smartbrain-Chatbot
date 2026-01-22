import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ conversation, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'json', label: 'JSON Format' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'html', label: 'HTML Document' },
    { value: 'markdown', label: 'Markdown' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onExport({
      conversation,
      format: exportFormat,
      includeMetadata,
      includeTimestamps
    });
    setIsExporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Export Conversation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isExporting}
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

          <Select
            label="Export Format"
            description="Choose the file format for export"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Export Options</p>
            <Checkbox
              label="Include metadata"
              description="Date, time, and conversation details"
              checked={includeMetadata}
              onChange={(e) => setIncludeMetadata(e?.target?.checked)}
            />
            <Checkbox
              label="Include timestamps"
              description="Show timestamp for each message"
              checked={includeTimestamps}
              onChange={(e) => setIncludeTimestamps(e?.target?.checked)}
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                The exported file will be downloaded to your device. Large conversations may take a few moments to process.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;