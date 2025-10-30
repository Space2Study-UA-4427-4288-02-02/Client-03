import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { Offer, ItemsWithCount } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

const urlsWithType = URLs as { offers: { get: string; getById: string } }

export const offerService = {
  getOffers: (): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(`${urlsWithType.offers.get}`)
  },

  getOfferById: (id: string): Promise<AxiosResponse<Offer>> => {
    return axiosClient.get(createUrlPath(urlsWithType.offers.getById, id))
  }
}
