import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { supportedLanguages } from '~/constants'
import { getFromLocalStorage } from '~/services/local-storage-service'
import resources from '~/constants/translations'

const storedLanguage = getFromLocalStorage('language')
const lng =
  storedLanguage && supportedLanguages.includes(storedLanguage)
    ? storedLanguage
    : 'en'

void i18n.use(initReactI18next).init({
  resources,
  lng,
  ns: ['translations']
})

i18n.languages = ['en', 'ua']

export default i18n
