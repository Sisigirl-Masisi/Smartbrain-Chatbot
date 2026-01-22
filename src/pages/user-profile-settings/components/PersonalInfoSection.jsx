import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onChange, 
  onSave, 
  isSaving 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Personal Information
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Update your personal details and contact information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={onChange}
          error={errors?.email}
          description="We'll never share your email with anyone"
          required
          className="md:col-span-2"
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="+1 (555) 000-0000"
          value={formData?.phone}
          onChange={onChange}
          error={errors?.phone}
        />

        <Input
          label="Time Zone"
          type="text"
          name="timezone"
          placeholder="America/New_York"
          value={formData?.timezone}
          onChange={onChange}
          description="Used for scheduling and timestamps"
        />

        <Input
          label="Bio"
          type="text"
          name="bio"
          placeholder="Tell us about yourself"
          value={formData?.bio}
          onChange={onChange}
          description="Brief description about yourself"
          className="md:col-span-2"
        />
      </div>
      <div className="flex justify-end pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSection;