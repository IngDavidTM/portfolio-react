import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import renderWithProviders from '../test/renderWithProviders';
import Contact from './Contact';

describe('Contact form', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows every validation error and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Let me know who I am talking to.')).toBeInTheDocument();
    expect(screen.getByText('I need your email address to get back to you.')).toBeInTheDocument();
    expect(screen.getByText('Share a few details about your idea or question.')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveFocus();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
  });

  it('rejects a malformed email on blur', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.tab();

    expect(screen.getByText(/double-check the email format/i)).toBeInTheDocument();
  });

  it('sends the message and announces success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello there');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/your message is on its way/i));
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/send_email'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Ada', email: 'ada@example.com', message: 'Hello there' }),
      }),
    );
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('announces a failure and keeps what was typed', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello there');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/could not be sent/i));
    expect(screen.getByLabelText('Name')).toHaveValue('Ada');
  });
});
