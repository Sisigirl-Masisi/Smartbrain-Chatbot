import React from 'react';
import Input from '../../../components/ui/Input';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySection = ({ 
  passwordData,
  twoFactorEnabled,
  activeSessions,
  errors,
  onPasswordChange,
  onPasswordSave,
  onToggle2FA,
  onTerminateSession,
  isSaving,
  isToggling2FA
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Security Settings
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Manage your account security and authentication
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Lock" size={20} />
            Change Password
          </h4>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={passwordData?.currentPassword}
              onChange={onPasswordChange}
              error={errors?.currentPassword}
              required
            />

            <Input
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData?.newPassword}
              onChange={onPasswordChange}
              error={errors?.newPassword}
              description="Must be at least 8 characters with uppercase, lowercase, and numbers"
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={passwordData?.confirmPassword}
              onChange={onPasswordChange}
              error={errors?.confirmPassword}
              required
            />

            <div className="flex justify-end">
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                onClick={onPasswordSave}
                loading={isSaving}
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="ShieldCheck" size={20} />
            Two-Factor Authentication
          </h4>

          <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h5 className="text-base font-semibold text-foreground mb-2">
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled 
                    ? 'Your account is protected with two-factor authentication' :'Add an extra layer of security to your account'}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${twoFactorEnabled ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                {twoFactorEnabled ? 'Active' : 'Inactive'}
              </div>
            </div>

            <Button
              variant={twoFactorEnabled ? 'destructive' : 'default'}
              iconName={twoFactorEnabled ? 'ShieldOff' : 'ShieldCheck'}
              iconPosition="left"
              onClick={onToggle2FA}
              loading={isToggling2FA}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Monitor" size={20} />
            Active Sessions
          </h4>

          <div className="space-y-3">
            {activeSessions?.map((session) => (
              <div key={session?.id} className="bg-card rounded-lg p-4 md:p-6 border border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon name={session?.device === 'Desktop' ? 'Monitor' : 'Smartphone'} size={24} className="text-primary mt-1" />
                    <div className="flex-1">
                      <h5 className="text-base font-semibold text-foreground mb-1">
                        {session?.device} - {session?.browser}
                      </h5>
                      <p className="text-sm text-muted-foreground mb-1">
                        {session?.location}
                      </p>
                      <p className="text-xs text-muted-foreground caption">
                        Last active: {session?.lastActive}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {session?.current && (
                      <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium caption">
                        Current
                      </span>
                    )}
                    {!session?.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="LogOut"
                        onClick={() => onTerminateSession(session?.id)}
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;