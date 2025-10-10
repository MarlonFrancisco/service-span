export const dropdownAnimation = (isMenuOpen: boolean) => {
  return {
    initial: false,
    animate: {
      maxHeight: isMenuOpen ? '800px' : '8px',
    },
    transition: {
      duration: 0.3,
    },
  };
};
