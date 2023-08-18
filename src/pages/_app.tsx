import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import cartIcon from '@/assets/cart.svg'
import { Container } from '@/styles/pages/app';
import Image from 'next/image';
import CartSummary from '@/component/CartSummary';
import { useState } from 'react';
import { CartContext, CartContextProvider } from '@/contexts/CartContext';
import Header from '@/component/Header';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
        <Header/>
        <CartSummary />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
  }
