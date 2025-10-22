import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getFromLocalStorage } from '~/services/local-storage-service'
import resources from '~/constants/translations'

void i18n.use(initReactI18next).init({
  resources,
  lng: getFromLocalStorage('language') || 'en',
  ns: ['translations']
})

i18n.languages = ['en', 'ua']

export default i18n
