import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ImagesSection,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  product: [
    {
      id: string
      images: string[]
    },
  ]
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        {/* no index page in google */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImagesSection>
          {product.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image
                  src={product.images[0]}
                  width={120}
                  height={110}
                  alt=""
                />
              </ImageContainer>
            )
          })}
        </ImagesSection>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {product.length}{' '}
          camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })
  console.log(session.line_items?.data) // all data in console of backend

  const customerName = session.customer_details?.name
  const product = session.line_items?.data.map((product) => {
    return product.price?.product as Stripe.Product
  })

  return {
    props: {
      customerName,
      product,
    },
  }
}
