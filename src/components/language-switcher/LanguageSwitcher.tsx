import { FC, useState, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LanguageIcon from '@mui/icons-material/Language'
import { styles } from './LanguageSwitcher.styles'

const LanguagesList = [
  { code: 'en', label: 'English' },
  { code: 'ua', label: 'Українська' }
]

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation()
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorElement)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleLanguageChange = (code: string) => () => {
    void i18n.changeLanguage(code)
    handleClose()
  }

  return (
    <>
      <IconButton
        aria-controls={isOpen ? 'language-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={styles.iconButton}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'language-button'
        }}
        anchorEl={anchorElement}
        id='language-menu'
        onClose={handleClose}
        open={isOpen}
      >
        {LanguagesList.map((language) => (
          <MenuItem
            key={language.code}
            onClick={handleLanguageChange(language.code)}
            selected={i18n?.resolvedLanguage === language.code}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSwitcher
