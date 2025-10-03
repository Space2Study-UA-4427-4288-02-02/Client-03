const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    width: '100%',
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 3,
    overflow: 'hidden'
  },
  imageBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 4
  },
  image: {
    width: '100%',
    maxWidth: 400,
    height: 'auto'
  },
  formContainer: {
    flex: 1,
    p: { xs: 2, md: 5 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    typography: 'h4',
    fontWeight: 600,
    mb: 2
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: '100%',
    color: 'primary.main'
  },
  nameFields: {
    display: 'flex',
    gap: 2
  },
  dividerBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    my: 1
  },
  linkText: {
    color: 'basic.black',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}

export default styles
