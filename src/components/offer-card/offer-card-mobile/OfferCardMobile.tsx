import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import AppButton from '~/components//app-button/AppButton'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import { useTranslation } from 'react-i18next'
import AppCard from '~/components/app-card/AppCard'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import ClickableImage from '~/components/clickable-image/ClickableImage'
import { IconButton } from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import { styles } from './OfferCardMobile.styles'
import avatarImg from '~/assets/img/tutor-profile-page/avatar.png'
import { allOfferInfo } from '~/types'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

interface OfferCardDataProps {
  allInfo: allOfferInfo
}

const OfferCardMobile: FC<OfferCardDataProps> = ({ allInfo }) => {
  const { t } = useTranslation()

  return (
    <AppCard sx={styles.card}>
      <IconButton sx={styles.bookmarkButton}>
        <BookmarkBorderOutlinedIcon color='primary' />
      </IconButton>
      <Box sx={styles.header}>
        <Box sx={styles.authorsInfo}>
          <ClickableImage
            image={{
              name: 'Avatar',
              path: allInfo.profilePicture || avatarImg
            }}
            sx={styles.photo}
          />
          <Typography sx={styles.authorName} variant='h6'>
            {allInfo.authorName}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.content}>
        <Typography sx={styles.title} variant='body2'>
          {allInfo.offerTitle}
        </Typography>

        <LanguagesListWithIcon languages={allInfo.languages} />

        <Box sx={styles.chipsContainer}>
          <SubjectLevelChips
            proficiencyLevel={allInfo.profficiencyLevel}
            subject={allInfo.subject}
          />
        </Box>

        <Box sx={styles.priceAndRatingRow}>
          <Box sx={styles.priceContainer}>
            <Typography sx={styles.price} variant='h6'>
              {`${allInfo.price} ${t('common.uah')}`}
            </Typography>
            <Typography sx={styles.perHour} variant='overline'>
              /{t('common.hour')}
            </Typography>
          </Box>
          <Box sx={styles.ratingSection}>
            <AppRatingMobile
              reviewsCount={allInfo.reviewsQuantity}
              value={allInfo.totalRating}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.buttonGroup}>
        <AppButton variant='contained'>
          {t('common.labels.viewDetails')}
        </AppButton>
        <AppButton variant='tonal'>{t('common.labels.sendMessage')}</AppButton>
      </Box>
    </AppCard>
  )
}

export default OfferCardMobile
