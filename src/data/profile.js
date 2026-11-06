// Public identity, shared by the page, the structured data and llms.txt
const profile = {
  name: 'David Tamayo',
  email: 'david.tamayo1112@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/IngDavidTM' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ing-david-tamayo/' },
    { label: 'Twitter', href: 'https://twitter.com/David5TM' },
  ],
  // Built from resume/*.html by `npm run resume`
  resume: {
    en: '/cv/david-tamayo-cv-en.pdf',
    es: '/cv/david-tamayo-cv-es.pdf',
    fr: '/cv/david-tamayo-cv-fr.pdf',
  },
};

export default profile;
