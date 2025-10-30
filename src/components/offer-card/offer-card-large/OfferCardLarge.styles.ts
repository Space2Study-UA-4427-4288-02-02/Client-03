export const styles = {
  card: {
    padding: '31px 20px 31px 20px',
    borderRadius: '6px',
    display: 'flex',
    gap: '50px',
    marginBottom: '15px'
  },

  photo: {
    borderRadius: '100%'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
    width: '100%'
  },

  title: {
    fontWeight: { xs: 400, md: 600 },
    fontSize: { xs: '16px', md: '18px' },
    lineHeight: '24px',
    color: { xs: '#263238', md: '#455a64' },
    letterSpacing: { xs: '0.5px', md: '0.15px' }
  },

  description: {
    color: '#546e7a',
    letterSpacing: '0.25%',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  authorSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  authorName: {
    fontWeight: 500,
    fontSize: { xs: '20px', md: '16px' },
    lineHeight: { xs: '28px', md: '24px' },
    letterSpacing: { xs: '0.15px', md: '0.5px' },
    color: { xs: '#263238', md: '#607D8B' }
  },

  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  rating: {
    backgroundColor: '#ECEFF1'
  },

  reviews: {
    color: '#607D8B'
  },

  languagesList: {
    marginTop: 'auto'
  },

  priceAndButtonsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },

  priceSection: {
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between'
  },

  price: {
    color: '#263238'
  },

  perHour: {
    color: '#263238'
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '200px'
  }
}
