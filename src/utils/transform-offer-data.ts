import { allOfferInfo, Offer } from '~/types'
import { ProficiencyLevelEnum, LanguagesEnum } from '~/types'

export const transformOfferData = (offer: Offer): allOfferInfo => {
  return {
    authorName: `${offer.author.firstName} ${offer.author.lastName}`,
    reviewsQuantity:
      offer.author.totalReviews.student + offer.author.totalReviews.tutor,
    offerTitle: offer.title,
    offerDescription: offer.description,
    profficiencyLevel: offer.proficiencyLevel || [
      ProficiencyLevelEnum.Beginner
    ],
    languages: offer.languages || [LanguagesEnum.English],
    subject: offer.subject.name,
    profilePicture: offer.author.photo as string,
    price: offer.price,
    totalRating: offer.author.averageRating.student || 0
  }
}
