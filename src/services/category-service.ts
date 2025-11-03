import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'

export const categoryService = {
  getCategories: async (
  params?: Partial<CategoriesParams>
): Promise<ItemsWithCount<CategoryInterface>> => {
  return axiosClient.get<CategoryInterface[]>(URLs.categories.get, { params })
},
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
