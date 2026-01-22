import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ 
  profileData, 
  onImageUpload, 
  onImageRemove,
  isUploading 
}) => {
  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={profileData?.avatar}
              alt={profileData?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <Icon name="Camera" size={24} color="white" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {profileData?.name}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            {profileData?.email}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => document.getElementById('profile-upload')?.click()}
              loading={isUploading}
            >
              Upload Photo
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={onImageRemove}
              disabled={!profileData?.avatar || isUploading}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center md:text-right">
          <div className="flex items-center gap-2 justify-center md:justify-end">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground caption">
              Joined {profileData?.joinedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-end">
            <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground caption">
              {profileData?.totalConversations} conversations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;