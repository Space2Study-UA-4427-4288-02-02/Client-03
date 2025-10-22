import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import Typography from '@mui/material/Typography'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.languages.title')}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <AppAutoComplete
            options={Object.entries(
              t('common.languages', { returnObjects: true })
            )
              .filter(([key]) => key !== 'allLanguages')
              // eslint-disable-next-line no-unused-vars
              .map(([_, value]) => value)}
            renderOption={(props, option) => (
              <li
                {...props}
                onClick={(e) => {
                  props.onClick && props.onClick(e)
                  handleStepData('language', option)
                }}
              >
                {option}
              </li>
            )}
            textFieldProps={{
              label: t('becomeTutor.languages.autocompleteLabel'),
              fullWidth: true
            }}
            value={stepData['language'] ?? null}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
