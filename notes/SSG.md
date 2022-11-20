# Changing of SSR for SSG (Server Static Genaration)

./src/pages.index.tsx
```ts
// Before changes
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })



  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100 ,

    }
  })

  return {
    props: {
      products
    }
  }
}

```

```ts
// After changes
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })



  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100 ,

    }
  })

  return {
    props: {
      products
    }
  }
}

```

**OBSERVATIONS**

**1**
In development, the next treat the StaticServerProps exactly like the ServerSideProps
THEN, no create cache

For visualize like the project in production
*npm run build* after compilation *npm run start*

**2**
When utilizing <getStaticProps>, dont have acess for the context <req, res>

Then, Inside of getStaticProps, dont have acess for infos of user logged, cookies, etc

## Refreshing the page automatically

The return receive a other prop called <revalidate>, a number in seconds for the page refresh aumatically when a person log in site

```ts
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })



  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100 ,

    }
  })

  return {
    props: {
      products
    },
    revalidate: 10,
  }
  // the site will be updated after 10 seconds
}

```
