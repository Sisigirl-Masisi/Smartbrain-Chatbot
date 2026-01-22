import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatPreferencesSection = ({ 
  preferences, 
  onChange, 
  onSave, 
  isSaving 
}) => {
  const themeOptions = [
    { value: 'light', label: 'Light', description: 'Bright and clean interface' },
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', description: 'Matches system preference' }
  ];

  const densityOptions = [
    { value: 'comfortable', label: 'Comfortable', description: 'More spacing between messages' },
    { value: 'compact', label: 'Compact', description: 'Fits more messages on screen' },
    { value: 'cozy', label: 'Cozy', description: 'Balanced spacing' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Chat Preferences
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Customize your chat interface and interaction experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Theme"
          options={themeOptions}
          value={preferences?.theme}
          onChange={(value) => onChange('theme', value)}
          description="Choose your preferred color scheme"
        />

        <Select
          label="Message Density"
          options={densityOptions}
          value={preferences?.density}
          onChange={(value) => onChange('density', value)}
          description="Adjust message spacing"
        />

        <Select
          label="Language"
          options={languageOptions}
          value={preferences?.language}
          onChange={(value) => onChange('language', value)}
          searchable
          description="Select your preferred language"
          className="md:col-span-2"
        />
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Bell" size={20} />
          Notification Settings
        </h4>

        <div className="space-y-3 pl-0 md:pl-7">
          <Checkbox
            label="Desktop Notifications"
            description="Show notifications when you receive new messages"
            checked={preferences?.desktopNotifications}
            onChange={(e) => onChange('desktopNotifications', e?.target?.checked)}
          />

          <Checkbox
            label="Sound Alerts"
            description="Play sound when receiving messages"
            checked={preferences?.soundAlerts}
            onChange={(e) => onChange('soundAlerts', e?.target?.checked)}
          />

          <Checkbox
            label="Email Notifications"
            description="Receive email summaries of conversations"
            checked={preferences?.emailNotifications}
            onChange={(e) => onChange('emailNotifications', e?.target?.checked)}
          />

          <Checkbox
            label="Show Typing Indicators"
            description="Display when AI is generating response"
            checked={preferences?.typingIndicators}
            onChange={(e) => onChange('typingIndicators', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          loading={isSaving}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default ChatPreferencesSection;