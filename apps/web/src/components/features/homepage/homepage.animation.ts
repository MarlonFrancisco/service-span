import { createScrollAnimation } from '@/utils/helpers/animation.helper';
import { splitText, stagger, waapi } from 'animejs';

const animateHeroBanner = () => {
  // Split text into characters usando anime.js
  const { chars: titleChars } = splitText('#service-snap-title', {
    chars: { wrap: 'clip' },
  });

  const { chars: descriptionChars } = splitText('#service-snap-description', {
    chars: { wrap: 'clip' },
  });

  // Badge animation usando WAAPI do anime.js
  waapi.animate('#service-snap-badge', {
    opacity: [0, 1],
    translateY: ['-20px', '0px'],
    duration: 700,
    delay: 0,
    ease: 'out(2)',
  });

  // Title characters animation com stagger
  waapi.animate(titleChars, {
    translateY: ['100%', '0%'],
    duration: 500,
    delay: stagger(20, { start: 200 }),
    ease: 'out(2)',
  });

  // Description characters animation com stagger
  waapi.animate(descriptionChars, {
    opacity: [0, 1],
    translateY: ['100%', '0%'],
    duration: 400,
    delay: stagger(5, { start: 500 }),
    ease: 'out(2)',
  });

  // Search bar animation
  waapi.animate('#service-snap-search-bar', {
    opacity: [0, 1],
    translateY: ['30px', '0px'],
    duration: 700,
    delay: 700,
    ease: 'out(2)',
  });

  // Categories animation com stagger
  waapi.animate('#service-snap-categories', {
    opacity: [0, 1],
    translateY: ['20px', '0px'],
    scale: [0.95, 1],
    duration: 500,
    delay: stagger(60, { start: 900 }),
    ease: 'out(2)',
  });
};

const animateFeatures = () => {
  return createScrollAnimation(
    '.feature-item',
    {
      opacity: [0, 1],
      translateY: ['30px', '0px'],
      duration: 800,
      ease: 'out(2)',
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -15% 0px',
    },
  );
};

const animateCTA = () => {
  return createScrollAnimation(
    '.cta-section',
    {
      opacity: [0, 1],
      translateY: ['20px', '0px'],
      scale: [0.98, 1],
      duration: 800,
      ease: 'out(2)',
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    },
  );
};

const animateRecommendations = () => {
  return createScrollAnimation(
    '.recommendations-card',
    {
      opacity: [0, 1],
      translateY: ['80px', '0px'],
      scale: [0.95, 1],
      duration: 700,
      ease: 'out(2)',
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    },
  );
};

// Animação de hover para cards
const setupCardHoverAnimations = () => {
  const cards = document.querySelectorAll('.recommendations-card');

  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;

    card.addEventListener('mouseenter', () => {
      waapi.animate(img, {
        scale: [1, 1.08],
        duration: 500,
        ease: 'out(2)',
      });
    });

    card.addEventListener('mouseleave', () => {
      waapi.animate(img, {
        scale: [1.08, 1],
        duration: 400,
        ease: 'out(2)',
      });
    });
  });
};

export const homepageAnimation = () => {};
