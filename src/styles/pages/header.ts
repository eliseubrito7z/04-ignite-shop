import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const HeaderContainer = styled('header', {
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
