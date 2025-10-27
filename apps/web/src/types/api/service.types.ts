export interface ICategory {
  id: string;
  name: string;
  description: string;
  color: string;
  services?: IService[];
}

export interface IService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  category?: ICategory;
}
