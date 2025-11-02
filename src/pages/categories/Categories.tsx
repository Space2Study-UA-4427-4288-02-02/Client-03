import { useState, useMemo, useCallback } from 'react'
import useLoadMore from '~/hooks/use-load-more'
import Box from '@mui/material/Box'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import CardsList from '~/components/cards-list/CardsList'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import { itemsLoadLimit } from '~/constants'
import { styles } from './Categories.styles'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { CategoryInterface, CategoriesParams, SizeEnum } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryColors, categoryIcons } from './Categories.constants'

const Categories = () => {
  const [match, setMatch] = useState('')
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const params = useMemo(() => ({ name: match }), [match])
  const {
    loading: categoryNamesLoading,
    response: categoryNamesItems,
    fetchData
  } = useCategoriesNames({
    fetchOnMount: false
  })
  const getCategories = useCallback(
    (data?: Partial<CategoriesParams>) => categoryService.getCategories(data),
    []
  )
  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable,
  } = useLoadMore<CategoryInterface, Partial<CategoriesParams>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })
  const cards = useMemo(
    () =>
      categories.map((item) => {
          return (
            <CardWithLink
              description={'offers: 234'}
              img={categoryIcons[item.appearance.icon]}
              color={categoryColors[item.appearance.color]}
              key={item._id}
              link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
              title={item.name}
            />
          )
        }),
    [categories]
  )
  const getCategoryNames = () => !categoryNamesItems.length && void fetchData()

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={getCategoryNames}
          onSearchChange={resetData}
          options={categoryNamesItems.map((item) => item.name)}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable={isExpandable}
        loading={categoriesLoading}
        onClick={loadMore}
      />
    </PageWrapper>
  )
}

export default Categories
