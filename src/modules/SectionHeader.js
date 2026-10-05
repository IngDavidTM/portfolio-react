import PropTypes from 'prop-types';
import Reveal from './Reveal';

const SectionHeader = ({
  titleId, index, eyebrow, title, accent, subtitle,
}) => (
  <header className="section_header">
    <Reveal as="p" className="eyebrow">
      {`${index} — ${eyebrow}`}
    </Reveal>
    <Reveal as="h2" className="section_title" delay={0.05}>
      <span id={titleId}>
        {title}
        {' '}
        <em>{accent}</em>
      </span>
    </Reveal>
    {subtitle && (
      <Reveal as="p" className="section_subtitle" delay={0.1}>
        {subtitle}
      </Reveal>
    )}
  </header>
);

SectionHeader.propTypes = {
  titleId: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

SectionHeader.defaultProps = {
  subtitle: undefined,
};

export default SectionHeader;
