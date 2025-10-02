import { FC } from 'react'

import AppButton from '~/components//app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import SignupPopup from '~/containers/signup-module/SignupPopup'
import { useModalContext } from '~/context/modal-context'

import { styles } from '~/components/info-card/InfoCard.styles'

interface InfoCardProps {
  img: string
  title: string
  description: string
  actionLabel: string
  actionType: string
  cardWidth: number
  action: () => void
}

const InfoCard: FC<InfoCardProps> = ({
  img,
  title,
  description,
  actionLabel,
  actionType,
  cardWidth,
  action
}) => {
  const { openModal } = useModalContext()
  const handleClick = () => {
    action()
    openModal({
      component: <SignupPopup role={actionType} />
    })
  }
  return (
    <AppCard sx={{ ...styles.card, maxWidth: cardWidth }}>
      <ImgTitleDescription
        description={description}
        img={img}
        style={styles.imgTitleDescription}
        title={title}
      />
      <AppButton onClick={handleClick} sx={styles.button}>
        {actionLabel}
      </AppButton>
    </AppCard>
  )
}

export default InfoCard
