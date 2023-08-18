import { CartSummaryContainer, CartSummaryContent, CloseIconContainer, ImageContainer, Overlay, Product, ProductContentContainer, ProductsContainer, QuantityTotal, TotalsContainer, ValueTotal } from "@/styles/components/cartSummary";
import Image from "next/image";
import DefaultBtn from "./DefaultBtn";

import CloseIcon from '@/assets/close.svg'
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import axios from "axios";

export default function CartSummary () {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { cartProducts, removeFromCart, resetCart, OpenAndCloseCart, isCartOpen } = useContext(CartContext)

    
    const totalItems = cartProducts.length
    const totalValue = cartProducts.reduce((acc, product) => {
        const { price } = product

        // Remove R$
        const semSimbolos = price.replace("R$", "").replace(",", ".")
        const number = parseFloat(semSimbolos)

        acc.total = acc.total + number

        return acc
    }, {total: 0}).total


    function handleRemoveItemFromCart (productId: string){
        removeFromCart(productId)
    }

    async function handleBuyProducts(){
        try {
            setIsCreatingCheckoutSession(true)
            
            const response = await axios.post('/api/checkout', {
                products: cartProducts.map(item => {
                    return {
                        price: item.defaultPriceId,
                        quantity: 1
                    }
                })
            })

            const { checkoutUrl } = response.data

            resetCart()
            window.location.href = checkoutUrl
        } catch (error) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout!')
        }

    }

    return (
        <>
        <Overlay className={isCartOpen ? 'active' : ''} onClick={OpenAndCloseCart}/>
        <CartSummaryContainer className={isCartOpen ? 'active' : ''}>
            <CloseIconContainer onClick={OpenAndCloseCart}>
                <Image src={CloseIcon} width={24} height={24} alt="" />
            </CloseIconContainer>
            <CartSummaryContent>
                <h1>Sacola de compras</h1>

                <ProductsContainer>
                    {cartProducts.map(product => {
                        return (
                            <Product key={product.cartId}>
                                <ImageContainer>
                                    <Image 
                                        src={product.imageUrl} 
                                        width={94.79} 
                                        height={94.79} 
                                        alt=""
                                    />
                                </ImageContainer>
                                <ProductContentContainer>
                                    <h2>{product.name}</h2>
                                    <p>{product.price}</p>
                                    <button onClick={() => handleRemoveItemFromCart(product.cartId)}>Remover</button>
                                </ProductContentContainer>
                            </Product>
                        )
                    })}
                </ProductsContainer>

                <TotalsContainer>
                    <QuantityTotal>
                        <span>Quantidade</span>
                        <p>{totalItems} {totalItems > 1 ? 'itens' : 'item'}</p>
                    </QuantityTotal>
                    <ValueTotal>
                        <span>Valor total</span>
                        <p>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(totalValue)}</p>
                    </ValueTotal>
                </TotalsContainer>

                <DefaultBtn disabled={isCreatingCheckoutSession} onClick={handleBuyProducts}>
                    Finalizar compra
                </DefaultBtn>

            </CartSummaryContent>
        </CartSummaryContainer>
    </>

    )
}