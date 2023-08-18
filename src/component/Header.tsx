import { Header as HeaderContainer, CartContainer } from '@/styles/components/Header'
import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import cartIcon from '@/assets/cart.svg'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartContext'
import Link from 'next/link'

export default function Header(){

    const { cartProducts, OpenAndCloseCart, showCartAtTheHeader } = useContext(CartContext)

    const totalItemsAtTheCart = cartProducts && cartProducts.length > 0 ? cartProducts.length : 0

    return (
        <HeaderContainer css={!showCartAtTheHeader ? {justifyContent: "center"} : {}}>
            <Link href='/'>
                <Image src={logoImg.src} width={129.74} height={52} alt='' />
            </Link>
            {showCartAtTheHeader && (
            <CartContainer onClick={OpenAndCloseCart}>
                <Image src={cartIcon} alt=''/>

                {totalItemsAtTheCart > 0 && (
                <span>
                    {totalItemsAtTheCart}
                </span>
                )}
            </CartContainer>
            )}
        </HeaderContainer>
    )
}