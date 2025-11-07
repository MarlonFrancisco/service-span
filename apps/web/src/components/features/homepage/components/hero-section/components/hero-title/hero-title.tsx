'use client';

import { TextAnimate } from '@repo/ui';

export const HeroTitle = () => {
  return (
    <h1
      className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl mb-8"
      id="service-snap-title"
    >
      <TextAnimate animation="slideLeft" by="character">
        ServiceSnap.
      </TextAnimate>
    </h1>
  );
};
