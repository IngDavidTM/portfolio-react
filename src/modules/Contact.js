import '../stylesheets/Contact.css';

const Contact = () => (
  <section className="contact" id="contact">
    <h2>Contact me</h2>
    <h3>Don&apos;t be shy!</h3>
    <p>If you have any questions or want to work with me, please contact me.</p>
    <form className="contact-form" action="https://formspree.io/f/xnqrnpag" method="POST">
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" required placeholder="Your name" />
      </label>
      <label htmlFor="email">
        Email
        <input type="email" id="email" name="email" required placeholder="Your email" />
      </label>
      <label htmlFor="message">
        Message
        <textarea id="message" name="message" required placeholder="Your message" />
      </label>
      <button type="submit">Send message</button>
    </form>
  </section>
);

export default Contact;
