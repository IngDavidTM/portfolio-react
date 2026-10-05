import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { MotionGlobalConfig } from 'framer-motion';
import { afterEach } from 'vitest';

// Animations resolve instantly so tests assert on end states
MotionGlobalConfig.skipAnimations = true;

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

// jsdom lacks these browser APIs that the UI relies on
window.matchMedia = window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}));

function MockIntersectionObserver() {
  return {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
    takeRecords: () => [],
  };
}

window.IntersectionObserver = window.IntersectionObserver || MockIntersectionObserver;
window.scrollTo = () => {};
