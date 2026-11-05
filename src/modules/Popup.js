import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/Popup.css';

const EXIT_MS = 220;

const Popup = (work) => {
  const {
    image, title, tags, description, github, live, setPopup,
  } = work;
  const { t } = useTranslation();
  const popupCopy = t('popup');
  const [closing, setClosing] = useState(false);
  const closeRef = useRef(null);

  const close = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPopup(false);
      return;
    }
    setClosing(true);
    setTimeout(() => setPopup(false), EXIT_MS);
  }, [setPopup]);

  useEffect(() => {
    const opener = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = previousOverflow;
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    };
  }, [close]);

  return (
    // Escape is handled on window; clicking the backdrop is a pointer-only shortcut.
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article
      className={`popup${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${popupCopy.dialogLabel} ${title}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="popup_content">
        <div className="popup_media">
          <img src={image} alt={title} />
          <button
            ref={closeRef}
            type="button"
            className="popup_close"
            aria-label={popupCopy.closeAria}
            onClick={close}
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
