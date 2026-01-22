import React, { useState } from 'react';
import NavigationHeader from '../../components/NavigationHeader';
import BottomNavigation from '../../components/BottomNavigation';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import ChatPreferencesSection from './components/ChatPreferencesSection';
import AIInteractionSection from './components/AllInteractionSection';
import PrivacySection from './components/PrivacySection';
import SecuritySection from './components/SecuritySection';
import UsageAnalyticsSection from './components/UsageAnalyticsSection';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb6cf439-1763299224286.png",
    avatarAlt: "Professional woman with long brown hair wearing white blouse smiling at camera in bright office setting",
    joinedDate: "January 2024",
    totalConversations: 1247
  });

  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    bio: "AI enthusiast and technology researcher"
  });

  const [formErrors, setFormErrors] = useState({});

  const [chatPreferences, setChatPreferences] = useState({
    theme: 'auto',
    density: 'cozy',
    language: 'en',
    desktopNotifications: true,
    soundAlerts: false,
    emailNotifications: true,
    typingIndicators: true
  });

  const [aiSettings, setAISettings] = useState({
    verbosity: 'balanced',
    format: 'markdown',
    contextLength: 'medium',
    smartSuggestions: true,
    autoComplete: true,
    codeHighlighting: true,
    linkPreviews: true,
    factChecking: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    retentionPeriod: '90days',
    allowAnalytics: true,
    personalizedExperience: true,
    shareConversations: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [activeSessions] = useState([
  {
    id: 1,
    device: "Desktop",
    browser: "Chrome 120",
    location: "New York, USA",
    lastActive: "Just now",
    current: true
  },
  {
    id: 2,
    device: "Mobile",
    browser: "Safari iOS",
    location: "New York, USA",
    lastActive: "2 hours ago",
    current: false
  },
  {
    id: 3,
    device: "Desktop",
    browser: "Firefox 121",
    location: "Boston, USA",
    lastActive: "1 day ago",
    current: false
  }]
  );

  const [analyticsData] = useState({
    totalConversations: "1,247",
    messagesSent: "8,932",
    avgResponseTime: "1.2s",
    apiCalls: "15,234",
    dataUsage: "2.4 GB",
    satisfactionRate: "94%",
    mostActiveDays: [
    { day: "Monday", count: 245, percentage: 85 },
    { day: "Wednesday", count: 198, percentage: 68 },
    { day: "Friday", count: 176, percentage: 61 },
    { day: "Tuesday", count: 154, percentage: 53 },
    { day: "Thursday", count: 132, percentage: 45 }],

    topTopics: [
    { name: "Technology", count: 342, percentage: 90 },
    { name: "Science", count: 287, percentage: 75 },
    { name: "Business", count: 213, percentage: 56 },
    { name: "Education", count: 178, percentage: 47 },
    { name: "Health", count: 145, percentage: 38 }],

    subscription: {
      plan: "Professional",
      apiLimit: "50,000",
      nextBilling: "February 15, 2026"
    }
  });

  const tabs = [
  { id: 'personal', label: 'Personal Info', icon: 'User' },
  { id: 'chat', label: 'Chat Preferences', icon: 'MessageSquare' },
  { id: 'ai', label: 'AI Interaction', icon: 'Brain' },
  { id: 'privacy', label: 'Privacy', icon: 'Shield' },
  { id: 'security', label: 'Security', icon: 'Lock' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }];


  const handleFormChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors?.[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSavePersonalInfo = () => {
    const errors = {};
    if (!formData?.firstName?.trim()) errors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) errors.email = 'Email is required';else
    if (!/\S+@\S+\.\S+/?.test(formData?.email)) errors.email = 'Invalid email format';

    if (Object.keys(errors)?.length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setProfileData((prev) => ({
        ...prev,
        name: `${formData?.firstName} ${formData?.lastName}`,
        email: formData?.email
      }));
      setIsSaving(false);
      alert('Personal information saved successfully!');
    }, 1500);
  };

  const handleImageUpload = (file) => {
    setIsUploading(true);
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader?.result,
          avatarAlt: "User uploaded profile photo showing person in professional setting"
        }));
        setIsUploading(false);
      };
      reader?.readAsDataURL(file);
    }, 1000);
  };

  const handleImageRemove = () => {
    setProfileData((prev) => ({
      ...prev,
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14f99bc91-1767522014091.png",
      avatarAlt: "Default avatar showing neutral silhouette on light background"
    }));
  };

  const handleChatPreferenceChange = (key, value) => {
    setChatPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChatPreferences = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Chat preferences saved successfully!');
    }, 1500);
  };

  const handleAISettingChange = (key, value) => {
    setAISettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAISettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('AI settings saved successfully!');
    }, 1500);
  };

  const handlePrivacySettingChange = (key, value) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Your data export has been initiated. You will receive a download link via email shortly.');
    }, 2000);
  };

  const handleDeleteData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        alert('Data deletion request submitted. Your data will be permanently deleted within 30 days.');
      }, 2000);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors?.[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordSave = () => {
    const errors = {};
    if (!passwordData?.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData?.newPassword) errors.newPassword = 'New password is required';else
    if (passwordData?.newPassword?.length < 8) errors.newPassword = 'Password must be at least 8 characters';
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors)?.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsSaving(false);
      alert('Password updated successfully!');
    }, 1500);
  };

  const handleToggle2FA = () => {
    setIsToggling2FA(true);
    setTimeout(() => {
      setTwoFactorEnabled(!twoFactorEnabled);
      setIsToggling2FA(false);
      alert(twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled successfully!');
    }, 1500);
  };

  const handleTerminateSession = (sessionId) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      alert('Session terminated successfully');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoSection
            formData={formData}
            errors={formErrors}
            onChange={handleFormChange}
            onSave={handleSavePersonalInfo}
            isSaving={isSaving} />);


      case 'chat':
        return (
          <ChatPreferencesSection
            preferences={chatPreferences}
            onChange={handleChatPreferenceChange}
            onSave={handleSaveChatPreferences}
            isSaving={isSaving} />);


      case 'ai':
        return (
          <AIInteractionSection
            aiSettings={aiSettings}
            onChange={handleAISettingChange}
            onSave={handleSaveAISettings}
            isSaving={isSaving} />);


      case 'privacy':
        return (
          <PrivacySection
            privacySettings={privacySettings}
            onChange={handlePrivacySettingChange}
            onExportData={handleExportData}
            onDeleteData={handleDeleteData}
            isSaving={isSaving}
            isExporting={isExporting}
            isDeleting={isDeleting} />);


      case 'security':
        return (
          <SecuritySection
            passwordData={passwordData}
            twoFactorEnabled={twoFactorEnabled}
            activeSessions={activeSessions}
            errors={passwordErrors}
            onPasswordChange={handlePasswordChange}
            onPasswordSave={handlePasswordSave}
            onToggle2FA={handleToggle2FA}
            onTerminateSession={handleTerminateSession}
            isSaving={isSaving}
            isToggling2FA={isToggling2FA} />);


      case 'analytics':
        return <UsageAnalyticsSection analyticsData={analyticsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader
        userRole="user"
        userName={profileData?.name}
        userEmail={profileData?.email} />

      <main className="main-content with-bottom-nav">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">
              Profile Settings
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Manage your account preferences and customize your experience
            </p>
          </div>

          <ProfileHeader
            profileData={profileData}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            isUploading={isUploading} />


          <div className="mt-6 md:mt-8">
            <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
              <div className="border-b border-border overflow-x-auto">
                <nav className="flex min-w-max lg:min-w-0">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium transition-all duration-250 border-b-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab?.id ?
                    'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'}`
                    }>

                      <Icon name={tab?.icon} size={18} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  )}
                </nav>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation userRole="user" />
    </div>);

};

export default UserProfileSettings;