import { ReactNode, createContext, useEffect, useState } from "react";


interface CartContextProviderProps {
    children: ReactNode
}

interface CartProduct {
        defaultPriceId: string,
        description: string,
        id: string,
        imageUrl: string,
        name: string,
        price: string,
        cartId: string
}

interface CartContextType {
    cartProducts: CartProduct[],
    AddToCart: (product: CartProduct) => void,
    removeFromCart: (productId: string) => void,
    resetCart: () => void,

    OpenAndCloseCart: () => void
    isCartOpen: boolean
    hideOrShowCartAtHeader: () => void
    showCartAtTheHeader: boolean
}

export const CartContext = createContext({} as CartContextType)

export const CartContextProvider = ({children}: CartContextProviderProps) => {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    const [showCartAtTheHeader, setShowCartAtTheHeader] = useState<boolean>(true)

    function AddToCart(product: CartProduct){


        
        setCartProducts(prevState => {

            const item = [...prevState, product]

            localStorage.setItem('@ignite-shop:cart-items-1.0.0', JSON.stringify(item))
            return item
        })
        
    }

    function removeFromCart(productId: string) {

        const filteredProducts = cartProducts.filter(item => item.cartId !== productId)

        setCartProducts(filteredProducts)
        localStorage.setItem('@ignite-shop:cart-items-1.0.0', JSON.stringify(filteredProducts))
        
    }

    function resetCart(){
        setCartProducts([])
        localStorage.removeItem('@ignite-shop:cart-items-1.0.0')
    }

    function hideOrShowCartAtHeader(){
        if(showCartAtTheHeader){
            setShowCartAtTheHeader(false)
        } else {
            setShowCartAtTheHeader(true)
        }

    }

    // Cart Icon

    function OpenAndCloseCart (){
        if(isCartOpen){
            setIsCartOpen(false)
        } else {
            setIsCartOpen(true)
        }
      }
    


    useEffect(() => {
        const local = localStorage.getItem('@ignite-shop:cart-items-1.0.0')
    
        if (local) {
          const recoveredCartItems = JSON.parse(local) as CartProduct[]
          setCartProducts(recoveredCartItems)
        }
      }, [])

    return (
        <CartContext.Provider value={{ cartProducts, AddToCart, removeFromCart, resetCart, OpenAndCloseCart, isCartOpen, showCartAtTheHeader, hideOrShowCartAtHeader }}>
            {children}
        </CartContext.Provider>
    )
}