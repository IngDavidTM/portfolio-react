import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import useModal from '../hooks/useModal';
import useMediaQuery from '../hooks/useMediaQuery';
import { project, spring } from '../lib/motion';
import Icon from './Icon';
import '../stylesheets/Sheet.css';

const SheetPanel = ({
  label, closeLabel, centered, dragAnywhere, className, onClose, children,
}) => {
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);
  const dragControls = useDragControls();

  useModal(onClose, closeButtonRef);

  // Dismiss based on where the flick would come to rest, not where the finger lifted
  const handleDragEnd = (event, info) => {
    const height = panelRef.current ? panelRef.current.offsetHeight : window.innerHeight;
    const restingPoint = info.offset.y + project(info.velocity.y);
    if (restingPoint > height * 0.35) onClose();
  };

  const startDrag = (event) => dragControls.start(event);
  const canDrag = !centered;

  return (
    <div className={`sheet ${centered ? 'sheet_centered' : 'sheet_bottom'}`}>
      <motion.div
        className="sheet_scrim"
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`sheet_panel ${className}`}
        data-drag-anywhere={canDrag && dragAnywhere ? 'true' : undefined}
        initial={centered ? { opacity: 0, scale: 0.96, y: 24 } : { y: '100%' }}
        animate={centered ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
        exit={centered ? { opacity: 0, scale: 0.97, y: 12 } : { y: '100%' }}
        transition={spring}
        drag={canDrag ? 'y' : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 1 }}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 42 }}
        onDragEnd={handleDragEnd}
        onPointerDown={canDrag && dragAnywhere ? startDrag : undefined}
      >
        {canDrag && (
          <motion.div
            className="sheet_grabber"
            onPointerDown={dragAnywhere ? undefined : startDrag}
            aria-hidden="true"
          >
            <span />
          </motion.div>
        )}
        <button
          ref={closeButtonRef}
          type="button"
          className="sheet_close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className="sheet_content">{children}</div>
      </motion.div>
    </div>
  );
};

SheetPanel.propTypes = {
  label: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  centered: PropTypes.bool.isRequired,
  dragAnywhere: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// Bottom sheet on phones (drag down to dismiss), centered dialog on larger screens
const Sheet = ({
  open, label, closeLabel, centerOnDesktop, dragAnywhere, className, onClose, children,
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return createPortal(
    <AnimatePresence>
      {open && (
        <SheetPanel
          key="sheet"
          label={label}
          closeLabel={closeLabel}
          centered={centerOnDesktop && isDesktop}
          dragAnywhere={dragAnywhere}
          className={className}
          onClose={onClose}
        >
          {children}
        </SheetPanel>
      )}
    </AnimatePresence>,
    document.body,
  );
};

Sheet.propTypes = {
  open: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  centerOnDesktop: PropTypes.bool,
  dragAnywhere: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Sheet.defaultProps = {
  centerOnDesktop: false,
  dragAnywhere: false,
  className: '',
  children: null,
};

export default Sheet;
