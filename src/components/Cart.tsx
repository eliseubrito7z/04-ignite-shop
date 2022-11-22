import Image from 'next/image'
import {
  CartContainer,
  EmptyCart,
  FooterContainer,
  ImageContainer,
  Items,
} from '../styles/pages/cart'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import Stripe from 'stripe'
import Link from 'next/link'

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

  const product = itemsOnCart.map((item) => item.defaultPriceId)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        itemsId: product,
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
        {itemsOnCart.length > 0 ? (
          itemsOnCart.map((item) => {
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
          })
        ) : (
          <EmptyCart>
            <h6>Seu carrinho de compras está vazio!</h6>
            <Link href={'/'} prefetch={false} onClick={handleToggleCartState}>
              <button>Ir as compras</button>
            </Link>
          </EmptyCart>
        )}
      </section>
      {itemsOnCart.length > 0 && (
        <FooterContainer>
          <div>
            <span>Quantidade</span>
            <span>{itemsOnCart.length} items</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong>R$ {totalOrderPrice.toFixed(2)}</strong>
          </div>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Finalizar Compra
          </button>
        </FooterContainer>
      )}
    </CartContainer>
  )
}
