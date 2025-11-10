export type TProfileHeaderConfig = {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
    email?: string;
    telephone?: string;
    createdAt: string;
  };
  isUploadingPhoto: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
};

export type TUseProfileHeaderConfig = {
  onPhotoUploadSuccess?: () => void;
  onPhotoUploadError?: (error: Error) => void;
};

export type TUseProfileHeaderReturn = {
  // User data
  user: any; // TODO: Tipar corretamente quando integrar com API real
  isPendingUser: boolean;

  // Photo upload state
  isUploadingPhoto: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Handlers
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditProfile: () => void;
  handleSettings: () => void;
  handleLogout: () => void;
};
