import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    margin: "0 auto",
    height: 656,


    h1: {
        marginTop: '3rem',
        fontSize: '$2xl',
        color: '$gray100',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: "center",
        marginTop: "1.5rem",
        lineHeight: 1.4
    },

    a: {
        display: 'block',
        marginTop: '4rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',
        

        '&:hover': {
            color: '$green300'
        }
    }
})

export const ProductsImages = styled('div', {
    position: 'relative',
    display: "flex",
    marginTop: '4.5rem',
    width: 228,
    height: 140,
    justifyContent: 'start',
})

export const ImageContainer = styled('div', {
    width: "100%",
    maxWidth: 140,
    height: 140,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '50%',

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: 'absolute',
    top: 0,
    zIndex: 8,
    boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)',

    img: {
        objectFit: 'cover'
    }, 
})