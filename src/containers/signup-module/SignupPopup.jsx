import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  InputAdornment,
  Tooltip
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Google,
  InfoOutlined
} from '@mui/icons-material'

const NAME_REGEX =
  /^[A-Za-zА-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+(?: [A-Za-zА-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+)?$/u
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values, t) {
  const errors = {}

  if (!values.firstName.trim()) {
    errors.firstName = t('signupErrors.empty')
  } else if (values.firstName.length > 30) {
    errors.firstName = t('signupErrors.firstTooLong')
  } else if (!NAME_REGEX.test(values.firstName)) {
    errors.firstName = t('signupErrors.firstLettersOnly')
  }

  if (!values.lastName.trim()) {
    errors.lastName = t('signupErrors.empty')
  } else if (values.lastName.length > 30) {
    errors.lastName = t('signupErrors.lastTooLong')
  } else if (!NAME_REGEX.test(values.lastName)) {
    errors.lastName = t('signupErrors.lastLettersOnly')
  }

  if (!values.email.trim()) {
    errors.email = t('signupErrors.empty')
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = t('signupErrors.emailFormat')
  }

  if (!values.password) {
    errors.password = t('signupErrors.empty')
  } else if (values.password.length < 8 || values.password.length > 25) {
    errors.password = t('signupErrors.passworfLength')
  } else {
    const hasLetter = /[A-Za-z]/.test(values.password)
    const hasNumber = /\d/.test(values.password)
    if (!hasLetter || !hasNumber) {
      errors.password = t('signupErrors.passwordCombo')
    }
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = t('signupErrors.empty')
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = t('signupErrors.passwordMatch')
  }

  return errors
}

const renderHelper = (msg) =>
  msg ? (
    <Tooltip placement='bottom-start' title={msg}>
      <Box
        component='span'
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
      >
        <InfoOutlined fontSize='inherit' />
        {msg}
      </Box>
    </Tooltip>
  ) : (
    ' '
  )

export default function SignupPopup({ role }) {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const errors = useMemo(() => validate(values, t), [values, t])

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  const canSubmit = useMemo(() => {
    const hasErrors = Object.values(errors).some(Boolean)
    return !hasErrors && accepted
  }, [errors, accepted])

  const onChange = (name) => (e) =>
    setValues((p) => ({ ...p, [name]: e.target.value }))

  const onBlur = (name) => () => setTouched((p) => ({ ...p, [name]: true }))

  const onSubmit = (e) => {
    e.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true
    })
  }

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

        <Box component='form' onSubmit={onSubmit} sx={styles.formBox}>
          <Box sx={styles.nameFields}>
            <TextField
              error={touched.firstName && Boolean(errors.firstName)}
              fullWidth
              helperText={
                touched.firstName ? renderHelper(errors.firstName) : ' '
              }
              label='First name *'
              onBlur={onBlur('firstName')}
              onChange={onChange('firstName')}
              value={values.firstName}
            />
            <TextField
              error={touched.lastName && Boolean(errors.lastName)}
              fullWidth
              helperText={
                touched.lastName ? renderHelper(errors.lastName) : ' '
              }
              label='Last name *'
              onBlur={onBlur('lastName')}
              onChange={onChange('lastName')}
              value={values.lastName}
            />
          </Box>
          <TextField
            error={touched.email && Boolean(errors.email)}
            fullWidth
            helperText={touched.email ? renderHelper(errors.email) : ' '}
            label='Email *'
            onBlur={onBlur('email')}
            onChange={onChange('email')}
            type='email'
            value={values.email}
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
            error={touched.password && Boolean(errors.password)}
            fullWidth
            helperText={touched.password ? renderHelper(errors.password) : ' '}
            label='Password *'
            onBlur={onBlur('password')}
            onChange={onChange('password')}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
          />

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            fullWidth
            helperText={
              touched.confirmPassword
                ? renderHelper(errors.confirmPassword)
                : ' '
            }
            label='Confirm password *'
            onBlur={onBlur('confirmPassword')}
            onChange={onChange('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            value={values.confirmPassword}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
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

          <Button
            disabled={!canSubmit}
            fullWidth
            type='submit'
            variant='contained'
          >
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
