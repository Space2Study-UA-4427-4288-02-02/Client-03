import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { useState, useCallback, useEffect } from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './EditProfile.styles'
import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'

const EditProfile = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({ firstName: '', lastName: '' })
  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as any),
    [userId, userRole]
  )

  const { loading: userLoading, response: userResponse, fetchData } = useAxios<any>({
    service: getUserData,
    fetchOnMount: false,
    defaultResponse: null
  })

  useEffect(() => {
    if (userId && userRole) {
      void fetchData()
    }
  }, [userId, userRole, fetchData])

  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/

  const handleFirstBlur = useCallback(() => {
    const trimmed = firstName.trim()
    setFirstName(trimmed)
    let err = ''
    if (!trimmed) err = t('common.errorMessages.emptyField')
    else if (trimmed.length > 30) err = t('common.errorMessages.nameLength')
    else if (!nameRegex.test(trimmed)) err = t('common.errorMessages.nameAlphabeticOnly')
    setErrors((prev) => ({ ...prev, firstName: err }))
  }, [firstName, t])

  const handleLastBlur = useCallback(() => {
    const trimmed = lastName.trim()
    setLastName(trimmed)
    let err = ''
    if (!trimmed) err = t('common.errorMessages.emptyField')
    else if (trimmed.length > 30) err = t('common.errorMessages.nameLength')
    else if (!nameRegex.test(trimmed)) err = t('common.errorMessages.nameAlphabeticOnly')
    setErrors((prev) => ({ ...prev, lastName: err }))
  }, [lastName, t])

  useEffect(() => {
    if (userResponse) {
      setFirstName(userResponse.firstName ?? '')
      setLastName(userResponse.lastName ?? '')
    }
  }, [userResponse])

  const initials = userResponse
    ? `${userResponse.firstName?.trim().charAt(0)?.toUpperCase() || ''}${userResponse.lastName?.trim().charAt(0)?.toUpperCase() || ''}`.trim()
    : ''

  const [headline, setHeadline] = useState<string>(userResponse?.professionalHeadline ?? '')
  const maxHeadlineLength = 200

  useEffect(() => {
    if (userResponse?.professionalHeadline !== undefined) {
      setHeadline(userResponse.professionalHeadline ?? '')
    }
  }, [userResponse])

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxHeadlineLength) setHeadline(value)
    else setHeadline(value.slice(0, maxHeadlineLength))
  }

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Typography variant='h4' sx={styles.title}>
            Settings
          </Typography>
          <Typography sx={styles.subtitle}>
            Manage your account settings and preferences.
          </Typography>
          <Button
            variant='outlined'
            sx={styles.backButton}
            onClick={() => navigate(authRoutes.accountMenu.myProfile.path)}
          >
            Back to your personal profile
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box>
          <Box component='section' sx={{ mt: 1 }}>
            <Typography variant='h5' sx={{ mb: 1 }}>
              Profile
            </Typography>
            <Typography variant='body2' sx={{ mb: 6, color: 'text.secondary' }}>
              Here you can edit public information about yourself.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='center'>
              <Avatar src={userResponse?.photo} sx={{ width: 96, height: 96 }}>
                {!userResponse?.photo && initials ? initials : null}
              </Avatar>

              <Box>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  Upload new photo
                </Typography>
                <Stack direction='row' spacing={1}>
                  <Button variant='contained'>Upload new photo</Button>
                  <Button variant='outlined'>Remove</Button>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box component='section' sx={{ mt: 4 }}>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Personal information
            </Typography>
            <Typography variant='body2' sx={{ mb: 3, color: 'text.secondary' }}>
              Your name may appear around Spase2Study when mentioned.
            </Typography>

            {/* Name fields row */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <AppTextField
                required
                label={'First name'}
                placeholder={'First Name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleFirstBlur}
                errorMsg={errors.firstName}
                fullWidth
              />

              <AppTextField
                required
                label={'Last name'}
                placeholder={'Last name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleLastBlur}
                errorMsg={errors.lastName}
                fullWidth
              />
            </Box>
          </Box>

          {/* Professional Headline */}
          <Box component='section' sx={{ mt: 1 }}>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Professional Headline
            </Typography>
            <Typography variant='body2' sx={{ mb: 2, color: 'text.secondary' }}>
              Describe your professional status. Maximum 200 characters.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <AppTextField
                multiline
                rows={4}
                placeholder={'Text here'}
                value={headline}
                onChange={handleHeadlineChange}
                fullWidth
                withHelperText={false}
              />
              <Typography variant='caption' sx={{ color: 'text.secondary', alignSelf: 'flex-end' }}>
                {headline.length}/{maxHeadlineLength}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

    </PageWrapper>
  )
}

export default EditProfile
