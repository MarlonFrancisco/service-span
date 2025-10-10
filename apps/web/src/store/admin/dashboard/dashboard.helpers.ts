export const getActivityColor = (status: string): string => {
  switch (status) {
    case 'new':
      return 'bg-green-50 border-green-200';
    case 'completed':
      return 'bg-blue-50 border-blue-200';
    case 'cancelled':
      return 'bg-red-50 border-red-200';
    case 'pending':
      return 'bg-orange-50 border-orange-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const getActivityIconColor = (status: string): string => {
  switch (status) {
    case 'new':
      return 'text-green-600';
    case 'completed':
      return 'text-blue-600';
    case 'cancelled':
      return 'text-red-600';
    case 'pending':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
};
