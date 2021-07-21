import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(
        localStorage.userToken ? JSON.parse(localStorage.getItem("userToken")).cart : []
    );

    useEffect(() => {
        if (localStorage.userToken) {
            const currentCart = JSON.parse(localStorage.getItem('userToken'));
            currentCart.cart = cart;
            localStorage.setItem('userToken', JSON.stringify(currentCart))
        }
    }, [cart]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}
