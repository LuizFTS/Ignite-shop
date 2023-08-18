import { stripe } from "@/assets/lib/stripe";
import { CartContext } from "@/contexts/CartContext";
import { ImageContainer, ProductsImages, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Stripe from "stripe";

interface SuccessProps {
    customerName: string,
    products: {
        name: string,
        image: string
    }[]
}

export default function Success({ customerName, products }: SuccessProps){
    const { hideOrShowCartAtHeader, showCartAtTheHeader } = useContext(CartContext)

    useEffect(() => {
        if(showCartAtTheHeader){
            hideOrShowCartAtHeader()
        }
    }, [showCartAtTheHeader, hideOrShowCartAtHeader])

    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>

                <ProductsImages css={{width: (products.length * 88) + 52}}>
                    {products.map((image, index) => {
                        return (
                            <ImageContainer key={index} css={index > 0 ? {marginLeft: 88 * index} : {}}>
                                <Image src={image.image} width={120} height={110} alt="" />
                            </ImageContainer>
                        )
                        
                    })}
                </ProductsImages>

                <h1>Compra efetuada!</h1>
                
                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {products.length} {products.length > 1 ? 'camisetas' : 'camiseta'} já está a caminho da sua casa. 
                </p>
                <Link href='/'>
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    if(!query.session_id){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionID = String(query.session_id)


    const session = await stripe.checkout.sessions.retrieve(sessionID, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    if(!session.line_items) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const customerName = session.customer_details?.name;

    const products = session.line_items.data.map(item => item.price?.product as Stripe.Product)

    const productDataFiltered = products.map(item =>{
        return {
            name: item.name,
            image: item.images[0]
        }
    }) 



    return {
        props: {
            customerName,
            products: productDataFiltered
        }
    }
}