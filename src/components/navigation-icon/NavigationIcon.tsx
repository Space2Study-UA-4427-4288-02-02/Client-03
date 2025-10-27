import { FC, ReactElement } from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

interface NavigationIconProps {
  tooltip: string
  icon: ReactElement | string
  buttonProps: IconButtonProps
  badgeContent?: number
}

const NavigationIcon: FC<NavigationIconProps> = ({
  tooltip,
  icon,
  buttonProps,
  badgeContent = 0
}) => {
  const iconNode =
    typeof icon === 'string' ? (
      <Avatar src={icon} alt={tooltip} sx={{ width: 24, height: 24 }} />
    ) : (
      icon
    )

  return (
    <Tooltip arrow title={tooltip}>
      <IconButton {...buttonProps}>
        <Badge badgeContent={badgeContent} color={'error'}>
          {iconNode}
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default NavigationIcon
