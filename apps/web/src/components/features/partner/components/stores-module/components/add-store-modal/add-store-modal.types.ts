import { IStore, IStoreGallery } from '@/types/api/stores.types';
import type { IProfessional } from '@/types/api/users.types';

export type TAddStoreModalConfig = {
  isOpen: boolean;
  isMobile: boolean;
  editingStore: IStore | null;
  onClose: () => void;
  onSubmit: (
    formData: IStore,
    staffMembers: IProfessional[],
    images: IStoreGallery[],
  ) => void;
  onOpenAddProfessionalModal: () => void;
  onOpenEditProfessionalModal: (member: IProfessional) => void;
};
