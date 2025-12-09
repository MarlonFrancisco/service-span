export interface IStoreCardData {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: string;
  gallery: string[];
  services?: Array<{ id: string; name: string }>;
  isFavorite?: boolean;
}

export interface StoreCardProps {
  /** Dados da loja a ser exibida */
  store: IStoreCardData;
  /** Indica se o card está selecionado */
  isSelected?: boolean;
  /** Callback quando o card é clicado */
  onClick?: () => void;
  /** Callback quando o botão de favoritar é clicado */
  onFavoriteClick?: (isFavorite: boolean) => void;
  /** Mostra o botão de favoritar */
  showFavoriteButton?: boolean;
  /** Mostra o badge de disponibilidade */
  showAvailabilityBadge?: boolean;
  /** Mostra o badge do serviço principal */
  showServiceBadge?: boolean;
}
