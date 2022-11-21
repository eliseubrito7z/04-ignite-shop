# Using the data of purchase

## Puting the Checkout Session ID in url

- in API of checkout, the successUrl, after the /success receive the session_id

```ts
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
```
## Getting the dates

- In the success page, the page receive a dynamic url, then, use the
getServerSideProps

**IF USE THE useEffect, will need a skeleton**
**STRIPE DONT ALLOW FETCH IN CLIENT-SIDE**

- The function receive the query (query is the parameter session_id in url)
- Get a session_id of inside query
- using the Stripe API, get the checkout session with retrieve, the address is
- the sessionId
- expand the line_items and the product, for get the infos 'hidden'
- get the customer name and the product

**MAKE A VALIDATION IF SESSION ID EXISTS**

- If no exists, use the redirect with destiny the home page
- the permanent is false, it will do just the session id no exists

```ts

    export const getServerSideProps: GetServerSideProps = async ({query}) => {

      if (!query.session_id) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }


      const sessionId = String(query.session_id);


      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items',  'line_items.data.price.product']
      })
      console.log(session.line_items?.data) // all data in console of backend

      const customerName = session.customer_details?.name;
      const product = session.line_items?.data[0].price?.product as Stripe.Product;

      return {
        props: {
          customerName,
          product: {
            name: product.name,
            imageUrl: product.images[0],
          }
        }
      }
    }

```

## Using the data in frontend

- Create a new interface, the interface have a customer name and product datas used
- Use the datas

```ts
  // interface
  interface SuccessProps {
    customerName: string;
    product: {
      name: string;
      imageUrl: string;
    }
  }

  // frontend
  export default function Success({customerName, product}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        {/*no index page in google*/}
        <meta name="robots" content="noindex" />
      </Head>


      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt='' />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
    </SuccessContainer>
    </>
  )
}

```
