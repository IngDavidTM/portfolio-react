import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import LanguageToggle from '../modules/LanguageToggle';
import renderWithProviders from '../test/renderWithProviders';
import { useTranslation } from './LanguageContext';

const Greeting = () => {
  const { t } = useTranslation();
  return <p>{t('hero.greeting')}</p>;
};

describe('LanguageProvider', () => {
  it('switches copy, the document language and remembers the choice', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <LanguageToggle />
        <Greeting />
      </>,
    );

    expect(screen.getByText("Hi, I'm David —")).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'ES' }));

    expect(screen.getByText('Hola, soy David —')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
    expect(window.localStorage.getItem('language')).toBe('es');
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('restores a saved language', () => {
    window.localStorage.setItem('language', 'es');
    renderWithProviders(<Greeting />);
    expect(screen.getByText('Hola, soy David —')).toBeInTheDocument();
  });
});
