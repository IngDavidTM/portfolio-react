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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 4000);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 4000);
    } finally {
      setIsSending(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact me</h2>
      <h3>Don&apos;t be shy!</h3>
      <p>
        If you have any questions or want to work with me, please contact me.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
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
          />
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
          />
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
          />
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
