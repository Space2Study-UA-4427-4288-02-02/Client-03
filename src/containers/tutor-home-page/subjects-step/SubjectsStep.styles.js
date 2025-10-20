import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: { xs: 'none', sm: 'none', md: 'flex' },
    flex: { sm: 1 },
    maxWidth: { xs: '100%', sm: '432px' },
    aspectRatio: { xs: '4/3', sm: 'auto' },
    mb: { xs: '20px', sm: '0' }
  },
  img: {
    width: '100%',
    objectFit: { xs: 'contain', sm: 'unset' },
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  title: {
    mb: '16px',
    fontSize: { xs: '14px', sm: '16px' },
    lineHeight: { xs: '20px', sm: '24px' },
    fontWeight: 400,
    letterSpacing: 0.5
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
