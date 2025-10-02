import { useState } from 'react'
import styles from './SignupPopup.styles'

import ImgTutor from '~/assets/img/signup-dialog/tutor.svg'
import ImgStudent from '~/assets/img/signup-dialog/student.svg'

import {
  TextField,
  Button,
  IconButton,
  Checkbox,
  Divider,
  Box,
  Typography,
  InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff, Google } from '@mui/icons-material'

export default function SignupPopup({ role }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.imageBox}>
        <Box
          alt='Signup illustration'
          component='img'
          src={role === 'tutor' ? ImgTutor : ImgStudent}
          sx={styles.image}
        />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title}>Sign up as a {role}</Typography>

        <Box component='form' sx={styles.formBox}>
          <Box sx={styles.nameFields}>
            <TextField
              error
              fullWidth
              helperText='This field cannot be empty'
              label='First name *'
            />
            <TextField fullWidth label='Last name *' />
          </Box>
          <TextField
            error
            fullWidth
            helperText='This field cannot be empty'
            label='Email *'
            type='email'
          />

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error
            fullWidth
            helperText='This field cannot be empty'
            label='Password *'
            type={showPassword ? 'text' : 'password'}
          />

          <TextField fullWidth label='Confirm password *' type='password' />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox />
            <Typography variant='body2'>
              I agree to the
              <Typography component='span' sx={styles.linkText}>
                Terms
              </Typography>
              and
              <Typography component='span' sx={styles.linkText}>
                Privacy Policy
              </Typography>
            </Typography>
          </Box>

          <Button disabled fullWidth variant='contained'>
            Sign up
          </Button>

          <Box sx={styles.dividerBox}>
            <Divider sx={{ flex: 1 }} />
            <Typography color='textSecondary' variant='body2'>
              or continue
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button fullWidth startIcon={<Google />} variant='outlined'>
            Sign in with Google
          </Button>

          <Typography align='center' mt={1} variant='body2'>
            Already have a Space2Study account?
            <Typography component='span' sx={styles.linkText}>
              Login!
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
