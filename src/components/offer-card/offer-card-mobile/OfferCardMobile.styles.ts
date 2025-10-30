export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    gap: '16px',
    marginBottom: '20px',
    position: 'relative'
  },

  header: {
    display: 'flex',
    justifyContent: 'center'
  },

  photo: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover'
  },

  bookmarkButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '8px'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  authorsInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },

  authorName: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '20px',
    letterSpacing: '0.15px'
  },

  title: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#263238'
  },

  chipsContainer: {
    marginTop: '8px'
  },

  priceAndRatingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px'
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'column'
  },

  price: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    display: 'inline'
  },

  perHour: {
    color: 'text.secondary'
  },

  ratingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px'
  }
}
