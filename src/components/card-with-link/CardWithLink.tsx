import { FC } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'

interface CardWithLinkProps {
  img: React.FC<React.SVGProps<SVGSVGElement>> | string
  title: string
  description: string
  link: string
  color: string
}

const CardWithLink: FC<CardWithLinkProps> = ({
  img,
  title,
  description,
  link,
  color
}) => {
  const isString = typeof img === 'string'
  return (
    <AppCard link={link}>
      {isString ? (
        <Box alt='item image' component='img' src={img} sx={styles.img} />
      ) : (
        <Box sx={styles.img}>
          {(() => {
            const SvgComponent = img as React.FC<React.SVGProps<SVGSVGElement>>
            return <SvgComponent width='100%' height='100%' fill={color} />
          })()}
        </Box>
      )}
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
