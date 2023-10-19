import { createSlice } from '@reduxjs/toolkit';


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const subtractCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
      if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem =>
        cartItem.id !== cartItemToRemove.id);
      };
    
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
  
  };

  const removeCartItem = (cartItems, cartItemToRemove) => {
        return cartItems.filter(cartItem =>
        cartItem.id !== cartItemToRemove.id);
      };
  
export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        subtractItemFromCart(state, action) {
            state.cartItems = subtractCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        }
    },
});

export const { addItemToCart, subtractItemFromCart, removeItemFromCart, setIsCartOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;



