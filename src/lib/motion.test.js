import { describe, expect, it } from 'vitest';
import { project } from './motion';

describe('project', () => {
  it('is zero without velocity', () => {
    expect(project(0)).toBe(0);
  });

  it('projects a 1000px/s flick about half a screen with scroll-view deceleration', () => {
    expect(project(1000)).toBeCloseTo(499, 0);
  });

  it('keeps the direction of the gesture', () => {
    expect(project(-800)).toBeLessThan(0);
  });
});
