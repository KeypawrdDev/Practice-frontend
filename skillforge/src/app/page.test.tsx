import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    // Add a simple assertion to verify the component renders
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
