import { styled } from '..'

export const CartContainer = styled('div', {
  position: 'absolute',
  right: 0,
  backgroundColor: '$gray800',
  width: '32rem',
  height: '100vh',
  zIndex: 100,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1.5rem 1.5rem 3rem 3rem',

  header: {
    width: '100%',
    textAlign: 'right',

    svg: {
      cursor: 'pointer',
    },
  },

  h3: {
    color: '$gray100',
    fontWeight: 'bold',
    lineHeight: 1.6,
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
})

export const Items = styled('main', {
  display: 'flex',
  marginBottom: '1.5rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
  },

  h4: {
    color: '$gray300',
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: '1.125rem',
  },

  span: {
    color: '$gray100',
    fontWeight: 'bold',
    lineHeight: 1.6,
    fontSize: '1.125rem',
  },

  strong: {
    color: '$green500',
    fontWeight: 'bold',
    lineHeight: 1.6,
    fontSize: '1rem',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginRight: '1.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const FooterContainer = styled('footer', {
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },

  span: {
    color: '$gray100',
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: '1rem',
  },

  strong: {
    color: '$gray100',
    fontWeight: 'bold',
    lineHeight: 1.6,
    fontSize: '1.5rem',
  },

  button: {
    marginTop: '2.5rem',
    width: '100%',
    padding: '1.25rem',
    backgroundColor: '$green500',
    color: '$gray100',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    lineHeight: 1.6,
    borderRadius: 8,

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
