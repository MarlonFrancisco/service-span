export type TImageGalleryConfig = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  businessName: string;
  currentIndex?: number;
};

export type TUseImageGalleryConfig = {
  images: string[];
  initialIndex?: number;
};

export type TSharePlatform =
  | 'copy'
  | 'facebook'
  | 'twitter'
  | 'whatsapp'
  | 'instagram';
