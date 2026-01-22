import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacySection = ({ 
  privacySettings, 
  onChange, 
  onExportData, 
  onDeleteData, 
  isSaving,
  isExporting,
  isDeleting 
}) => {
  const retentionOptions = [
    { value: '7days', label: '7 Days', description: 'Delete after one week' },
    { value: '30days', label: '30 Days', description: 'Delete after one month' },
    { value: '90days', label: '90 Days', description: 'Delete after three months' },
    { value: '1year', label: '1 Year', description: 'Delete after one year' },
    { value: 'never', label: 'Never', description: 'Keep indefinitely' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Privacy & Data
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Manage your data privacy and conversation retention
        </p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
              Data Protection
            </h4>
            <p className="text-sm md:text-base text-muted-foreground">
              Your conversations are encrypted end-to-end and stored securely. We never share your data with third parties without your explicit consent.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Data Retention Period"
          options={retentionOptions}
          value={privacySettings?.retentionPeriod}
          onChange={(value) => onChange('retentionPeriod', value)}
          description="Automatically delete conversations after this period"
        />

        <div className="space-y-3 pt-2">
          <Checkbox
            label="Allow Analytics"
            description="Help improve the service by sharing anonymous usage data"
            checked={privacySettings?.allowAnalytics}
            onChange={(e) => onChange('allowAnalytics', e?.target?.checked)}
          />

          <Checkbox
            label="Personalized Experience"
            description="Use conversation history to personalize responses"
            checked={privacySettings?.personalizedExperience}
            onChange={(e) => onChange('personalizedExperience', e?.target?.checked)}
          />

          <Checkbox
            label="Share Conversations"
            description="Allow sharing conversations via public links"
            checked={privacySettings?.shareConversations}
            onChange={(e) => onChange('shareConversations', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Database" size={20} />
          Data Management
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
            <Icon name="Download" size={24} className="text-primary mb-3" />
            <h5 className="text-base font-semibold text-foreground mb-2">
              Export Your Data
            </h5>
            <p className="text-sm text-muted-foreground mb-4">
              Download all your conversations and profile data in JSON format
            </p>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={onExportData}
              loading={isExporting}
              fullWidth
            >
              Export Data
            </Button>
          </div>

          <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
            <Icon name="Trash2" size={24} className="text-error mb-3" />
            <h5 className="text-base font-semibold text-foreground mb-2">
              Delete All Data
            </h5>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete all conversations and account data
            </p>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={onDeleteData}
              loading={isDeleting}
              fullWidth
            >
              Delete Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;