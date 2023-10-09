import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    // itemCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [itemCount, setItemCount] = useState(itemCount);
    const value = {isCartOpen, setIsCartOpen};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}