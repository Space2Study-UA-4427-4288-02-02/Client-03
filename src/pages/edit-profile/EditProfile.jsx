import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { useState, useCallback, useEffect, useRef } from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './EditProfile.styles'
import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import { validationData } from 'containers/tutor-home-page/add-photo-step/constants'
import { snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import uploadImage, { getImageUrl, deleteImage } from '~/services/photo-service'

const EditProfile = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const fileInputRef = useRef(null)
  const [photoUrl, setPhotoUrl] = useState(undefined)
  const [isPhotoChanging, setIsPhotoChanging] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({ firstName: '', lastName: '' })
  const { userId, userRole, photo } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { loading: userLoading, response: userResponse, fetchData } = useAxios({
    service: getUserData,
    fetchOnMount: false,
    defaultResponse: null
  })

  useEffect(() => {
    if (userId && userRole) {
      fetchData()
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
      setPhotoUrl(userResponse.photo)
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

  const handleHeadlineChange = (e) => {
    const value = e.target.value
    if (value.length <= maxHeadlineLength) setHeadline(value)
    else setHeadline(value.slice(0, maxHeadlineLength))
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    if (isPhotoChanging) return
    handlePhotoChange(file)
    e.target.value = ''
  }

  const handlePhotoChange = async (file) => {
    if (!file) return

    try {
      validatePhoto(file)
      setIsPhotoChanging(true)
      await uploadImage(file, userId)
      const url = await getImageUrl(userId)
      setPhotoUrl(url)
      setIsPhotoChanging(false)
    } catch (e) {
      console.log(e)
      setIsPhotoChanging(false)
      setAlert({
        severity: snackbarVariants.error,
        message: e.message
      })
    }
  }

  const validatePhoto = (file) => {
    if (!validationData.filesTypes.includes(file.type)) {
      throw new Error(t(validationData.typeError))
    }

    if (file.size > validationData.maxFileSize) {
      throw new Error(t(validationData.fileSizeError))
    }
  }

  const handleRemovePhoto = async () => {
    if (isPhotoChanging) return
    try {
      setIsPhotoChanging(true)
      await deleteImage(userId)
        const url = await getImageUrl(userId)
        setPhotoUrl(url)
        if (!url) {
          setAlert({ severity: snackbarVariants.success, message: 'Photo Delete' })
        } else {
          setAlert({ severity: snackbarVariants.error, message: 'Failed to delete photo' })
        }
        setIsPhotoChanging(false)
    } catch (fetchErr) {
      setAlert({ severity: snackbarVariants.error, message: 'Failed to delete photo' })
      setIsPhotoChanging(false)
    }
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

        <Box sx={{maxWidth: { xs: '100%', md: '600px', lg: '800px' }}}>
          <Box component='section' sx={{ mt: 1 }}>
            <Typography variant='h5' sx={{ mb: 1 }}>
              Profile
            </Typography>
            <Typography variant='body2' sx={{ mb: 6, color: 'text.secondary' }}>
              Here you can edit public information about yourself.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='center'>
              {isPhotoChanging ? (
                <Box sx={{ width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress size={28} />
                </Box>
              ) : (
                <Avatar src={photoUrl} sx={{ width: 96, height: 96 }}>
                  {!photoUrl && initials ? initials : null}
                </Avatar>
              )}

              <Box>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  Upload new photo
                </Typography>
                <Stack direction='row' spacing={1}>
                  <input
                    accept='image/*'
                    hidden
                    onChange={handleInputChange}
                    ref={fileInputRef}
                    type='file'
                  />
                  <Button variant='contained' onClick={() => fileInputRef.current?.click()}>
                    Upload new photo
                  </Button>
                  <Button variant='outlined' onClick={handleRemovePhoto}>Remove</Button>
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
