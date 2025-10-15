import { useCallback, useEffect } from 'react'
import { useStepContext } from '~/context/step-context'
import { useAppSelector } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import {
  getCountries,
  getCitiesByCountry
} from '~/services/countries-cities-service'
import { validations as stepValidations } from '~/components/user-steps-wrapper/constants'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const { data, errors } = stepData['generalInfo']

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { response: userResponse } = useAxios({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: null
  })

  useEffect(() => {
    if (!userResponse) return

    if (!data.firstName && !data.lastName) {
      const updatedData = {
        ...data,
        firstName: userResponse.firstName ?? data.firstName,
        lastName: userResponse.lastName ?? data.lastName
      }
      handleStepData('generalInfo', updatedData, errors)
    }
  }, [userResponse, data, errors, handleStepData])

  const handleCountryChange = (event, newValue) => {
    const updatedData = {
      ...data,
      country: newValue,
      city: null
    }
    handleStepData('generalInfo', updatedData, errors)
  }

  const handleCityChange = (event, newValue) => {
    const updatedData = {
      ...data,
      city: newValue
    }
    handleStepData('generalInfo', updatedData, errors)
  }

  const runValidation = (field, value) => {
    if (!stepValidations || !stepValidations[field]) return ''
    const res = t(stepValidations[field](value))
    return res ?? ''
  }

  const handleInputChange = (field) => (event) => {
    const value = event.target.value

    const updatedData = {
      ...data,
      [field]: value
    }

    const newErrors = {
      ...errors,
      [field]: runValidation(field, value)
    }
    handleStepData('generalInfo', updatedData, newErrors)
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='general info' component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box component={'form'} sx={styles.form}>
          <Box sx={styles.nameFieldsRow}>
            <AppTextField
              autoFocus
              errorMsg={errors.firstName}
              label={t('common.labels.firstName')}
              onChange={handleInputChange('firstName')}
              required
              value={data.firstName}
            />
            <AppTextField
              errorMsg={errors.lastName}
              label={t('common.labels.lastName')}
              onChange={handleInputChange('lastName')}
              required
              value={data.lastName}
            />
          </Box>
          <Box sx={styles.selectCountryRow}>
            <AsyncAutocomplete
              labelField='name'
              onChange={handleCountryChange}
              service={getCountries}
              textFieldProps={{
                label: t('common.labels.country'),
                required: false
              }}
              value={data.country}
            />
            <AsyncAutocomplete
              disabled={!data.country}
              fetchCondition={data.country}
              onChange={handleCityChange}
              service={() =>
                getCitiesByCountry(data.country?.name ?? data.country)
              }
              textFieldProps={{
                label: t('common.labels.city'),
                required: false
              }}
              value={data.city}
            />
          </Box>
          <AppTextArea
            errorMsg={errors.professionalSummary}
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={70}
            onChange={handleInputChange('professionalSummary')}
            value={data.professionalSummary}
          />
        </Box>
        <Typography sx={styles.helperText}>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
