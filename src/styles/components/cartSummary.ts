import { styled } from "..";


export const Overlay = styled('div', {
    position: 'fixed',
    top: 0,
    left: 0,
    
    height: '100vh',
    width: '100%',
    zIndex: 5,
    opacity: 0,
    transition: '0.2s',
    display: 'none',
    
    '&.active': {
        display: 'block',
        zIndex: 5,
        opacity: 1
    }
})

export const CloseIconContainer = styled('div', {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    cursor: 'pointer',

    height: 24,
    width: 24
})

export const CartSummaryContainer = styled('div', {
    position: 'fixed',
    top: 0,
    right: -480,
    width: 480,
    height: '100vh',
    backgroundColor: '$gray800',
    boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.8)',
    transition: '0.2s',
    opacity: 0,
    zIndex: 100,

    '&.active': {
        right: 0,
        opacity: 1,
    }
})

export const CartSummaryContent = styled('div', {
    padding: '3rem',

    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    
    h1: {
        fontSize: '$lg',
    }
})

export const Product = styled('div', {
    display: "flex",
    gap: '1.25rem',
    marginTop: '2rem',

})
export const ProductsContainer = styled('div', {
    display: "flex",
    flexDirection: 'column',
    gap: '1.5rem',
    flex: '1',

})

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    width: 101.94,
    height: 93,
    borderRadius: 8
})

export const ProductContentContainer = styled('div', {
    display: 'block',
    lineHeight: 1.6,

    h2: {
        fontSize: '$md',
        fontWeight: 400,
    },

    p: {
        fontSize: '$md',
        fontWeight: 'bold',
        marginTop: 2,
    },

    button: {
        marginTop: '0.5rem',

        backgroundColor: 'transparent',
        color: '$green500',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: 0,
        outline: 0,
        cursor: 'pointer',

        '&:hover': {
            color: '$green300'
        }
    }

})


export const TotalsContainer = styled('div', {
    marginBottom: '0.5rem',
})

export const QuantityTotal = styled('div',{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
        fontSize: '1rem',
    },

    p: {
        fontSize: '$md',
    }
})



export const ValueTotal = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',

    span: {
        fontSize: '$md',
    },

    p: {
        fontSize: '$xl',
    }
})