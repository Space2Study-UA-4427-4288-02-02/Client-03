import { useEffect, useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferCard from '~/components/offer-card/OfferCard'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppPagination from '~/components/app-pagination/AppPagination'

import useBreakpoints from '~/hooks/use-breakpoints'
import { offerService } from '~/services/offers-service'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import {
  Offer,
  SizeEnum,
  CategoryNameInterface,
  SubjectNameInterface
} from '~/types'
import { ITEMS_PER_PAGE } from '~/pages/find-offers/FindOffer.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const [offers, setOffers] = useState<Offer[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchOffers = async () => {
      const params: Record<string, number | string> = {
        limit: ITEMS_PER_PAGE,
        skip: (currentPage - 1) * ITEMS_PER_PAGE
      }
      const normalizedSearch = search.trim().replace(/\s+/g, ' ')
      if (normalizedSearch) params.search = normalizedSearch
      if (categoryId) params.category = categoryId
      if (subjectId) params.subject = subjectId
      const response = await offerService.getOffers(params)
      const items: Offer[] = response?.data?.items ?? []
      const count: number = response?.data?.count ?? 0
      setOffers(items)
      setTotalCount(count)
    }
    fetchOffers().catch(console.error)
  }, [search, categoryId, subjectId, currentPage])

  const options = useMemo(() => offers.map((o) => o.title ?? ''), [offers])

  const handleParamsChange = useCallback(
    (newValues: Record<string, string>, clearPage = false) => {
      setSearchParams((prevParams) => {
        const newSearchParams = new URLSearchParams(prevParams)
        for (const key in newValues) {
          const value = newValues[key]
          if (value === '') {
            newSearchParams.delete(key)
          } else {
            newSearchParams.set(key, value)
          }
        }
        if (clearPage) {
          newSearchParams.set('page', '1')
        }
        return newSearchParams
      })
    },
    [setSearchParams]
  )

  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      handleParamsChange({ page: String(value) })
    },
    [handleParamsChange]
  )

  const handleCategoryChange = useCallback(
    (
      event: React.ChangeEvent<unknown>,
      value: CategoryNameInterface | null
    ) => {
      handleParamsChange({ categoryId: value?._id ?? '', subjectId: '' }, true)
    },
    [handleParamsChange]
  )

  const handleSubjectChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: SubjectNameInterface | null) => {
      handleParamsChange({ subjectId: value?._id ?? '' }, true)
    },
    [handleParamsChange]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
      const newSearchParams = new URLSearchParams(searchParams)
      if (newSearchParams.get('page') !== '1') {
        newSearchParams.set('page', '1')
        setSearchParams(newSearchParams)
      }
    },
    [searchParams, setSearchParams]
  )

  const autocompleteData = (
    <>
      <AsyncAutocomplete
        labelField='name'
        onChange={handleCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.searchDropdown}
        textFieldProps={{
          label: t('offerPage.labels.category')
        }}
        value={categoryId}
        valueField='_id'
      />
      <AsyncAutocomplete
        disabled={categoryId === ''}
        labelField='name'
        onChange={handleSubjectChange}
        service={() => subjectService.getSubjectsById(categoryId ?? null)}
        sx={styles.searchDropdown}
        textFieldProps={{
          label: t('offerPage.labels.subject')
        }}
        value={subjectId}
        valueField='_id'
      />
    </>
  )

  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autocompleteData}
        <SearchAutocomplete
          options={options}
          search={search}
          setSearch={handleSearchChange}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autocompleteData}
      {!offers.length ? (
        <NotFoundResults description={t('findOffers.notFound.description')} />
      ) : (
        <>
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
          <AppPagination
            onChange={handleChangePage}
            page={currentPage}
            pageCount={pageCount}
          />
        </>
      )}
    </PageWrapper>
  )
}

export default FindOffers
