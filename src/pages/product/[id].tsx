import { stripe } from '@/assets/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import axios from 'axios'
import { useContext, useState } from 'react'
import Head from 'next/head'
import DefaultBtn from '@/component/DefaultBtn'
import { CartContext } from '@/contexts/CartContext'
import { v4 as uuidv4 } from 'uuid';

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
      }
}

export default function Product({product}: ProductProps){
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { AddToCart, OpenAndCloseCart } = useContext(CartContext)

    function handleBuyProduct(){

        const newProduct = {
            ...product,
            cartId: uuidv4()
        }

        AddToCart(newProduct)
        OpenAndCloseCart()
    }

    const headTitle = product.name + " | Ignite Shop"

    return (
        <>
            <Head>
                <title>{headTitle}</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt='' />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <DefaultBtn disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                        Colocar na sacola
                    </DefaultBtn>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}   

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: {id: 'prod_OOik1xcrGXBHar'}},
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
    const productId = params ? params.id : ''

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price


    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100) : 0,
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1, // 1 hours
    }
}