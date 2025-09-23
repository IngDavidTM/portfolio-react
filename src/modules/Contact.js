import { useState } from 'react';
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

  const validateField = (fieldName, value) => {
    if (!value.trim()) {
      if (fieldName === 'name') return 'Let me know who I am talking to.';
      if (fieldName === 'email') return 'I need your email address to get back to you.';
      if (fieldName === 'message') return 'Share a few details about your idea or question.';
    }

    if (fieldName === 'email') {
      const emailPattern = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value.trim())) {
        return 'Double-check the email format (e.g. name@domain.com).';
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
      const response = await fetch('https://mail-api-73ss.onrender.com/send_email', {
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
      <h2>Contact me</h2>
      <h3>Don&apos;t be shy!</h3>
      <p>
        If you have any questions or want to work with me, please contact me.
      </p>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
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
          Email
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your email"
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
          Message
          <textarea
            id="message"
            name="message"
            required
            placeholder="Your message"
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
            Sending...
          </button>
        ) : (
          <button type="submit">Send message</button>
        )}
      </form>
      {showSuccessMessage && (
        <p className="success-message">Message sent successfully!</p>
      )}
      {showErrorMessage && (
        <p className="error-message">Failed to send message. Please try again later.</p>
      )}
    </section>
  );
};

export default Contact;
