import type { BrandColor } from './types';

/**
 * Static maps from BrandColor slot names -> full Tailwind utility class strings.
 *
 * WHY THIS EXISTS: Tailwind v4 statically scans source for complete class
 * names. Dynamic strings like `bg-${color}` are NOT detected and would be
 * purged. Keeping every full class name literally in this one file guarantees
 * the generator emits them. Components should import these maps rather than
 * interpolating class names.
 *
 * The color tokens themselves are defined in styles/global.css `@theme`, which
 * references the raw brand primitives in styles/tokens.css.
 */

export const bgClass: Record<BrandColor, string> = {
  watermelon: 'bg-watermelon',
  pink: 'bg-pink',
  grape: 'bg-grape',
  lavender: 'bg-lavender',
  banana: 'bg-banana',
  gold: 'bg-gold',
  mint: 'bg-mint',
  teal: 'bg-teal',
  blue: 'bg-blue',
  offWhite: 'bg-offWhite',
  softBlack: 'bg-softBlack',
};

export const textClass: Record<BrandColor, string> = {
  watermelon: 'text-watermelon',
  pink: 'text-pink',
  grape: 'text-grape',
  lavender: 'text-lavender',
  banana: 'text-banana',
  gold: 'text-gold',
  mint: 'text-mint',
  teal: 'text-teal',
  blue: 'text-blue',
  offWhite: 'text-offWhite',
  softBlack: 'text-softBlack',
};

export const borderClass: Record<BrandColor, string> = {
  watermelon: 'border-watermelon',
  pink: 'border-pink',
  grape: 'border-grape',
  lavender: 'border-lavender',
  banana: 'border-banana',
  gold: 'border-gold',
  mint: 'border-mint',
  teal: 'border-teal',
  blue: 'border-blue',
  offWhite: 'border-offWhite',
  softBlack: 'border-softBlack',
};
