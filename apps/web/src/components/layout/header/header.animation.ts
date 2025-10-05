import { waapi } from 'animejs';

export const headerAnimation = () => {
  const openButton = document.querySelector('#header-menu-open-button')!;
  const closeButton = document.querySelector('#header-menu-close-button')!;

  openButton.addEventListener('click', () => {
    waapi.animate('#header-menu-content', {
      duration: 500,
      ease: 'in(1.68)',
      height: [8, 800],
    });
  });

  closeButton.addEventListener('click', () => {
    waapi.animate('#header-menu-content', {
      duration: 500,
      ease: 'in(1.68)',
      height: [800, 8],
    });
  });
};
