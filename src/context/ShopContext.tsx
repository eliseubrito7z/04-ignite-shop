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
    console.log('NEW ITEM', newItem)
  }
  console.log('LIST_ITEMS', itemsOnCart)

  return (
    <ShopContext.Provider
      value={{ cartOpen, toggleCartState, addNewItemOnCart, itemsOnCart }}
    >
      {children}
    </ShopContext.Provider>
  )
}
