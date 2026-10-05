import PropTypes from 'prop-types';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import links from '../data/links';
import { spring, springSnappy } from '../lib/motion';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import '../stylesheets/Contact.css';

const ENDPOINT = 'https://mail-api-sk5ywohwrq-uc.a.run.app/send_email';
const EMPTY = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const Field = ({
  name, type, label, placeholder, value, error, multiline, autoComplete, onChange, onBlur,
}) => {
  const errorId = `${name}-error`;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className="field" data-invalid={Boolean(error)}>
      <label htmlFor={name}>{label}</label>
      <Control
        id={name}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? 5 : undefined}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            className="field_error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springSnappy}
          >
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Field.defaultProps = {
  type: 'text',
  error: '',
  multiline: false,
  autoComplete: undefined,
};

const Contact = () => {
  const { t } = useTranslation();
  const copy = t('contact');
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const validateField = (fieldName, value) => {
    if (!value.trim()) return copy.validation[`${fieldName}Required`];
    if (fieldName === 'email' && !EMAIL_PATTERN.test(value.trim())) return copy.validation.emailInvalid;
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Once a field has shown an error, re-validate live so it clears as soon as it's fixed
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (value) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setErrors(results);
    const firstInvalid = Object.keys(results).find((key) => results[key]);
    if (firstInvalid) {
      document.getElementById(firstInvalid).focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('sent');
      setFormData(EMPTY);
      setErrors(EMPTY);
    } catch (error) {
      setStatus('error');
    }
  };

  const buttonContent = {
    idle: { icon: 'arrow-right', label: copy.submit },
    error: { icon: 'arrow-right', label: copy.submit },
    sending: { icon: null, label: copy.sending },
    sent: { icon: 'check', label: copy.sent },
  }[status];

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact_glow" aria-hidden="true" />
      <div className="container contact_grid">
        <div className="contact_intro">
          <SectionHeader
            titleId="contact-title"
            index="03"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            subtitle={copy.description}
          />
          <Reveal className="contact_elsewhere" delay={0.15}>
            <p className="contact_elsewhere_label">{copy.elsewhere}</p>
            <ul>
              {[
                { href: links.linkedin, icon: 'linkedin', label: 'LinkedIn' },
                { href: links.github, icon: 'github', label: 'GitHub' },
                { href: links.twitter, icon: 'x', label: 'X / Twitter' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Icon name={item.icon} className="contact_link_icon" />
                    <span>{item.label}</span>
                    <Icon name="arrow-up-right" className="contact_link_arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="contact_card" delay={0.1}>
          <form className="contact_form" onSubmit={handleSubmit} noValidate>
            <div className="contact_row">
              <Field
                name="name"
                label={copy.labels.name}
                placeholder={copy.placeholders.name}
                autoComplete="name"
                value={formData.name}
                error={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                name="email"
                type="email"
                label={copy.labels.email}
                placeholder={copy.placeholders.email}
                autoComplete="email"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Field
              name="message"
              multiline
              label={copy.labels.message}
              placeholder={copy.placeholders.message}
              value={formData.message}
              error={errors.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="contact_submit_row">
              <motion.button
                type="submit"
                layout
                className="button button_primary contact_submit"
                data-status={status}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
                transition={spring}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={status === 'error' ? 'idle' : status}
                    className="contact_submit_content"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={springSnappy}
                  >
                    {status === 'sending' && <span className="spinner" aria-hidden="true" />}
                    {buttonContent.label}
                    {buttonContent.icon && <Icon name={buttonContent.icon} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <div className="contact_status" role="status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {(status === 'sent' || status === 'error') && (
                    <motion.p
                      key={status}
                      className={`contact_status_message contact_status_${status}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={springSnappy}
                    >
                      {status === 'sent' ? copy.success : copy.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
