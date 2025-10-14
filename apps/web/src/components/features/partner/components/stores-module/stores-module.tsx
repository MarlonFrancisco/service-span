'use client';

import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  InputGroup,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@repo/ui';
import {
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Crown,
  Edit,
  Facebook,
  Globe,
  Images,
  Instagram,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  Plus,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { FormField } from '@/components/ui';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { MultiImageUpload } from './MultiImageUpload';

interface StoreImage {
  id: string;
  url: string;
  file?: File;
  isMain?: boolean;
}

interface WorkingHours {
  monday: { start: string; end: string; isOpen: boolean };
  tuesday: { start: string; end: string; isOpen: boolean };
  wednesday: { start: string; end: string; isOpen: boolean };
  thursday: { start: string; end: string; isOpen: boolean };
  friday: { start: string; end: string; isOpen: boolean };
  saturday: { start: string; end: string; isOpen: boolean };
  sunday: { start: string; end: string; isOpen: boolean };
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'professional' | 'receptionist';
  specialty?: string;
  avatar?: string;
  isActive: boolean;
  hireDate: string;
}

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  imageUrl: string;
  images?: StoreImage[];
  status: 'active' | 'paused';
  phone: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  workingHours: WorkingHours;
  staff: number;
  staffMembers?: StaffMember[];
  monthlyBookings: number;
  revenue?: number;
  growth?: number;
  amenities?: string[];
}

const defaultWorkingHours: WorkingHours = {
  monday: { start: '09:00', end: '18:00', isOpen: true },
  tuesday: { start: '09:00', end: '18:00', isOpen: true },
  wednesday: { start: '09:00', end: '18:00', isOpen: true },
  thursday: { start: '09:00', end: '18:00', isOpen: true },
  friday: { start: '09:00', end: '18:00', isOpen: true },
  saturday: { start: '09:00', end: '14:00', isOpen: true },
  sunday: { start: '09:00', end: '13:00', isOpen: false },
};

const weekDays = [
  { key: 'monday' as const, label: 'Segunda-feira' },
  { key: 'tuesday' as const, label: 'Terça-feira' },
  { key: 'wednesday' as const, label: 'Quarta-feira' },
  { key: 'thursday' as const, label: 'Quinta-feira' },
  { key: 'friday' as const, label: 'Sexta-feira' },
  { key: 'saturday' as const, label: 'Sábado' },
  { key: 'sunday' as const, label: 'Domingo' },
];

const amenitiesList = [
  'Wi-Fi Gratuito',
  'Estacionamento',
  'Ar Condicionado',
  'Aceita Cartão',
  'Acessibilidade',
  'Café/Bebidas',
  'TV/Entretenimento',
  'Área de Espera',
];

export function StoresModule() {
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Loja Centro',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      description:
        'Nosso salon principal no coração da cidade, oferecendo serviços completos de beleza e bem-estar.',
      imageUrl:
        'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc1OTI3MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true,
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGNoYWlyc3xlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: false,
        },
      ],
      status: 'active',
      phone: '(11) 3456-7890',
      email: 'centro@exemplo.com',
      website: 'https://exemplo.com',
      instagram: '@lojacentro',
      workingHours: defaultWorkingHours,
      staff: 3,
      staffMembers: [
        {
          id: '1',
          name: 'Maria Silva',
          email: 'maria@exemplo.com',
          phone: '(11) 98765-4321',
          role: 'owner',
          isActive: true,
          hireDate: '2022-01-15',
        },
        {
          id: '2',
          name: 'João Santos',
          email: 'joao@exemplo.com',
          phone: '(11) 98765-4322',
          role: 'professional',
          specialty: 'Cortes Masculinos',
          isActive: true,
          hireDate: '2022-03-20',
        },
        {
          id: '3',
          name: 'Ana Costa',
          email: 'ana@exemplo.com',
          phone: '(11) 98765-4323',
          role: 'professional',
          specialty: 'Colorimetria',
          isActive: true,
          hireDate: '2023-05-10',
        },
      ],
      monthlyBookings: 87,
      revenue: 4250,
      growth: 12,
      amenities: [
        'Wi-Fi Gratuito',
        'Ar Condicionado',
        'Aceita Cartão',
        'Café/Bebidas',
      ],
    },
    {
      id: '2',
      name: 'Loja Shopping',
      address: 'Shopping Center, Loja 45 - 2º Piso',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-890',
      description:
        'Unidade moderna no shopping com maior fluxo de clientes e horário estendido.',
      imageUrl:
        'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1726255294274-831cb82858ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NTkyNzM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true,
        },
      ],
      status: 'active',
      phone: '(11) 3456-7891',
      email: 'shopping@exemplo.com',
      workingHours: {
        ...defaultWorkingHours,
        monday: { start: '10:00', end: '22:00', isOpen: true },
        tuesday: { start: '10:00', end: '22:00', isOpen: true },
        wednesday: { start: '10:00', end: '22:00', isOpen: true },
        thursday: { start: '10:00', end: '22:00', isOpen: true },
        friday: { start: '10:00', end: '22:00', isOpen: true },
        saturday: { start: '10:00', end: '22:00', isOpen: true },
        sunday: { start: '12:00', end: '20:00', isOpen: true },
      },
      staff: 5,
      staffMembers: [
        {
          id: '4',
          name: 'Pedro Oliveira',
          email: 'pedro@exemplo.com',
          phone: '(11) 98765-4324',
          role: 'manager',
          isActive: true,
          hireDate: '2021-09-15',
        },
        {
          id: '5',
          name: 'Carla Mendes',
          email: 'carla@exemplo.com',
          phone: '(11) 98765-4325',
          role: 'professional',
          specialty: 'Manicure e Pedicure',
          isActive: true,
          hireDate: '2022-11-01',
        },
        {
          id: '6',
          name: 'Lucas Ferreira',
          email: 'lucas@exemplo.com',
          phone: '(11) 98765-4326',
          role: 'professional',
          specialty: 'Cortes e Barba',
          isActive: true,
          hireDate: '2023-02-12',
        },
        {
          id: '7',
          name: 'Juliana Lima',
          email: 'juliana@exemplo.com',
          phone: '(11) 98765-4327',
          role: 'receptionist',
          isActive: true,
          hireDate: '2023-07-20',
        },
        {
          id: '8',
          name: 'Roberto Alves',
          email: 'roberto@exemplo.com',
          phone: '(11) 98765-4328',
          role: 'professional',
          specialty: 'Tratamentos Capilares',
          isActive: true,
          hireDate: '2023-09-05',
        },
      ],
      monthlyBookings: 142,
      revenue: 7800,
      growth: 24,
      amenities: [
        'Wi-Fi Gratuito',
        'Estacionamento',
        'Ar Condicionado',
        'Aceita Cartão',
        'Acessibilidade',
      ],
    },
    {
      id: '3',
      name: 'Loja Zona Sul',
      address: 'Av. Principal, 567',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04567-890',
      description:
        'Barbearia especializada em cortes masculinos e cuidados com a barba.',
      imageUrl:
        'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MjM0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
          isMain: true,
        },
      ],
      status: 'paused',
      phone: '(11) 3456-7892',
      workingHours: defaultWorkingHours,
      staff: 2,
      staffMembers: [
        {
          id: '9',
          name: 'Carlos Barbosa',
          email: 'carlos@exemplo.com',
          phone: '(11) 98765-4329',
          role: 'owner',
          isActive: true,
          hireDate: '2020-05-10',
        },
        {
          id: '10',
          name: 'Felipe Rocha',
          email: 'felipe@exemplo.com',
          phone: '(11) 98765-4330',
          role: 'professional',
          specialty: 'Barbeiro',
          isActive: true,
          hireDate: '2021-08-22',
        },
      ],
      monthlyBookings: 34,
      revenue: 1520,
      growth: -8,
      amenities: ['Wi-Fi Gratuito', 'Aceita Cartão', 'TV/Entretenimento'],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [newStoreImages, setNewStoreImages] = useState<StoreImage[]>([]);
  const [editingStoreImages, setEditingStoreImages] = useState<StoreImage[]>(
    [],
  );

  // Staff management state
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [editingStaffMember, setEditingStaffMember] =
    useState<StaffMember | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'professional' as StaffMember['role'],
    specialty: '',
  });

  // Form state for add/edit store
  const [storeForm, setStoreForm] = useState({
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
    workingHours: defaultWorkingHours,
    amenities: [] as string[],
  });

  const toggleStoreStatus = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId);
    if (!store) return;

    setStores(
      stores.map((s) =>
        s.id === storeId
          ? { ...s, status: s.status === 'active' ? 'paused' : 'active' }
          : s,
      ),
    );

    toast.success(
      store.status === 'active'
        ? 'Loja pausada com sucesso!'
        : 'Loja reativada com sucesso!',
    );
  };

  const handleEditStore = (store: Store) => {
    setStoreForm({
      name: store.name,
      address: store.address,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
      description: store.description,
      phone: store.phone,
      email: store.email || '',
      website: store.website || '',
      instagram: store.instagram || '',
      facebook: store.facebook || '',
      workingHours: store.workingHours,
      amenities: store.amenities || [],
    });
    setEditingStoreImages(store.images || []);
    setStaffMembers(store.staffMembers || []);
    setEditingStore(store);
  };

  // Staff management functions
  const handleAddStaffMember = () => {
    if (!staffForm.name || !staffForm.email || !staffForm.phone) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newStaffMember: StaffMember = {
      id: String(Date.now()),
      name: staffForm.name,
      email: staffForm.email,
      phone: staffForm.phone,
      role: staffForm.role,
      specialty: staffForm.specialty || undefined,
      isActive: true,
      hireDate: new Date().toISOString().split('T')[0],
    };

    setStaffMembers([...staffMembers, newStaffMember]);
    resetStaffForm();
    setIsAddStaffModalOpen(false);
    toast.success('Colaborador adicionado com sucesso!');
  };

  const handleUpdateStaffMember = () => {
    if (!editingStaffMember) return;

    setStaffMembers(
      staffMembers.map((member) =>
        member.id === editingStaffMember.id
          ? {
              ...member,
              name: staffForm.name,
              email: staffForm.email,
              phone: staffForm.phone,
              role: staffForm.role,
              specialty: staffForm.specialty || undefined,
            }
          : member,
      ),
    );

    resetStaffForm();
    setEditingStaffMember(null);
    toast.success('Colaborador atualizado com sucesso!');
  };

  const handleEditStaffMember = (member: StaffMember) => {
    setStaffForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      specialty: member.specialty || '',
    });
    setEditingStaffMember(member);
  };

  const handleDeleteStaffMember = (memberId: string) => {
    setStaffMembers(staffMembers.filter((m) => m.id !== memberId));
    toast.success('Colaborador removido com sucesso!');
  };

  const toggleStaffStatus = (memberId: string) => {
    setStaffMembers(
      staffMembers.map((m) =>
        m.id === memberId ? { ...m, isActive: !m.isActive } : m,
      ),
    );
    toast.success('Status atualizado com sucesso!');
  };

  const resetStaffForm = () => {
    setStaffForm({
      name: '',
      email: '',
      phone: '',
      role: 'professional',
      specialty: '',
    });
  };

  const getRoleIcon = (role: StaffMember['role']) => {
    switch (role) {
      case 'owner':
        return Crown;
      case 'manager':
        return Shield;
      case 'professional':
        return Briefcase;
      case 'receptionist':
        return Users;
    }
  };

  const getRoleLabel = (role: StaffMember['role']) => {
    const labels = {
      owner: 'Proprietário',
      manager: 'Gerente',
      professional: 'Profissional',
      receptionist: 'Recepcionista',
    };
    return labels[role];
  };

  const getRoleColor = (role: StaffMember['role']) => {
    const colors = {
      owner: 'bg-purple-50 text-purple-700 border-purple-200',
      manager: 'bg-blue-50 text-blue-700 border-blue-200',
      professional: 'bg-green-50 text-green-700 border-green-200',
      receptionist: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[role];
  };

  const handleAddStore = () => {
    if (
      !storeForm.name ||
      !storeForm.address ||
      !storeForm.city ||
      !storeForm.phone
    ) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newStore: Store = {
      id: String(Date.now()),
      ...storeForm,
      imageUrl:
        newStoreImages[0]?.url ||
        'https://images.unsplash.com/photo-1600948836101-f9ffda59d250',
      images: newStoreImages,
      status: 'active',
      staff: 0,
      monthlyBookings: 0,
      revenue: 0,
      growth: 0,
    };

    setStores([...stores, newStore]);
    setIsAddModalOpen(false);
    resetForm();
    toast.success('Loja criada com sucesso!');
  };

  const handleUpdateStore = () => {
    if (!editingStore) return;

    if (
      !storeForm.name ||
      !storeForm.address ||
      !storeForm.city ||
      !storeForm.phone
    ) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setStores(
      stores.map((store) =>
        store.id === editingStore.id
          ? {
              ...store,
              ...storeForm,
              imageUrl: editingStoreImages[0]?.url || store.imageUrl,
              images: editingStoreImages,
              staffMembers: staffMembers,
              staff: staffMembers.length,
            }
          : store,
      ),
    );

    setEditingStore(null);
    resetForm();
    toast.success('Loja atualizada com sucesso!');
  };

  const handleDeleteStore = (storeId: string) => {
    if (stores.length === 1) {
      toast.error('Você precisa ter pelo menos uma loja ativa');
      return;
    }

    setStores(stores.filter((s) => s.id !== storeId));
    toast.success('Loja excluída com sucesso!');
  };

  const resetForm = () => {
    setStoreForm({
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
      workingHours: defaultWorkingHours,
      amenities: [],
    });
    setNewStoreImages([]);
    setEditingStoreImages([]);
    setStaffMembers([]);
    resetStaffForm();
    setEditingStaffMember(null);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingStore(null);
    resetForm();
  };

  const formatWorkingHoursDisplay = (workingHours: WorkingHours): string => {
    const openDays = weekDays.filter((day) => workingHours[day.key].isOpen);
    if (openDays.length === 0) return 'Fechado';
    if (openDays.length === 7) {
      const hours = workingHours.monday;
      return `Todos os dias ${hours.start} - ${hours.end}`;
    }
    const firstDay = openDays[0];
    const hours = workingHours[firstDay.key];
    return `${hours.start} - ${hours.end}`;
  };

  // Calculate totals for overview cards
  const totalStores = stores.length;
  const activeStores = stores.filter((s) => s.status === 'active').length;
  const totalBookings = stores.reduce(
    (acc, store) => acc + store.monthlyBookings,
    0,
  );
  const totalRevenue = stores.reduce(
    (acc, store) => acc + (store.revenue || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Lojas</p>
                  <p className="text-3xl text-gray-900">{totalStores}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lojas Ativas</p>
                  <p className="text-3xl text-gray-900">{activeStores}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Agendamentos/mês</p>
                  <p className="text-3xl text-gray-900">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Receita Total</p>
                  <p className="text-3xl text-gray-900">
                    R$ {totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nova Loja
        </Button>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card
              className={`relative overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300 ${
                store.status === 'paused' ? 'opacity-60' : ''
              }`}
            >
              {/* Store Image */}
              <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={store.imageUrl}
                  alt={`Foto da ${store.name}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditStore(store)}
                    className="h-9 w-9 p-0 bg-white/90 hover:bg-white backdrop-blur-sm shadow-md border border-gray-200/50"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleStoreStatus(store.id)}
                    className={`h-9 w-9 p-0 backdrop-blur-sm shadow-md border ${
                      store.status === 'active'
                        ? 'bg-white/90 hover:bg-white border-gray-200/50'
                        : 'bg-green-500/90 hover:bg-green-500 border-green-400/50'
                    }`}
                  >
                    {store.status === 'active' ? (
                      <Pause className="h-4 w-4 text-gray-700" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>

                {/* Status & Info Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge
                    className={
                      store.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                        : 'bg-gray-100 text-gray-700 border-gray-300 shadow-sm'
                    }
                  >
                    {store.status === 'active' ? 'Ativa' : 'Pausada'}
                  </Badge>

                  {/* Performance Badge */}
                  {store.growth !== undefined && store.growth >= 15 && (
                    <Badge className="bg-orange-50 text-orange-700 border-orange-200 shadow-sm flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />+{store.growth}%
                    </Badge>
                  )}
                </div>

                {/* Image Gallery Indicator */}
                {store.images && store.images.length > 1 && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/60 text-white border-white/20 backdrop-blur-sm shadow-md">
                      <Images className="h-3 w-3 mr-1" />
                      {store.images.length} fotos
                    </Badge>
                  </div>
                )}

                {/* Staff Count */}
                <div className="absolute bottom-3 right-3">
                  <Badge className="bg-white/90 text-gray-900 border-gray-200/50 backdrop-blur-sm shadow-md">
                    <Users className="h-3 w-3 mr-1" />
                    {store.staff} colaboradores
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 text-xl mb-2">
                      {store.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {store.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Endereço</p>
                      <p className="text-sm text-gray-900">{store.address}</p>
                      <p className="text-xs text-gray-600">
                        {store.city} - {store.state}, {store.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Horário</p>
                        <p className="text-xs text-gray-900 truncate">
                          {formatWorkingHoursDisplay(store.workingHours)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Phone className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Telefone</p>
                        <p className="text-xs text-gray-900 truncate">
                          {store.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {(store.website || store.instagram || store.facebook) && (
                  <div className="flex items-center gap-2 pt-1">
                    {store.website && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Globe className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {store.instagram && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {store.facebook && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Facebook className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Amenities */}
                {store.amenities && store.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {store.amenities.slice(0, 4).map((amenity, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-gray-300"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {store.amenities.length > 4 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300"
                      >
                        +{store.amenities.length - 4}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Performance Stats */}
                <div className="space-y-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                  <h4 className="text-xs text-gray-700 uppercase tracking-wide">
                    Desempenho
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Agendamentos</p>
                      <div className="flex items-center gap-1">
                        <p className="text-lg text-gray-900">
                          {store.monthlyBookings}
                        </p>
                        <span className="text-xs text-gray-500">/mês</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Receita</p>
                      <p className="text-lg text-gray-900">
                        R$ {(store.revenue || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {store.growth !== undefined && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-600">Crescimento</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          store.growth >= 0
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        }`}
                      >
                        {store.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        {store.growth >= 0 ? '+' : ''}
                        {store.growth}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-300 hover:bg-gray-50"
                    onClick={() => handleEditStore(store)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Gerenciar Loja
                  </Button>

                  {stores.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteStore(store.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Excluir Loja
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Store Modal */}
      <Dialog
        open={isAddModalOpen || !!editingStore}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto admin-content-scroll">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              {editingStore ? (
                <Settings className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {editingStore
                ? `Configurações - ${editingStore.name}`
                : 'Nova Loja'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-100">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
              <TabsTrigger value="hours">Horários</TabsTrigger>
              <TabsTrigger value="staff" disabled={!editingStore}>
                <Users className="h-4 w-4 mr-2" />
                Funcionários
              </TabsTrigger>
              <TabsTrigger value="images">Fotos</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6 mt-6">
              <FormField label="Nome da Loja" required>
                <Input
                  placeholder="Ex: Loja Centro"
                  value={storeForm.name}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, name: e.target.value })
                  }
                />
              </FormField>

              <FormField
                label="Descrição"
                hint="Descreva sua loja, especialidades e diferenciais"
              >
                <Textarea
                  placeholder="Ex: Salon moderno especializado em cortes e tratamentos capilares..."
                  rows={3}
                  value={storeForm.description}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, description: e.target.value })
                  }
                />
              </FormField>

              <Separator />

              <FormField label="Endereço Completo" required>
                <Input
                  placeholder="Rua, número, complemento..."
                  value={storeForm.address}
                  onChange={(e) =>
                    setStoreForm({ ...storeForm, address: e.target.value })
                  }
                />
              </FormField>

              <InputGroup cols={3}>
                <FormField label="Cidade" required>
                  <Input
                    placeholder="São Paulo"
                    value={storeForm.city}
                    onChange={(e) =>
                      setStoreForm({ ...storeForm, city: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Estado" required>
                  <Select
                    value={storeForm.state}
                    onValueChange={(value) =>
                      setStoreForm({ ...storeForm, state: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="CEP" hint="00000-000">
                  <Input
                    placeholder="00000-000"
                    value={storeForm.zipCode}
                    onChange={(e) =>
                      setStoreForm({ ...storeForm, zipCode: e.target.value })
                    }
                  />
                </FormField>
              </InputGroup>

              <Separator />

              <FormField
                label="Comodidades"
                hint="Selecione as comodidades disponíveis na loja"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        checked={storeForm.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStoreForm({
                              ...storeForm,
                              amenities: [...storeForm.amenities, amenity],
                            });
                          } else {
                            setStoreForm({
                              ...storeForm,
                              amenities: storeForm.amenities.filter(
                                (a) => a !== amenity,
                              ),
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </FormField>
            </TabsContent>

            {/* Contact Info Tab */}
            <TabsContent value="contact" className="space-y-6 mt-6">
              <InputGroup cols={2}>
                <FormField label="Telefone" required hint="(00) 00000-0000">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="(00) 00000-0000"
                      className="pl-9"
                      value={storeForm.phone}
                      onChange={(e) =>
                        setStoreForm({ ...storeForm, phone: e.target.value })
                      }
                    />
                  </div>
                </FormField>

                <FormField label="E-mail" hint="contato@exemplo.com">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="contato@exemplo.com"
                      className="pl-9"
                      value={storeForm.email}
                      onChange={(e) =>
                        setStoreForm({ ...storeForm, email: e.target.value })
                      }
                    />
                  </div>
                </FormField>
              </InputGroup>

              <Separator />

              <div>
                <h4 className="text-sm text-gray-900 mb-4">
                  Redes Sociais e Website
                </h4>

                <div className="space-y-4">
                  <FormField label="Website" hint="https://exemplo.com">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="https://exemplo.com"
                        className="pl-9"
                        value={storeForm.website}
                        onChange={(e) =>
                          setStoreForm({
                            ...storeForm,
                            website: e.target.value,
                          })
                        }
                      />
                    </div>
                  </FormField>

                  <InputGroup cols={2}>
                    <FormField label="Instagram" hint="@suaconta">
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="@suaconta"
                          className="pl-9"
                          value={storeForm.instagram}
                          onChange={(e) =>
                            setStoreForm({
                              ...storeForm,
                              instagram: e.target.value,
                            })
                          }
                        />
                      </div>
                    </FormField>

                    <FormField label="Facebook" hint="/suapagina">
                      <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="/suapagina"
                          className="pl-9"
                          value={storeForm.facebook}
                          onChange={(e) =>
                            setStoreForm({
                              ...storeForm,
                              facebook: e.target.value,
                            })
                          }
                        />
                      </div>
                    </FormField>
                  </InputGroup>
                </div>
              </div>
            </TabsContent>

            {/* Working Hours Tab */}
            <TabsContent value="hours" className="space-y-4 mt-6">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Configure os horários de funcionamento para cada dia da semana
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                {weekDays.map((day) => (
                  <div
                    key={day.key}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3 w-32">
                      <Switch
                        checked={storeForm.workingHours[day.key].isOpen}
                        onCheckedChange={(checked) => {
                          setStoreForm({
                            ...storeForm,
                            workingHours: {
                              ...storeForm.workingHours,
                              [day.key]: {
                                ...storeForm.workingHours[day.key],
                                isOpen: checked,
                              },
                            },
                          });
                        }}
                      />
                      <Label className="text-sm">{day.label}</Label>
                    </div>

                    <div className="flex-1 flex items-center gap-3">
                      <Input
                        type="time"
                        value={storeForm.workingHours[day.key].start}
                        onChange={(e) => {
                          setStoreForm({
                            ...storeForm,
                            workingHours: {
                              ...storeForm.workingHours,
                              [day.key]: {
                                ...storeForm.workingHours[day.key],
                                start: e.target.value,
                              },
                            },
                          });
                        }}
                        disabled={!storeForm.workingHours[day.key].isOpen}
                        className="w-32"
                      />
                      <span className="text-gray-500">-</span>
                      <Input
                        type="time"
                        value={storeForm.workingHours[day.key].end}
                        onChange={(e) => {
                          setStoreForm({
                            ...storeForm,
                            workingHours: {
                              ...storeForm.workingHours,
                              [day.key]: {
                                ...storeForm.workingHours[day.key],
                                end: e.target.value,
                              },
                            },
                          });
                        }}
                        disabled={!storeForm.workingHours[day.key].isOpen}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff" className="space-y-6 mt-6">
              {/* Staff Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-gray-900">Equipe da Loja</h3>
                  <p className="text-sm text-gray-600">
                    Gerencie os colaboradores desta unidade
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddStaffModalOpen(true)}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Colaborador
                </Button>
              </div>

              {/* Staff List */}
              {staffMembers.length === 0 ? (
                <Card className="border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">
                      Nenhum colaborador cadastrado
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Adicione colaboradores para gerenciar a equipe desta loja
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddStaffModalOpen(true)}
                      className="border-gray-300"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Adicionar Primeiro Colaborador
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staffMembers.map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card
                          className={`border-gray-200 ${!member.isActive ? 'opacity-60' : ''}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <Users className="h-6 w-6 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-gray-900">
                                    {member.name}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs mt-1 ${getRoleColor(member.role)}`}
                                  >
                                    <RoleIcon className="h-3 w-3 mr-1" />
                                    {getRoleLabel(member.role)}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditStaffMember(member)}
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <Edit className="h-4 w-4 text-gray-600" />
                                </Button>
                                {member.role !== 'owner' && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      handleDeleteStaffMember(member.id)
                                    }
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{member.phone}</span>
                              </div>
                              {member.specialty && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Briefcase className="h-3.5 w-3.5" />
                                  <span>{member.specialty}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                              <span className="text-xs text-gray-500">
                                Desde{' '}
                                {new Date(member.hireDate).toLocaleDateString(
                                  'pt-BR',
                                )}
                              </span>
                              <Switch
                                checked={member.isActive}
                                onCheckedChange={() =>
                                  toggleStaffStatus(member.id)
                                }
                                disabled={member.role === 'owner'}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Add/Edit Staff Modal */}
              <Dialog
                open={isAddStaffModalOpen || !!editingStaffMember}
                onOpenChange={(open) => {
                  if (!open) {
                    setIsAddStaffModalOpen(false);
                    setEditingStaffMember(null);
                    resetStaffForm();
                  }
                }}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">
                      {editingStaffMember
                        ? 'Editar Colaborador'
                        : 'Novo Colaborador'}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <FormField label="Nome Completo" required>
                      <Input
                        placeholder="Ex: João Silva"
                        value={staffForm.name}
                        onChange={(e) =>
                          setStaffForm({ ...staffForm, name: e.target.value })
                        }
                      />
                    </FormField>

                    <InputGroup cols={2}>
                      <FormField label="E-mail" required>
                        <Input
                          type="email"
                          placeholder="joao@exemplo.com"
                          value={staffForm.email}
                          onChange={(e) =>
                            setStaffForm({
                              ...staffForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </FormField>

                      <FormField label="Telefone" required>
                        <Input
                          placeholder="(00) 00000-0000"
                          value={staffForm.phone}
                          onChange={(e) =>
                            setStaffForm({
                              ...staffForm,
                              phone: e.target.value,
                            })
                          }
                        />
                      </FormField>
                    </InputGroup>

                    <FormField label="Função" required>
                      <Select
                        value={staffForm.role}
                        onValueChange={(value: StaffMember['role']) =>
                          setStaffForm({ ...staffForm, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">
                            Profissional
                          </SelectItem>
                          <SelectItem value="receptionist">
                            Recepcionista
                          </SelectItem>
                          <SelectItem value="manager">Gerente</SelectItem>
                          {!editingStaffMember && (
                            <SelectItem value="owner">Proprietário</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormField>

                    {(staffForm.role === 'professional' ||
                      staffForm.role === 'manager') && (
                      <FormField
                        label="Especialidade"
                        hint="Ex: Cortes Masculinos, Manicure, etc."
                      >
                        <Input
                          placeholder="Ex: Cortes e Barba"
                          value={staffForm.specialty}
                          onChange={(e) =>
                            setStaffForm({
                              ...staffForm,
                              specialty: e.target.value,
                            })
                          }
                        />
                      </FormField>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsAddStaffModalOpen(false);
                          setEditingStaffMember(null);
                          resetStaffForm();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="flex-1 bg-black hover:bg-gray-800 text-white"
                        onClick={
                          editingStaffMember
                            ? handleUpdateStaffMember
                            : handleAddStaffMember
                        }
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {editingStaffMember ? 'Salvar' : 'Adicionar'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-4 mt-6">
              <div>
                <Label className="flex items-center gap-2 mb-4">
                  <Images className="h-4 w-4" />
                  Fotos da Loja (até 5 imagens)
                </Label>
                <MultiImageUpload
                  images={editingStore ? editingStoreImages : newStoreImages}
                  onChange={
                    editingStore ? setEditingStoreImages : setNewStoreImages
                  }
                  maxImages={5}
                />
                <p className="text-xs text-gray-500 mt-2">
                  A primeira imagem será usada como foto principal da loja
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Campos marcados com <span className="text-red-500">*</span> são
              obrigatórios
            </AlertDescription>
          </Alert>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {editingStore && (
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => {
                  handleDeleteStore(editingStore.id);
                  handleCloseModal();
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Loja
              </Button>
            )}
            <div className="flex-1" />
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              className="bg-black hover:bg-gray-800 text-white"
              onClick={editingStore ? handleUpdateStore : handleAddStore}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {editingStore ? 'Salvar Alterações' : 'Criar Loja'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
