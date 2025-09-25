import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AppCard from './AppCard'
import { describe, expect, test, vi } from 'vitest'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('AppCard', () => {
  test('renders correctly without link and onClick (baseline + snapshot)', () => {
    const { asFragment } = render(
      <AppCard data-testid='app-card'>Hello</AppCard>
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()

    expect(screen.queryByRole('link')).toBeNull()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders children content', () => {
    render(<AppCard data-testid='app-card'>Inner content</AppCard>)

    expect(screen.getByText('Inner content')).toBeInTheDocument()
  })

  test('renders as a link when `link` prop is provided', () => {
    renderWithRouter(
      <AppCard data-testid='app-card' link='/demo'>
        Go
      </AppCard>
    )

    const link = screen.getByRole('link', { name: /go/i })
    expect(link).toBeInTheDocument()

    expect(link).toHaveAttribute('href', expect.stringContaining('/demo'))
  })

  test('calls onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <AppCard data-testid='app-card' onClick={handleClick}>
        Click Me
      </AppCard>
    )

    await user.click(screen.getByTestId('app-card'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders as link and still calls onClick when both props are provided', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithRouter(
      <AppCard data-testid='app-card' link='/together' onClick={handleClick}>
        Open
      </AppCard>
    )

    const root = screen.getByRole('link', { name: /open/i })
    expect(root).toBeInTheDocument()

    await user.click(root)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('clicking a non-clickable card does nothing (no errors)', async () => {
    const user = userEvent.setup()
    render(<AppCard data-testid='app-card'>No Action</AppCard>)

    const root = screen.getByTestId('app-card')
    await user.click(root)

    expect(root).toBeInTheDocument()
  })

  test('additional attributes to the root element', () => {
    render(
      <AppCard aria-label='wrapper' data-testid='app-card'>
        Labelled
      </AppCard>
    )

    expect(screen.getByLabelText('wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('app-card')).toBeInTheDocument()
  })
})
