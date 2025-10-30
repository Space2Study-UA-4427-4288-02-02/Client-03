import { AlertColor } from '@mui/material/Alert'
import { LanguagesEnum } from '~/types'

export const s2s = 's2s'

export const student = 'student'
export const tutor = 'tutor'
export const admin = 'admin'

export const login = 'login'
export const signup = 'signup'

export const snackbarVariants: { [key: string]: AlertColor } = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning'
}

export const defaultResponses = {
  array: [],
  object: {},
  itemsWithCount: { count: 0, items: [] }
}

export const itemsLoadLimit = {
  tablet: 10,
  mobile: 6,
  default: 12
}

export const supportedLanguages = ['en', 'ua']

export const languages = {
  [LanguagesEnum.English]: 'English',
  [LanguagesEnum.Spanish]: 'Español',
  [LanguagesEnum.French]: 'Français',
  [LanguagesEnum.German]: 'Deutsch',
  [LanguagesEnum.Ukrainian]: 'Українська',
  [LanguagesEnum.Polish]: 'Polski',
  [LanguagesEnum.Arabic]: 'العربية'
}
