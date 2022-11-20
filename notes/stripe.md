# Configs for use Stripe API

## Keys

### Public Keys

Used for create chekout and others specific cases

### Secret Keys

Used for acess the products and others things of stripe

## Optimization Images in Home

The next need specification of the domain this will happen

./next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

// new
  images: {
    domains: [
      'files.stripe.com'
    ]
  }
}

module.exports = nextConfig

```

If the image its taking time to render, the component <Image> have a prop for it
*Exists a library for it too BLURHASH*
