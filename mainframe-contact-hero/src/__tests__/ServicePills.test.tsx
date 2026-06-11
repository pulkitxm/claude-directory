import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ServicePills } from '../components/ServicePills';

describe('ServicePills', () => {
  it('renders the prompt, subtitle, all four options, and the empty placeholder', () => {
    render(<ServicePills />);

    expect(screen.getByText('What sort of service?')).toBeTruthy();
    expect(screen.getByText('Select all that apply')).toBeTruthy();
    for (const option of ['Brand', 'Digital', 'Campaign', 'Other']) {
      expect(screen.getByRole('button', { name: option })).toBeTruthy();
    }
    expect(screen.getByText('Please click to select services above.')).toBeTruthy();
  });

  it('supports multi-select and shows the joined acknowledgment banner', async () => {
    const { container } = render(<ServicePills />);

    fireEvent.click(screen.getByRole('button', { name: 'Brand' }));
    await waitFor(() => {
      expect(container.textContent).toContain('Ready to inquire about: Brand');
    });
    expect(screen.getByRole('button', { name: 'Brand' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: /Let's Go/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Digital' }));
    await waitFor(() => {
      expect(container.textContent).toContain('Ready to inquire about: Brand, Digital');
    });
  });

  it('applies active styling to selected pills and restores the placeholder on deselect', async () => {
    const { container } = render(<ServicePills />);
    const brand = screen.getByRole('button', { name: 'Brand' });

    fireEvent.click(brand);
    expect(brand.className).toContain('bg-[#1C2E1E]');
    expect(brand.className).toContain('text-white');

    fireEvent.click(screen.getByRole('button', { name: 'Brand' }));
    expect(screen.getByRole('button', { name: 'Brand' }).className).toContain('border-[#F1F3F1]');
    await waitFor(() => {
      expect(container.textContent).toContain('Please click to select services above.');
    });
  });
});
