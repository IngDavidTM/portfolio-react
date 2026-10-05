import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import renderWithProviders from '../test/renderWithProviders';
import Sheet from './Sheet';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <Sheet open={open} label="Example" closeLabel="Close example" onClose={() => setOpen(false)}>
        <p>Sheet body</p>
      </Sheet>
    </>
  );
};

const openSheet = async (user) => {
  await user.click(screen.getByRole('button', { name: 'Open' }));
  return screen.getByRole('dialog', { name: 'Example' });
};

describe('Sheet', () => {
  it('locks scrolling and moves focus inside when opened', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await openSheet(user);

    expect(screen.getByText('Sheet body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close example' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape, unlocks scrolling and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);
    await openSheet(user);

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });

  it('closes from the close button and from the scrim', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Harness />);

    await openSheet(user);
    await user.click(screen.getByRole('button', { name: 'Close example' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    await openSheet(user);
    act(() => { document.querySelector('.sheet_scrim').click(); });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
