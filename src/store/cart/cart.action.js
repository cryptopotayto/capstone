import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.types";
const { SET_CART_ITEMS, TOGGLE_CART_OPEN, SET_CART_COUNT, SET_CART_TOTAL } = CART_ACTION_TYPES;

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
  

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(SET_CART_ITEMS, newCartItems);
};
export const subtractItemFromCart = (cartItems, cartItemToSubtract) => {
    const newCartItems = subtractCartItem(cartItems, cartItemToSubtract);
    return createAction(SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(SET_CART_ITEMS, newCartItems);
};


export const setIsCartOpen = (bool) => createAction(
    TOGGLE_CART_OPEN, bool
);

