import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('SearchFilterInput', () => {
  const mockFunction = vi.fn()
  const defaultProps = {
    updateFilter: mockFunction,
    textFieldProps: { placeholder: 'Search...' }
  }

  beforeEach(() => {
    render(<SearchFilterInput {...defaultProps} />)
  })

  it('it should render component with input in it', () => {
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    const searchIcon = screen.getByTestId('SearchIcon')
    expect(searchIcon).toBeInTheDocument()

    const buttonElement = screen.getByRole('button', { name: 'common.search' })
    expect(buttonElement).toBeInTheDocument()
  })

  it('should render typed text correctly', async () => {
    const inputElement = screen.getByRole('textbox')
    await userEvent.type(inputElement, 'test query')

    expect(inputElement).toHaveValue('test query')
  })

  it('should render delete button when text is typed', async () => {
    const inputElement = screen.getByRole('textbox')
    await userEvent.type(inputElement, 'test query')
    expect(inputElement).toHaveValue('test query')

    const deleteButton = screen.getByTestId('clearIcon')
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeVisible()
  })

  it('should delete typed text when delete button is clicked', async () => {
    const inputElement = screen.getByRole('textbox')

    await userEvent.type(inputElement, 'test query')
    expect(inputElement).toHaveValue('test query')

    const deleteButton = screen.getByTestId('clearIcon')
    await userEvent.click(deleteButton)

    expect(inputElement).toHaveValue('')
    expect(deleteButton).not.toBeVisible()
  })

  it('should call updateFilter function on search button click', async () => {
    const searchButton = screen.getByRole('button', { name: 'common.search' })
    const inputElement = screen.getByRole('textbox')

    await userEvent.type(inputElement, 'test query')
    await userEvent.click(searchButton)

    expect(defaultProps.updateFilter).toHaveBeenCalled(1)
    expect(defaultProps.updateFilter).toHaveBeenCalledWith('test query')
  })

  it('should call updateFilter function on Enter key press', async () => {
    const inputElement = screen.getByRole('textbox')
    await userEvent.type(inputElement, 'test query')
    await userEvent.keyboard('{Enter}')

    expect(defaultProps.updateFilter).toHaveBeenCalled(1)
    expect(defaultProps.updateFilter).toHaveBeenCalledWith('test query')
  })
})
