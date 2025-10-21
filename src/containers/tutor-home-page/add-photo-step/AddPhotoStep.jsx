import { useState, useRef, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DoneIcon from '@mui/icons-material/Done'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import {
  translationKey,
  validationData
} from 'containers/tutor-home-page/add-photo-step/constants'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'

const AddPhotoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const data = stepData['photo']
  const { setAlert } = useSnackBarContext()
  useEffect(() => {
    if (data) setPreview(URL.createObjectURL(data))
  }, [data])
  const { t } = useTranslation()
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (file) => {
    if (!file) return

    try {
      validatePhoto(file)
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      handleStepData('photo', file)
    } catch (e) {
      setAlert({
        severity: snackbarVariants.error,
        message: e.message
      })
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    handleFileChange(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }
  const validatePhoto = (file) => {
    if (!validationData.filesTypes.includes(file.type)) {
      throw new Error(t(validationData.typeError))
    }

    if (file.size > validationData.maxFileSize) {
      throw new Error(t(validationData.fileSizeError))
    }
  }
  return (
    <Box sx={style.root}>
      <input
        accept='image/*'
        hidden
        onChange={handleInputChange}
        ref={fileInputRef}
        type='file'
      />
      <Box
        sx={{ ...style.imgContainer, ...(isDragging ? style.activeDrag : {}) }}
      >
        {preview ? (
          <img
            alt={t(`${translationKey}.imageAlt`)}
            onClick={() => fileInputRef.current.click()}
            src={preview}
            style={style.img}
          />
        ) : (
          <Box
            onClick={() => fileInputRef.current.click()}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{ ...style.uploadBox, ...(isDragging ? style.activeDrag : {}) }}
          >
            <Typography>{t(`${translationKey}.placeholder`)}</Typography>
          </Box>
        )}
      </Box>

      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t(`${translationKey}.description`)}
          </Typography>

          <Box style={style.uploadButtonWrapper}>
            <Button
              onClick={() => fileInputRef.current.click()}
              startIcon={<CloudUploadIcon />}
              sx={style.fileUploader.root}
            >
              {t(`${translationKey}.button`)}
            </Button>

            <Typography variant='caption'>Maximum file size - 10 Mb</Typography>

            {preview && <DoneIcon color='success' style={style.doneIcon} />}
          </Box>
        </Box>

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
