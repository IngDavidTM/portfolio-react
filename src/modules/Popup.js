import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../stylesheets/Popup.css';

const Popup = (work) => {
  const {
    image, title, tags, description, github, live,
  } = work;
  return (
    <article className="popup">
      <div className="popup_content">
        <img src={image} alt={title} />
        <div className="popup_description">
          <h3>{title}</h3>
          <div>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p>{description}</p>
        </div>
        <div className="popup_content_links">
          <a href={github} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={FaGithub} />
          </a>
          <a href={live} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={FaExternalLinkAlt} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Popup;
