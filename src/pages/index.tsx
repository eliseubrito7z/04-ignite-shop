import Image from 'next/image'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Cart } from '../components/Cart'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    value: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addNewItemOnCart } = useContext(ShopContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          function handleAddNewItemOnCart() {
            addNewItemOnCart(product)
          }

          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={''}
                />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <br />
                  <span>{product.price}</span>
                </div>
                <i className="handbag" onClick={handleAddNewItemOnCart}>
                  <Handbag size={32} weight="bold" />
                </i>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(price.unit_amount) / 100),
      defaultPriceId: price.id,
      value: Number(price.unit_amount) / 100,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
