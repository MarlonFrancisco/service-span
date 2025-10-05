import { waapi } from 'animejs';

// Helper function para criar animações com scroll observer
export const createScrollAnimation = (
  selector: string,
  animationProps: Parameters<typeof waapi.animate>[1],
  observerOptions: IntersectionObserverInit = {},
) => {
  // Criar animação sem autoplay inicial
  const animation = waapi.animate(selector, {
    ...animationProps,
    autoplay: false,
  });

  // Configurar Intersection Observer com opções padrão
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
    ...observerOptions,
  };

  const element = document.querySelector(selector);
  if (element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation.play();
          observer.disconnect();
        }
      });
    }, defaultOptions);

    observer.observe(element);
  }

  return animation;
};
