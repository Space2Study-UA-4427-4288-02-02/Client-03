import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe } from 'vitest'
import AppChipList from '~/components/app-chips-list/AppChipList'

const handleChipDelete = vi.fn()

const items = [
  'Chip1',
  'Chip2',
  'Chip3',
  'Chip4',
  'Chip5',
  'Chip6',
  'Chip7',
  'Chip8',
  'Chip9',
  'Chip10'
]

describe('AppChipList test', () => {
  it('should show chips', () => {
    render(
      <AppChipList
        defaultQuantity={4}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )
    const firstChip = screen.getByText('Chip1')
    const secondChip = screen.getByText('Chip2')

    expect(firstChip).toBeInTheDocument()
    expect(secondChip).toBeInTheDocument()
  })
  it('it should show chip with +3', () => {
    render(
      <AppChipList
        defaultQuantity={7}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )
    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })
  it('it should show only 7 chips', () => {
    render(
      <AppChipList
        defaultQuantity={7}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )
    expect(screen.getAllByTestId('chip')).toHaveLength(7)
  })
  it('it should show only 10 chips', () => {
    render(
      <AppChipList
        defaultQuantity={10}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )
    expect(screen.getAllByTestId('chip')).toHaveLength(10)
    expect(screen.queryByTestId('amount-of-chips')).toBeNull()
  })
  it('it should delete 1 chip', () => {
    render(
      <AppChipList
        defaultQuantity={10}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )
    const chip1 = screen.getByText('Chip1').closest('[data-testid="chip"]')
    const deleteBtn = within(chip1).getByTestId('close-btn')

    fireEvent.click(deleteBtn)

    expect(handleChipDelete).toHaveBeenCalledWith('Chip1')

    // expect(screen.getAllByTestId('chip')).toHaveLength(9)
  })
})
