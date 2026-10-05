// Motion presets, expressed the way Apple tunes springs: no fixed duration
// on the user's path, bounce only where a gesture carried momentum.

// Default for UI: critically damped, no overshoot
export const spring = { type: 'spring', bounce: 0, duration: 0.5 };

// Small, quick moves (indicators, toggles)
export const springSnappy = { type: 'spring', bounce: 0, duration: 0.35 };

// After a flick or drag release: a little life, because momentum preceded it
export const springMomentum = { type: 'spring', bounce: 0.18, duration: 0.45 };

// Where a gesture would come to rest if it kept decelerating like a scroll view.
// Apple's projection from "Designing Fluid Interfaces" (velocity in px/s).
export const project = (velocity, decelerationRate = 0.998) => (
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
);
