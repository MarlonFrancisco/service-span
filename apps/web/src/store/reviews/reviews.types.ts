import { IReview } from '@/types/reviews.types';

export interface IReviewsStore {
  isOpen: boolean;
  showWriteReview: boolean;
  reviews: IReview[];
  storeId: string;
  businessName: string;
  toggleReviewsModalAction: (open: boolean) => Promise<void>;
  setReviewsAttributesAction: (
    attributes: Partial<IReviewsStore>,
  ) => Promise<void>;
}
