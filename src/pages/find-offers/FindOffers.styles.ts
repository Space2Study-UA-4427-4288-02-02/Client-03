export const styles = {
  searchToolbar: {
    borderRadius: '70px'
  },

  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },

  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  searchDropdown: {
    width: '100%',
    maxWidth: { sm: '160px', md: '220px' },
    mr: '30px',
    mb: { xs: '20px', sm: '0' },
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  }
}
