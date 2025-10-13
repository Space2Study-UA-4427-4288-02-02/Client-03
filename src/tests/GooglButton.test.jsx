import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import GoogleButton from '~/containers/guest-home-page/google-button/GoogleButton'

const mockCloseModal = vi.fn()
const mockSetAlert = vi.fn()
const mockUnwrap = vi.fn()
const mockGoogleAuth = vi.fn(() => ({ unwrap: mockUnwrap }))

vi.mock('~/context/modal-context', () => ({
  useModalContext: () => ({
    closeModal: mockCloseModal
  })
}))

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: () => ({
    setAlert: mockSetAlert
  })
}))

vi.mock('~/services/auth-service', () => ({
  useGoogleAuthMutation: () => [mockGoogleAuth]
}))

vi.mock('~/utils/hash-scroll', () => ({
  scrollToHash: vi.fn()
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: () => ({
    isLaptopAndAbove: true
  })
}))

global.google = {
  accounts: {
    id: {
      initialize: vi.fn(),
      renderButton: vi.fn()
    }
  }
}

describe('GoogleButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes and renders Google button on mount', () => {
    render(
      <MemoryRouter>
        <GoogleButton
          buttonWidth={{ xs: 200, md: 300 }}
          role='student'
          route='/register'
          type='signup'
        />
      </MemoryRouter>
    )

    const button =
      screen.queryByRole('button', { hidden: true }) ||
      screen.queryByTestId('googleButton') ||
      document.getElementById('googleButton')

    expect(button).toBeInTheDocument()
    expect(global.google.accounts.id.initialize).toHaveBeenCalled()
    expect(global.google.accounts.id.renderButton).toHaveBeenCalled()
  })

  it('calls closeModal on successful Google login', async () => {
    render(
      <MemoryRouter>
        <GoogleButton
          buttonWidth={{ xs: 200, md: 300 }}
          role='student'
          route='/register'
          type='signup'
        />
      </MemoryRouter>
    )

    const response = { credential: 'fake_token' }

    await act(async () => {
      const callback =
        global.google.accounts.id.initialize.mock.calls[0][0].callback
      await callback(response)
    })

    expect(mockGoogleAuth).toHaveBeenCalledWith({
      idToken: 'fake_token',
      role: 'student'
    })
    expect(mockUnwrap).toHaveBeenCalled()
    expect(mockCloseModal).toHaveBeenCalled()
  })

  it('shows snackbar and scrolls on USER_NOT_FOUND', async () => {
    mockUnwrap.mockRejectedValueOnce({ data: { code: 'USER_NOT_FOUND' } })
    const { scrollToHash } = await import('~/utils/hash-scroll')

    render(
      <MemoryRouter>
        <GoogleButton
          buttonWidth={{ xs: 200, md: 300 }}
          role='student'
          route='/register'
          type='signup'
        />
      </MemoryRouter>
    )

    const response = { credential: 'bad_token' }

    await act(async () => {
      const callback =
        global.google.accounts.id.initialize.mock.calls[0][0].callback
      await callback(response)
    })

    expect(mockSetAlert).toHaveBeenCalledWith({
      severity: 'error',
      message: 'errors.USER_NOT_FOUND'
    })
    expect(mockCloseModal).toHaveBeenCalled()
    expect(scrollToHash).toHaveBeenCalled()
  })
})
