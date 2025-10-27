import { useState, useRef, FC } from 'react'
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
import { defaultResponses } from '~/constants'

interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {

    const { userId, userRole } = useAppSelector((state) => state.appMain)
  
    const getUserData = useCallback(
      () => userService.getUserById(userId, userRole),
      [userId, userRole]
    )
  
    const { loading, response } = useAxios({
      service: getUserData,
      fetchOnMount: true,
      defaultResponse: defaultResponses.array
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
          icon={getUserIcon(response) ?? item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  function getUserIcon(user: any) {
    if (!user) return null
    if (user.photo) return user.photo

    const first = user.firstName ? user.firstName.trim().charAt(0).toUpperCase() : ''
    const last = user.lastName ? user.lastName.trim().charAt(0).toUpperCase() : ''
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
