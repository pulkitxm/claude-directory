import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';

describe('Navbar', () => {
  it('renders the logo, asterisk, nav links, and CTA', () => {
    render(<Navbar />);

    expect(screen.getByText('Mainframe®')).toBeTruthy();
    expect(screen.getByText('✱')).toBeTruthy();
    const primary = screen.getByLabelText('Primary');
    for (const label of ['Labs', 'Studio', 'Openings', 'Shop']) {
      expect(primary.textContent).toContain(label);
    }
    expect(screen.getAllByText('Get in touch').length).toBeGreaterThan(0);
  });

  it('toggles the mobile overlay and morphs the hamburger into an X', () => {
    render(<Navbar />);
    const burger = screen.getByRole('button', { name: 'Open menu' });
    const overlay = screen.getByTestId('mobile-overlay');

    expect(overlay.className).toContain('opacity-0');
    expect(overlay.className).toContain('pointer-events-none');

    fireEvent.click(burger);
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(overlay.className).toContain('opacity-100');
    expect(overlay.className).toContain('pointer-events-auto');
    expect(burger.children[0].className).toContain('rotate-45');
    expect(burger.children[1].className).toContain('opacity-0');
    expect(burger.children[2].className).toContain('-rotate-45');

    fireEvent.click(screen.getByLabelText('Mobile').children[0]);
    expect(overlay.className).toContain('opacity-0');
  });
});
