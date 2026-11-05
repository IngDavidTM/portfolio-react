import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const WorkCard = (work) => {
  const {
    image, title, tags, onOpen, onFocus,
  } = work;
  return (
    <button
      type="button"
      className="work_card"
      onClick={onOpen}
      onFocus={(event) => {
        // Only keyboard focus should move the rail; a click opens the sheet instead
        if (event.currentTarget.matches(':focus-visible')) onFocus();
      }}
    >
      <span className="work_card_frame">
        <span className="work_card_bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <img src={image} alt="" loading="lazy" />
      </span>
      <span className="work_card_meta">
        <span className="work_card_title">{title}</span>
        <span className="work_card_go" aria-hidden="true">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </span>
      <span className="work_card_tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
    </button>
  );
};

export default WorkCard;
