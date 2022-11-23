import { createContext, ReactNode, useState } from 'react'

interface ProductInCart {
  id: string
  name: string
  imageUrl: string
  price: string
  defaultPriceId: string
  description: string
  value: number
}

interface ShopContextType {
  cartOpen: boolean
  itemsOnCart: ProductInCart[]
  toggleCartState: () => void
  addNewItemOnCart: (product: ProductInCart) => void
  removeItemCart: (id: string) => void
}

export const ShopContext = createContext({} as ShopContextType)

interface ShopContextProviderProps {
  children: ReactNode
}

export function ShopContextProvider({ children }: ShopContextProviderProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [itemsOnCart, setItemsOnCart] = useState<ProductInCart[]>([])

  function toggleCartState() {
    setCartOpen(!cartOpen)
  }

  function addNewItemOnCart(product: ProductInCart) {
    if (itemsOnCart.length >= 5) {
      alert('O valor maximo de produtos é 5!')
      return
    }

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      defaultPriceId: product.defaultPriceId,
      description: product.description,
      value: product.value,
    }

    setItemsOnCart((state) => [newItem, ...state])
  }

  function removeItemCart(id: string) {
    const cartWithoutOne = itemsOnCart.filter((item) => {
      return item.id !== id
    })
    setItemsOnCart(cartWithoutOne)
  }

  return (
    <ShopContext.Provider
      value={{
        cartOpen,
        toggleCartState,
        addNewItemOnCart,
        itemsOnCart,
        removeItemCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
