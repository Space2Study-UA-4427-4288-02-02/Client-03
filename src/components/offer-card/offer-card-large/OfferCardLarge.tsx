import { FC } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'
import { Box, Typography } from '@mui/material'
import AppButton from '~/components//app-button/AppButton'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import { useTranslation } from 'react-i18next'
import AppCard from '~/components/app-card/AppCard'
import AppRating from '~/components/app-rating/AppRating'
import ClickableImage from '~/components/clickable-image/ClickableImage'
import { IconButton } from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import { styles } from './OfferCardLarge.styles'
import avatarImg from '~/assets/img/tutor-profile-page/avatar.png'
import { allOfferInfo } from '~/types'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

interface OfferCardDataProps {
  allInfo: allOfferInfo
}

const OfferCardLarge: FC<OfferCardDataProps> = ({ allInfo }) => {
  const { t } = useTranslation()
  const { isTablet } = useBreakpoints()

  return (
    <AppCard sx={styles.card}>
      <Box sx={styles.authorSection}>
        <ClickableImage
          image={{
            name: 'Avatar',
            path: allInfo.profilePicture || avatarImg
          }}
          style={styles.photo}
        />
        <Box sx={styles.authorInfo}>
          {!isTablet && (
            <Typography sx={styles.authorName} variant='body2'>
              {allInfo.authorName}
            </Typography>
          )}
          <AppRating
            showNumber
            sx={styles.rating}
            value={allInfo.totalRating}
          />
          <Typography sx={styles.reviews} variant='caption'>
            {`${allInfo.reviewsQuantity} reviews`}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.content}>
        {isTablet && (
          <Typography sx={styles.authorName} variant='body2'>
            {allInfo.authorName}
          </Typography>
        )}
        <Typography sx={styles.title} variant='h6'>
          {allInfo.offerTitle}
        </Typography>
        <SubjectLevelChips
          proficiencyLevel={allInfo.profficiencyLevel}
          subject={allInfo.subject}
        />
        <Typography sx={styles.description} variant='body2'>
          {allInfo.offerDescription}
        </Typography>
        <Box sx={styles.languagesList}>
          <LanguagesListWithIcon languages={allInfo.languages} />
        </Box>
      </Box>
      <Box sx={styles.priceAndButtonsSection}>
        <Box sx={styles.priceSection}>
          <Box>
            <Typography sx={styles.price} variant='h6'>
              {`${allInfo.price} ${t('common.uah')}`}
            </Typography>
            <Typography sx={styles.perHour} variant='overline'>
              /{t('common.hour')}
            </Typography>
          </Box>
          <IconButton>
            <BookmarkBorderOutlinedIcon color='primary' />
          </IconButton>
        </Box>
        <Box sx={styles.buttonGroup}>
          <AppButton variant='contained'>
            {t('common.labels.viewDetails')}
          </AppButton>
          <AppButton variant='tonal'>
            {t('common.labels.sendMessage')}
          </AppButton>
        </Box>
      </Box>
    </AppCard>
  )
}

export default OfferCardLarge
