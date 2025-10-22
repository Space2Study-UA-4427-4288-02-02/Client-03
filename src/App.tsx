import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'

import { theme } from './styles/app-theme/custom-mui.styles'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <ConfirmationDialogProvider>
            <ModalProvider>
              <Outlet />
            </ModalProvider>
          </ConfirmationDialogProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
