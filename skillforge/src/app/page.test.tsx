import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the auth function BEFORE importing
vi.mock('@/auth', () => ({
  auth: vi.fn(() => Promise.resolve(null)),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

import Home from './page'

describe('Home Page', () => {
  it('renders without crashing', async () => {
    const { container } = await render(<Home />)
    
    // Wait for the component to render
    await screen.findByRole('main')
    
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})