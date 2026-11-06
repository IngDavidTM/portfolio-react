// Sections are sticky sheets stacked in normal flow, so a section is "in place"
// when the page has scrolled by the sum of the heights before it.
const DESKTOP = '(min-width: 1124px)';

export const sectionTop = (id) => {
  const section = document.getElementById(id);
  if (!section) return null;

  let top = 0;
  let node = section.previousElementSibling;
  while (node) {
    top += node.offsetHeight;
    node = node.previousElementSibling;
  }

  // On narrow screens the hero is its own sheet above the column
  if (!window.matchMedia(DESKTOP).matches) {
    const hero = document.querySelector('.main');
    if (hero) top += hero.offsetHeight;
  }

  return top;
};

export const scrollToSection = (id) => {
  const top = sectionTop(id);
  if (top === null) return;
  window.scrollTo({ top, behavior: 'smooth' });
};

// Inside the pinned projects rail, card `index` is centred after
// scrolling a share of the extra height the rail adds.
export const scrollToProject = (index, count) => {
  const works = document.getElementById('works');
  const stage = works && works.querySelector('.works_stage');
  const top = sectionTop('works');
  if (!stage || top === null || count < 2) return;

  // Measured against the stage, not innerHeight, which grows and shrinks
  // with the iOS Safari toolbars
  const extra = works.offsetHeight - stage.offsetHeight;
  if (extra <= 0) return;
  window.scrollTo({ top: top + (extra * index) / (count - 1), behavior: 'smooth' });
};
