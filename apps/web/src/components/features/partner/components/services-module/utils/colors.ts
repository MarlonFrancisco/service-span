export const getColorClass = (color: string): string => {
  const colors: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-700',
    blue: 'bg-blue-100 text-blue-700',
    pink: 'bg-pink-100 text-pink-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-600',
  };
  return colors[color] || colors.blue;
};

export const getColorBgClass = (color: string): string => {
  const colors: Record<string, string> = {
    purple: 'bg-purple-50/50',
    blue: 'bg-blue-50/50',
    pink: 'bg-pink-50/50',
    red: 'bg-red-50/50',
    green: 'bg-green-50/50',
    orange: 'bg-orange-50/50',
    yellow: 'bg-yellow-50/50',
    gray: 'bg-gray-50',
  };
  return colors[color] || colors.blue;
};
