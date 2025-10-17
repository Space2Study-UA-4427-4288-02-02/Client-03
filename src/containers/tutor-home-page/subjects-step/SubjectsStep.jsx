import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Chip } from '@mui/material'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const STEP_KEY = 'subjects'

const getId = (x) => x?._id || x?.id || x?.value || null

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const ctx = stepData?.[STEP_KEY]
  const data = ctx?.data ?? { category: null, subjects: null }
  const errors = ctx?.errors ?? {}

  useEffect(() => {
    if (!ctx) handleStepData(STEP_KEY, data, errors)
  }, [ctx])

  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [subjectsOptions, setSubjectsOptions] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingSubjects, setLoadingSubjects] = useState(false)

  const updateCategories = (patch) =>
    handleStepData(STEP_KEY, { ...data, ...patch }, errors)

  const fetchCategories = async () => {
    if (categoriesOptions.length) return
    setLoadingCategories(true)
    try {
      const res = await categoryService.getCategoriesNames()
      setCategoriesOptions(res.data ?? [])
    } finally {
      setLoadingCategories(false)
    }
  }

  const fetchSubjects = async () => {
    const catId = data.category?._id || data.category?.id || null
    if (!catId) return
    setLoadingSubjects(true)
    try {
      const res = await subjectService.getSubjectsNames(catId)
      setSubjectsOptions(res.data ?? [])
    } finally {
      setLoadingSubjects(false)
    }
  }

  const changeCategory = (_, newValue) => {
    updateCategories({
      category: newValue,
      subjects: null,
      selectedSubjects: []
    })
    setSubjectsOptions([])
  }

  const addCurentSubjectAsChip = () => {
    const current = data.subjects
    if (!current) return
    const id = getId(current)
    if (!id) return

    const exist = data.selectedSubjects.some((s) => getId(s) === id)
    if (exist) {
      updateCategories({ subjects: null })
      return
    }

    updateCategories({
      selectedSubjects: [...(data.selectedSubjects ?? []), current],
      subjects: null
    })
  }

  const removeChip = (id) => {
    updateCategories({
      selectedSubjects: (data.selectedSubjects ?? []).filter(
        (s) => getId(s) !== id
      )
    })
  }

  const canAdd =
    !!data.subjects &&
    !data.selectedSubjects?.some((s) => getId(s) === getId(data.subjects))

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='Category' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rigthBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.categories.title')}
        </Typography>

        <Box component={'form'} sx={styles.form}>
          <AppAutoComplete
            clearOnEscape
            loading={loadingCategories}
            onChange={changeCategory}
            onOpen={fetchCategories}
            options={categoriesOptions}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel'),
              placeholder: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={data.category}
          />

          <AppAutoComplete
            clearOnEscape
            disabled={!data.category}
            loading={loadingSubjects}
            onChange={(_, newValue) => updateCategories({ subjects: newValue })}
            onOpen={fetchSubjects}
            options={subjectsOptions}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel'),
              placeholder: t('becomeTutor.categories.subjectLabel')
            }}
            value={data.subjects}
          />

          <Button
            disabled={!canAdd}
            onClick={addCurentSubjectAsChip}
            sx={styles.addBtn}
            type='button'
          >
            {t('becomeTutor.categories.btnText')}
          </Button>

          {!!data.selectedSubjects?.length && (
            <Stack sx={styles.chipWrap}>
              {data.selectedSubjects.slice(0, 3).map((s) => {
                const id = getId(s)
                return (
                  <Chip
                    key={id}
                    label={s?.name ?? ''}
                    onDelete={() => removeChip(id)}
                    sx={styles.chip}
                  />
                )
              })}
              {data.selectedSubjects.length > 3 && (
                <Chip
                  label={`+${data.selectedSubjects.length - 3}`}
                  sx={styles.moreChip}
                />
              )}
            </Stack>
          )}

          {btnsBox}
        </Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
