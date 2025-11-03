import axios from 'axios'
import { store } from '~/redux/store'
import { setPhoto } from '~/redux/reducer'

const uploadImage = async (file, userId) => {
  console.log('Uploading image for user:', userId)
  const formData = new FormData()
  formData.append('image', file)
  await axios.patch(
    `${import.meta.env.VITE_API_BASE_PATH}/users/${userId}/uploadPhoto`,
    formData,
    {
      withCredentials: true
    }
  )
}
export default uploadImage

export const getImageUrl = async (userId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_PATH}/users/${userId}/photo`,
    {
      withCredentials: true
    }
  )

  const url = response.data?.url
  if (url) {
    store.dispatch(setPhoto(url))
  }
  return url
}

export const deleteImage = async (userId) => {
  await axios.delete(
    `${import.meta.env.VITE_API_BASE_PATH}/users/${userId}/photo`,
    {
      withCredentials: true
    }
  )
  store.dispatch(setPhoto(null))
}
