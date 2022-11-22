import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, HeaderContainer } from '../styles/pages/header'
import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { useContext, useState } from 'react'
import { Cart } from '../components/Cart'
import { ShopContext } from '../context/ShopContext'

globalStyles()

export function Header() {
  const { cartOpen, toggleCartState } = useContext(ShopContext)

  function handleToggleCartState() {
    toggleCartState()
  }

  return (
    <Container>
      <HeaderContainer>
        <Image src={logoImg.src} alt="" width={130} height={52} />
        <button onClick={handleToggleCartState} className="handbag">
          <Handbag size={24} weight="bold" />
        </button>
      </HeaderContainer>
      {cartOpen === true && <Cart />}
    </Container>
  )
}
