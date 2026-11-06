// Grouped the way the work is done: AI first, then how solutions are
// shaped, built, run and kept safe.
const skillGroups = [
  {
    key: 'ai',
    items: [
      'LLM apps', 'AI agents', 'RAG', 'Prompt engineering', 'LLM evaluation',
      'OpenAI API', 'Claude API', 'Gemini API', 'Embeddings', 'AI-assisted dev',
    ],
  },
  {
    key: 'design',
    items: [
      'System architecture', 'API design', 'Data modeling', 'Product scoping',
      'Platform migrations', 'Performance', 'Technical leadership',
    ],
  },
  {
    key: 'engineering',
    items: [
      'TypeScript', 'Python', 'JavaScript', 'C#/.NET', 'SQL', 'Next', 'React', 'Node',
      'Express', 'Vue', 'Angular', 'Ruby on Rails', 'Tailwind', 'WordPress',
    ],
  },
  {
    key: 'platform',
    items: [
      'PostgreSQL', 'Supabase', 'MongoDB', 'Docker', 'Linux', 'CI/CD',
      'Vercel', 'GitHub Actions', 'Automation',
    ],
  },
  {
    key: 'security',
    items: [
      'OWASP Top 10', 'Secure code review', 'Auth & access control',
      'Threat modeling', 'Linux hardening',
    ],
  },
];

export default skillGroups;
