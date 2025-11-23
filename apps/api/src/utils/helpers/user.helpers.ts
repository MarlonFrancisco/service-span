export const normalizePhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return undefined;

  const normalizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

  return normalizedPhoneNumber.includes('+')
    ? normalizedPhoneNumber
    : `+${normalizedPhoneNumber}`;
};
