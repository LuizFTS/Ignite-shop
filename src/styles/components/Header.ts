import { styled } from ".."

export const Header = styled('header', {
    padding: "2rem 0",
    width: '100%',
    maxWidth: 1180,
    margin: "0 auto",

    display: 'flex',
    justifyContent: 'space-between',
})

export const CartContainer = styled('div', {
    position: 'relative',
    padding: '0.75rem',

    width: 48,
    height: 48,

    borderRadius: 6,
    backgroundColor: '$gray800',
    cursor: 'pointer',

    img: {
        height: 24,
        width: 24
    },

    span: {
        position: 'absolute',
        top: -7,
        right: -7,

        backgroundColor: '$green500',
        height: 24,
        width: 24,
        borderRadius: '50%',
        border: '3px solid $gray900',

        fontSize: 14,
        fontWeight: 'bold',


        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})