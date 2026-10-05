import { useEffect } from 'react';

// Shared modal behavior: lock page scroll, move focus inside,
// close on Escape and hand focus back to the trigger on unmount.
const useModal = (onClose, initialFocusRef) => {
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (initialFocusRef.current) {
      initialFocusRef.current.focus({ preventScroll: true });
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && previousFocus.focus) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [onClose, initialFocusRef]);
};

export default useModal;
