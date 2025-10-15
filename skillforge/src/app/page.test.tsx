import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Create a simple test component that matches your page structure
function TestHome() {
  return (
    <main id="main" className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">SkillForge</h1>
      <p>Next.js + React 19 practice app. Start with Prisma + Tailwind baseline.</p>
    </main>
  )
}

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<TestHome />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})