import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { t } = useTranslation();
  const contactCopy = t('contact');
  const validationMessages = contactCopy.validation;

  const validateField = (fieldName, value) => {
    if (!value.trim()) {
      if (fieldName === 'name') return validationMessages.nameRequired;
      if (fieldName === 'email') return validationMessages.emailRequired;
      if (fieldName === 'message') return validationMessages.messageRequired;
    }

    if (fieldName === 'email') {
      const emailPattern = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value.trim())) {
        return validationMessages.emailInvalid;
      }
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const validationResults = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(validationResults);

    const firstInvalidField = Object.keys(validationResults).find((key) => validationResults[key]);
    if (firstInvalidField) {
      const target = document.getElementById(firstInvalidField);
      if (target) {
        target.focus();
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setIsSending(true);
    try {
      const response = await fetch('https://mail-api-sk5ywohwrq-uc.a.run.app/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 4000);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setErrors({ name: '', email: '', message: '' });
      } else {
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 4000);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 4000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>{contactCopy.title}</h2>
      <h3>{contactCopy.subtitle}</h3>
      <p>{contactCopy.description}</p>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">
          {contactCopy.labels.name}
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={contactCopy.placeholders.name}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="field_message" id="name-error">{errors.name}</span>
          )}
        </label>
        <label htmlFor="email">
          {contactCopy.labels.email}
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={contactCopy.placeholders.email}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field_message" id="email-error">{errors.email}</span>
          )}
        </label>
        <label htmlFor="message">
          {contactCopy.labels.message}
          <textarea
            id="message"
            name="message"
            required
            placeholder={contactCopy.placeholders.message}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span className="field_message" id="message-error">{errors.message}</span>
          )}
        </label>
        {isSending ? (
          <button type="submit" disabled>
            {contactCopy.sending}
          </button>
        ) : (
          <button type="submit">{contactCopy.submit}</button>
        )}
      </form>
      {showSuccessMessage && (
        <p className="success-message">{contactCopy.success}</p>
      )}
      {showErrorMessage && (
        <p className="error-message">{contactCopy.error}</p>
      )}
    </section>
  );
};

export default Contact;
