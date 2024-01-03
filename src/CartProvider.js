// CartProvider.js
import React, { createContext, useContext, useReducer } from "react";
import cartReducer from './CartReducer';
import { productData } from "./Data";

const CartContext = createContext();

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const CartProvider = ({ children }) => {
    const initialState = {
        cart: productData?.[0]?.products.map(product => ({ ...product, quantity: 1 }))
    };
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Action to update quantity
    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    return (
        <CartContext.Provider value={{ state, dispatch, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, useCart };
