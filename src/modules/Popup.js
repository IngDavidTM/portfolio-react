import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Popup.css';

const Popup = (work) => {
  const {
    image, title, tags, description, github, live, setPopup,
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
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={live} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
        <button type="button" className="popup_close" onClick={() => { setPopup(false); }}>
          <FontAwesomeIcon icon={faClose} />
          {' '}
        </button>
      </div>
    </article>
  );
};

export default Popup;
