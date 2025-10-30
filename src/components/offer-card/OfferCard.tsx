import { FC } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'
import { transformOfferData } from '~/utils/transform-offer-data'
import OfferCardLarge from '~/components/offer-card/offer-card-large/OfferCardLarge'
import OfferCardMobile from '~/components/offer-card/offer-card-mobile/OfferCardMobile'
import { Offer } from '~/types'

interface OfferCardProps {
  offer: Offer
}

const OfferCard: FC<OfferCardProps> = ({ offer }) => {
  const { isMobile } = useBreakpoints()
  const allInfo = transformOfferData(offer)

  return (
    <>
      {isMobile ? (
        <OfferCardMobile allInfo={allInfo} />
      ) : (
        <OfferCardLarge allInfo={allInfo} />
      )}
    </>
  )
}

export default OfferCard
