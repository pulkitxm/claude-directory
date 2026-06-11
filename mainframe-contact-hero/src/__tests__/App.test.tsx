import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('types out the full headline and then removes the cursor', async () => {
    const { container } = render(<App />);

    // Cursor blinks while typing.
    await waitFor(() => {
      expect(container.querySelector('.animate-blink')).toBeTruthy();
    });

    // Full two-line headline lands (600ms delay + 28 chars * 38ms).
    await waitFor(
      () => {
        const h1 = container.querySelector('h1');
        expect(h1?.textContent).toBe("we'd love to\nhear from you!");
      },
      { timeout: 4000 },
    );

    await waitFor(() => {
      expect(container.querySelector('.animate-blink')).toBeNull();
    });
  });

  it('renders the description, video, and service section', () => {
    const { container } = render(<App />);

    expect(screen.getByText(/drop us a message and we'll get back to you/i)).toBeTruthy();

    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.muted).toBe(true);
    expect(video?.getAttribute('playsinline')).not.toBeNull();
    expect(video?.getAttribute('preload')).toBe('auto');
    expect(video?.getAttribute('src')).toContain('cloudfront.net');

    expect(container.querySelector('#spade-hero')).toBeTruthy();
    expect(screen.getByText('What sort of service?')).toBeTruthy();
  });
});
