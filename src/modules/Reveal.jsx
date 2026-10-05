import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { spring } from '../lib/motion';

// Content settles into place as it enters the viewport, once.
// With reduced motion, MotionConfig strips the travel and keeps the fade.
const Reveal = ({
  as, children, className, delay, y,
}) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ ...spring, duration: 0.7, delay }}
    >
      {children}
    </Component>
  );
};

Reveal.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  y: PropTypes.number,
};

Reveal.defaultProps = {
  as: 'div',
  className: undefined,
  delay: 0,
  y: 28,
};

export default Reveal;
