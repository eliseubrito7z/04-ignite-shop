import Image from 'next/image'
import {
  CartContainer,
  FooterContainer,
  ImageContainer,
  Items,
} from '../styles/pages/cart'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import Stripe from 'stripe'

export function Cart() {
  const { toggleCartState, itemsOnCart } = useContext(ShopContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const itemsPrices = itemsOnCart.map((item) => {
    const total = item.value
    return total
  })

  const totalOrderPrice = itemsPrices.reduce(function (total, itemValue) {
    total += itemValue
    return total
  }, 0)

  console.log(itemsPrices)

  function handleToggleCartState() {
    toggleCartState()
  }

  const producto = String(itemsOnCart.map((item) => item.defaultPriceId))

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: producto,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)
      console.log(err)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <CartContainer>
      <section>
        <header onClick={handleToggleCartState}>
          <X size={24} weight="bold" />
        </header>
        <h3>Sacola de compras</h3>
        {itemsOnCart.map((item) => {
          return (
            <Items key={item.id}>
              <ImageContainer>
                <Image src={item.imageUrl} alt="" width={95} height={95} />
              </ImageContainer>
              <div>
                <h4>{item.name}</h4>
                <span>{item.price}</span>
                <strong>Remover</strong>
              </div>
            </Items>
          )
        })}
      </section>
      <FooterContainer>
        <div>
          <span>Quantidade</span>
          <span>{itemsOnCart.length} items</span>
        </div>
        <div>
          <strong>Valor total</strong>
          <strong>R$ {totalOrderPrice.toFixed(2)}</strong>
        </div>
        <button onClick={handleBuyProduct}>Finalizar Compra</button>
      </FooterContainer>
    </CartContainer>
  )
}
