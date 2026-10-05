import { useEffect, useState } from 'react';

// Tracks which section crosses the middle band of the viewport.
// `ids` must be a stable array (define it at module level).
const useActiveSection = (ids) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
};

export default useActiveSection;
