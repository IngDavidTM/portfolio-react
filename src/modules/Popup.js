import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/Popup.css';

const EXIT_MS = 260;

const Popup = ({
  work, index, count, onPrev, onNext, onClose,
}) => {
  const {
    image, title, tags, description, github, live,
  } = work;
  const { t } = useTranslation();
  const popupCopy = t('popup');
  const [closing, setClosing] = useState(false);
  const closeRef = useRef(null);
  const layerRef = useRef(null);

  const close = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    setClosing(true);
    setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // Page recedes behind the sheet, scroll locks, focus moves in and returns on close
  useEffect(() => {
    const opener = document.activeElement;
    const root = document.documentElement;
    root.classList.add('has-sheet');
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      root.classList.remove('has-sheet');
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    };
  }, []);

  // Touch scroll lock without touching <html>: swipes only move the sheet's
  // own body, and only when it has something to scroll
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return undefined;
    let startY = 0;
    const onStart = (event) => {
      startY = event.touches[0].clientY;
    };
    const onMove = (event) => {
      const body = event.target.closest && event.target.closest('.sheet_body');
      if (!body || body.scrollHeight <= body.clientHeight) {
        event.preventDefault();
        return;
      }
      const dy = event.touches[0].clientY - startY;
      const atTop = body.scrollTop <= 0;
      const atEnd = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
      if ((atTop && dy > 0) || (atEnd && dy < 0)) event.preventDefault();
    };
    layer.addEventListener('touchstart', onStart, { passive: true });
    layer.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      layer.removeEventListener('touchstart', onStart);
      layer.removeEventListener('touchmove', onMove);
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, onNext, onPrev]);

  return createPortal(
    <div ref={layerRef} className={`sheet_layer${closing ? ' is-closing' : ''}`}>
      <button
        type="button"
        className="sheet_backdrop"
        aria-label={popupCopy.closeAria}
        tabIndex={-1}
        onClick={close}
      />
      <article
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${popupCopy.dialogLabel} ${title}`}
      >
        <header className="sheet_bar">
          <div className="sheet_pager">
            <button type="button" className="sheet_icon" onClick={onPrev} aria-label={popupCopy.prev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="sheet_counter">
              {String(index + 1).padStart(2, '0')}
              <span>{` / ${String(count).padStart(2, '0')}`}</span>
            </span>
            <button type="button" className="sheet_icon" onClick={onNext} aria-label={popupCopy.next}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <span className="sheet_grip" aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            className="sheet_icon"
            aria-label={popupCopy.closeAria}
            onClick={close}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <div className="sheet_body" key={title}>
          <figure className="sheet_shot">
            <span className="sheet_shot_bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{live.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
            </span>
            <img src={image} alt={title} />
          </figure>

          <div className="sheet_info">
            <h3>{title}</h3>
            <p>{description}</p>
            <ul className="sheet_tags">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="sheet_actions">
              <a href={live} className="sheet_action btn_liquid" target="_blank" rel="noreferrer">
                <span>{popupCopy.visit}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
              {github ? (
                <a href={github} className="sheet_action is-ghost btn_liquid" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                  <span>{popupCopy.code}</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
};

Popup.propTypes = {
  work: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    github: PropTypes.string,
    live: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
