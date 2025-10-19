export interface IPlan {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  popular: boolean;
  features: string[];
}

export type IPlansResponse = IPlan[];
