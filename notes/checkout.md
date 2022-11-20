# Creating a Checkout Session

## Initializing

- The checkout server dont can be created in Client-Side, her need be created in
Server-Side because he need the SECRETE_KEY of Production Server

## Creating a API Route

### Create CheckoutSession

For create a checkout session, use the Stripe API like await and change the
function for async function.

Create a const, this const receive of stripe the Creator Checkout Session

```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const checkoutSession = await stripe.checkout.sessions.create()

}
```

*Configurations*
inside of create have a object of configuration

The object of configuration receive compulsorily the following props:

mode, cancel_url, success_url, line_items

```ts
  const priceId = '';

  // NEXT_URL are in .env.local
  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
  })
```

## Seinding the priceId

*./src/pages/product/[id].tsx*

The getStaticProps are loading of stripe the ['default_price']

in return of getStaticProps will return the default price

```ts
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {

  const productId= params?.id;

  const product = await stripe.products.retrieve(String(productId), {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(price.unit_amount) / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

```

### Obtaining the PriceId of a dynamic form

- in functions using externals api's, its convenient use the **TRY CATCH**

- In the catch, the advisable is conect with a tool of observalidate like Datadog
- Inside TRY, will be used the axios for conect with API of next

*The baseURL of DataBase and Front-end*

- In TRY, make a await axios method POST for the route of API
- Send in path the address of route for checkout
- after the path, send the params

*In API config*
- the response.data return <checkoutUrl>

### For redirect the user for Stripe Checkout

- If the API is mine, use the useNavigation()
- If is external, use the window.location.href

isCreatingCheckoutSession is a state for disable the button if the POST request
is successful

```ts
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct(){
    try {

      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl

    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }
```

## Capturing the priceId in API configuration

*./src/pages/api/checkout.ts*

- Inside the function, do a desestruturation of req.body
- req.body is the body of requisition
- in the object, we need the priceId

## Prevent Erros

- If the route is called without the priceId, return a error 400
- if the route is called with other method, return a error 405

**FINALIZED**

```ts
  // ./src/pages/product/[id].tsx
  // inside function
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct(){
    try {

      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl

    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  // outside
    export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {

    const productId= params?.id;

    const product = await stripe.products.retrieve(String(productId), {
      expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(price.unit_amount) / 100),
          description: product.description,
          defaultPriceId: price.id,
        }
      },
      revalidate: 60 * 60 * 1, // 1 hour
    }
  }

```

```ts
  // in API config
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { priceId } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}

```
