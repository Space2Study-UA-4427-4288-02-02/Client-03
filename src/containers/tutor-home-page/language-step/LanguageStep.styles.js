import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: { sm: 'flex' },
    justifyContent: 'space-between',
    alignItems: { xs: 'stretch', sm: 'flex-start' },
    gap: { lg: '122px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    ...fadeAnimation
  },
  imgContainer: {
    display: { xs: 'flex', sm: 'none', md: 'flex' },
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
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  title: {
    mb: '16px',
    fontSize: { xs: '14px', sm: '16px' },
    lineHeight: { xs: '20px', sm: '24px' },
    fontWeight: 400,
    letterSpacing: 0.5
  }
}
