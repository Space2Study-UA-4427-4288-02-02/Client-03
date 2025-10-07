import { useStepContext } from '~/context/step-context'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const { data, errors } = stepData['generalInfo']

  const countriesList = [
    { name: 'Ukraine' },
    { name: 'Poland' },
    { name: 'Germany' },
    { name: 'France' },
    { name: 'Italy' },
    { name: 'Spain' },
    { name: 'United Kingdom' },
    { name: 'United States' },
    { name: 'Canada' },
    { name: 'Australia' }
  ]

  const citiesByCountry = {
    Ukraine: ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Dnipro', 'Zaporizhzhia'],
    Poland: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'],
    Germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
    France: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
    'United States': [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix'
    ],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa']
  }

  const availableCities = data.country
    ? (citiesByCountry[data.country.name] || []).map((city) => ({
        name: city
      }))
    : []

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

  const handleInputChange = (field) => (event) => {
    const updatedData = {
      ...data,
      [field]: event.target.value
    }
    handleStepData('generalInfo', updatedData, errors)
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
              label={t('common.labels.firstName')}
              onChange={handleInputChange('firstName')}
              required
              value={data.firstName}
            />
            <AppTextField
              label={t('common.labels.lastName')}
              onChange={handleInputChange('lastName')}
              required
              value={data.lastName}
            />
          </Box>
          <Box sx={styles.selectCountryRow}>
            <AppAutoComplete
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) =>
                option?.name === value?.name
              }
              onChange={handleCountryChange}
              options={countriesList}
              textFieldProps={{
                label: t('common.labels.country'),
                required: false
              }}
              value={data.country}
            />
            <AppAutoComplete
              disabled={!data.country}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) =>
                option?.name === value?.name
              }
              onChange={handleCityChange}
              options={availableCities}
              textFieldProps={{
                label: t('common.labels.city'),
                required: false
              }}
              value={data.city}
            />
          </Box>
          <AppTextArea
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
