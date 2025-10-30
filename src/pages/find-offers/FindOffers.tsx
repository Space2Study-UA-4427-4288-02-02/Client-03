import { useEffect, useState } from 'react'
import { offerService } from '~/services/offers-service'
import { Offer } from '~/types'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferCard from '~/components/offer-card/OfferCard'

const FindOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  useEffect(() => {
    const fetchOffers = async () => {
      const response = await offerService.getOffers()
      const items: Offer[] = response?.data?.items ?? []
      setOffers(items)
    }
    fetchOffers().catch(console.error)
  }, [])

  return (
    <PageWrapper>
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
    </PageWrapper>
  )
}

export default FindOffers
