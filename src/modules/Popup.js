import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/Popup.css';

const Popup = (work) => {
  const {
    image, title, tags, description, github, live, setPopup,
  } = work;
  const { t } = useTranslation();
  const popupCopy = t('popup');
  return (
    <article
      className="popup"
      role="dialog"
      aria-modal="true"
      aria-label={`${popupCopy.dialogLabel} ${title}`}
    >
      <div className="popup_content">
        <div className="popup_media">
          <img src={image} alt={title} />
          <button
            type="button"
            className="popup_close"
            aria-label={popupCopy.closeAria}
            onClick={() => {
              setPopup(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="popup_body">
          <div className="popup_header">
            <h3>{title}</h3>
            <div className="popup_links">
              {github ? (
                <a
                  href={github}
                  aria-label="GitHub repository"
                  target="_blank"
                  rel="noreferrer"
                  className="icon_button"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              ) : null}
              <a
                href={live}
                aria-label="Open live project"
                target="_blank"
                rel="noreferrer"
                className="icon_button"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </div>
          </div>
          <div className="popup_tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p>{description}</p>
          <div className="popup_actions">
            <a
              href={live}
              className="popup_action primary"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              <span>{popupCopy.visit}</span>
            </a>
            {github ? (
              <a
                href={github}
                className="popup_action ghost"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>{popupCopy.code}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Popup;
