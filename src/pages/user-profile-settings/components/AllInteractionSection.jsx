import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIInteractionSection = ({ 
  aiSettings, 
  onChange, 
  onSave, 
  isSaving 
}) => {
  const verbosityOptions = [
    { value: 'concise', label: 'Concise', description: 'Brief, to-the-point responses' },
    { value: 'balanced', label: 'Balanced', description: 'Moderate detail level' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' }
  ];

  const formatOptions = [
    { value: 'text', label: 'Plain Text', description: 'Simple text responses' },
    { value: 'markdown', label: 'Markdown', description: 'Formatted with markdown' },
    { value: 'structured', label: 'Structured', description: 'Organized with headings and lists' }
  ];

  const contextLengthOptions = [
    { value: 'short', label: 'Short (5 messages)', description: 'Recent context only' },
    { value: 'medium', label: 'Medium (10 messages)', description: 'Balanced context' },
    { value: 'long', label: 'Long (20 messages)', description: 'Extended conversation history' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          AI Interaction Settings
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Configure how the AI responds to your queries
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Response Verbosity"
          options={verbosityOptions}
          value={aiSettings?.verbosity}
          onChange={(value) => onChange('verbosity', value)}
          description="Control response length and detail"
        />

        <Select
          label="Response Format"
          options={formatOptions}
          value={aiSettings?.format}
          onChange={(value) => onChange('format', value)}
          description="Choose how responses are formatted"
        />

        <Select
          label="Context Length"
          options={contextLengthOptions}
          value={aiSettings?.contextLength}
          onChange={(value) => onChange('contextLength', value)}
          description="How much conversation history to consider"
          className="md:col-span-2"
        />
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Sparkles" size={20} />
          Advanced Features
        </h4>

        <div className="space-y-3 pl-0 md:pl-7">
          <Checkbox
            label="Smart Suggestions"
            description="Show suggested follow-up questions"
            checked={aiSettings?.smartSuggestions}
            onChange={(e) => onChange('smartSuggestions', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-Complete"
            description="Enable query auto-completion"
            checked={aiSettings?.autoComplete}
            onChange={(e) => onChange('autoComplete', e?.target?.checked)}
          />

          <Checkbox
            label="Code Highlighting"
            description="Syntax highlighting for code snippets"
            checked={aiSettings?.codeHighlighting}
            onChange={(e) => onChange('codeHighlighting', e?.target?.checked)}
          />

          <Checkbox
            label="Link Previews"
            description="Show previews for shared links"
            checked={aiSettings?.linkPreviews}
            onChange={(e) => onChange('linkPreviews', e?.target?.checked)}
          />

          <Checkbox
            label="Fact Checking"
            description="Verify factual claims when possible"
            checked={aiSettings?.factChecking}
            onChange={(e) => onChange('factChecking', e?.target?.checked)}
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
          Save AI Settings
        </Button>
      </div>
    </div>
  );
};

export default AIInteractionSection;