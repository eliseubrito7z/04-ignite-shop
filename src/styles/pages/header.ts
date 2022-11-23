import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  // justifyContent: 'center',
  // marginTop: '2.5rem',
  // minHeight: '100vh',

  'button:click': {
    transform: 'translateX(-30%)',
    transition: 'all 0.2s ease-in-out',
  },

  // 'div:active': {
  //   transform: 'translateX(110%)',
  //   transition: 'all 0.2s ease-in-out',
  // },
})

export const HeaderContainer = styled('header', {
  // border: '1px solid red',
  padding: '2rem 0',
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  maxWidth: 'calc(100vw - ((100vw - 1320px) / 2))',
  justifyContent: 'space-between',

  button: {
    backgroundColor: '$gray800',
    padding: '0.75rem',
    borderRadius: 6,
  },

  svg: {
    color: '$gray200',
    cursor: 'pointer',
  },
})

export const CartContainer = styled('div', {
  position: 'absolute',
  right: 0,
  backgroundColor: '$gray800',
  width: '32rem',
  height: '100vh',
  zIndex: 100,
  // opacity: 1,

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
