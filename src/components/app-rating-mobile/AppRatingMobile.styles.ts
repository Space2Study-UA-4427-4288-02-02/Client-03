import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    columnGap: '4px',
    borderRadius: '5px'
  },
  starMobile: {
    color: 'basic.yellow',
    height: '18px'
  },
  number: { display: 'flex', alignItems: 'center' },
  rating: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 400,
    letterSpacing: '0.5px '
  },
  reviews: {
    typography: TypographyVariantEnum.Overline
  }
}
