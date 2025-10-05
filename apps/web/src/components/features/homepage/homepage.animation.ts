import { splitText, createTimeline, stagger, animate } from 'animejs';

export const homepageAnimation = () => {
    const { chars } = splitText('#service-snap-title', {
        chars: { wrap: 'clip' },
    });

    const { chars: charsDescription } = splitText('#service-snap-description', {
        chars: { wrap: 'clip' },
    });

    animate([chars, charsDescription], {
        y: [
            { to: ['100%', '0%'] },
        ],
        duration: 200,
        ease: 'out(3)',
        delay: stagger(50),
        loop: false,
    });
}