import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import projects from '../data/projects';
import renderWithProviders from '../test/renderWithProviders';
import Works from './Works';

const cardTriggers = () => screen.getAllByRole('button', { name: /view details for/i });

describe('Works', () => {
  it('lists every project by default', () => {
    renderWithProviders(<Works />);
    expect(cardTriggers()).toHaveLength(projects.length);
  });

  it('filters projects by technology', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Works />);

    await user.click(screen.getByRole('button', { name: /^vue/i }));

    const vueProjects = projects.filter((item) => item.tags.includes('Vue'));
    await waitFor(() => expect(cardTriggers()).toHaveLength(vueProjects.length));
    expect(screen.getByRole('button', { name: /^vue/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens project details in a dialog', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Works />);
    const [first] = projects;

    await user.click(screen.getByRole('button', { name: `View details for ${first.title}` }));

    const dialog = screen.getByRole('dialog', { name: new RegExp(first.title) });
    expect(within(dialog).getByText(first.description.en)).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /visit live site/i })).toHaveAttribute('href', first.live);
    expect(within(dialog).getByRole('button', { name: /close project details/i })).toHaveFocus();
  });
});
