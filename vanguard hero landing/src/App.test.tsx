import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4'

afterEach(cleanup)

describe('VANGUARD hero landing', () => {
  it('renders the background video with the required attributes', () => {
    const { container } = render(<App />)
    const video = container.querySelector('video')
    expect(video).not.toBeNull()
    expect(video!.src).toBe(VIDEO_URL)
    expect(video!.hasAttribute('autoplay')).toBe(true)
    expect(video!.hasAttribute('loop')).toBe(true)
    expect(video!.hasAttribute('playsinline')).toBe(true)
    expect(video!.muted).toBe(true)
    expect(video!.className).toContain('object-cover')
  })

  it('renders the brand name in the navbar and the mobile menu', () => {
    render(<App />)
    expect(screen.getAllByText('VANGUARD')).toHaveLength(2)
  })

  it('renders the three heading lines', () => {
    render(<App />)
    expect(screen.getByText('Design.')).toBeTruthy()
    expect(screen.getByText('Disrupt.')).toBeTruthy()
    expect(screen.getByText('Conquer.')).toBeTruthy()
  })

  it('renders the tagline, subtext, and CTAs', () => {
    render(<App />)
    expect(screen.getByText('World-Class Digital Collective')).toBeTruthy()
    expect(screen.getByText(/turn heads/)).toBeTruthy()
    expect(screen.getByText('they lead.')).toBeTruthy()
    expect(screen.getByText('SEE OUR WORK')).toBeTruthy()
    expect(screen.getAllByText('GET IN TOUCH')).toHaveLength(2)
    expect(screen.getByText('Top-Rated')).toBeTruthy()
    expect(screen.getByText('Brand Studio')).toBeTruthy()
  })

  it('renders each nav link in the desktop nav and the mobile menu', () => {
    render(<App />)
    for (const link of ['Projects', 'Studio', 'Offerings', 'Inquire']) {
      expect(screen.getAllByText(link)).toHaveLength(2)
    }
  })

  it('renders all three stats', () => {
    render(<App />)
    expect(screen.getByText('250+')).toBeTruthy()
    expect(screen.getByText('Brands Transformed')).toBeTruthy()
    expect(screen.getByText('95%')).toBeTruthy()
    expect(screen.getByText('Client Retention')).toBeTruthy()
    expect(screen.getByText('10+')).toBeTruthy()
    expect(screen.getByText('Years in the Game')).toBeTruthy()
  })

  it('opens and closes the mobile menu', () => {
    render(<App />)
    const menu = screen.getByTestId('mobile-menu')
    expect(menu.className).toContain('invisible')
    expect(menu.className).toContain('opacity-0')

    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(menu.className).toContain('visible')
    expect(menu.className).toContain('opacity-100')

    fireEvent.click(within(menu).getByText('Projects'))
    expect(menu.className).toContain('invisible')
    expect(menu.className).toContain('opacity-0')
  })

  it('closes the mobile menu via the X button', () => {
    render(<App />)
    const menu = screen.getByTestId('mobile-menu')
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(menu.className).toContain('opacity-100')
    fireEvent.click(screen.getByLabelText('Close menu'))
    expect(menu.className).toContain('opacity-0')
  })
})
