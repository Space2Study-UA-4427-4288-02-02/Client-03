import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import { languages } from '~/constants'
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
            onChange={(_, value) => {
              if (value) {
                handleStepData('language', value)
              }
            }}
            options={Object.values(languages)}
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
