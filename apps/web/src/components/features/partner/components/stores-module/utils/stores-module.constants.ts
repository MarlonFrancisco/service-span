export const AMENITIES_LIST = [
  'Wi-Fi Gratuito',
  'Estacionamento',
  'Ar Condicionado',
  'Aceita Cartão',
  'Acessibilidade',
  'Café/Bebidas',
  'TV/Entretenimento',
  'Área de Espera',
] as const;

export const INITIAL_STORE_FORM: {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  amenities: string[];
} = {
  name: '',
  address: '',
  city: '',
  state: 'SP',
  zipCode: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  instagram: '',
  facebook: '',
  amenities: [],
};

export const INITIAL_STAFF_FORM: {
  name: string;
  email: string;
  phone: string;
  role: 'professional';
  specialty: string;
} = {
  name: '',
  email: '',
  phone: '',
  role: 'professional',
  specialty: '',
};

export const STAFF_ROLES = {
  owner: {
    label: 'Proprietário',
    description: 'Acesso total ao sistema',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  manager: {
    label: 'Gerente',
    description: 'Gerencia operações e equipe',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  professional: {
    label: 'Profissional',
    description: 'Presta serviços aos clientes',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  receptionist: {
    label: 'Recepcionista',
    description: 'Atende e agenda clientes',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
} as const;
