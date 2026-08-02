// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

afterEach(cleanup);

beforeEach(() => {
  vi.restoreAllMocks();
});

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/notes/i), 'I have a project idea.');
}

describe('ContactForm', () => {
  it('does not submit when required fields are empty', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the form values and shows a success state on a 2xx response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://example.test/lead');
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      note: 'I have a project idea.',
      topic: 'Product Development',
    });

    expect(await screen.findByText(/sent/i)).toBeTruthy();
  });

  it('shows an error message when the request fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response);
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toMatch(/something went wrong/i);
  });
});
