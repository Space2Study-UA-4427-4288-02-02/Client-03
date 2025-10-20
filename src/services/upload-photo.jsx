import axios from 'axios'

const uploadImage = async (file, userId) => {
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
