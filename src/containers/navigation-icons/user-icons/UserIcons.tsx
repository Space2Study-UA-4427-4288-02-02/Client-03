import { useState, useRef, useEffect, FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { useCallback } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import Avatar from '@mui/material/Avatar'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'


interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {

    const { userId, userRole, photo } = useAppSelector((state) => state.appMain)
  
    const getUserData = useCallback(
      () => userService.getUserById(userId, userRole),
      [userId, userRole]
    )
  
    const { loading, response } = useAxios({
      service: getUserData,
      fetchOnMount: true,
      defaultResponse: null
    })

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)
  const openNotifications = () => anchorRef.current

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          badgeContent={item.badgeContent?.({
            notifications: 1
          })}
          buttonProps={item.buttonProps({
            openMenu,
            openNotifications,
            setSidebarOpen
          })}
          icon={getUserIcon()}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  function getUserIcon() {
    if (photo) {
      return  <Avatar
        src={photo}
        sx={{ width: 24, height: 24, fontSize: 12, fontWeight: 500 }}
      />
    }
    if (!response) return null
    if (response.photo) {
      return <Avatar
        src={response.photo}
        sx={{ width: 24, height: 24, fontSize: 12, fontWeight: 500 }}
      />
    }

    const first = response.firstName ? response.firstName.trim().charAt(0).toUpperCase() : ''
    const last = response.lastName ? response.lastName.trim().charAt(0).toUpperCase() : ''
    const initials = `${first}${last}`.trim()
    if (!initials) return null

    return (
      <Avatar
        sx={{ width: 24, height: 24, fontSize: 12, fontWeight: 500 }}
      >
        {initials}
      </Avatar>
    )
  }

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      {icons}
      <AccountMenu anchorEl={menuAnchorEl} onClose={closeMenu} />
    </Box>
  )
}

export default UserIcons
