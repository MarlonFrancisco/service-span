export const normalizePhoneNumber = (phoneNumber: string): string => {
  const normalizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

  return normalizedPhoneNumber.includes('+')
    ? normalizedPhoneNumber
    : `+${normalizedPhoneNumber}`;
};
