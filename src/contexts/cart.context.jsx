import { useReducer } from 'react';
import { createContext} from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
// import { createAction } from '../utils/reducer/reducer.utils';
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  subtractItemFromCart: () => {},
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};
//reducers should never contain business logic, only the thing that needs to change
const cartReducer = (state, action) => {
  const { type, payload } = action;
  const {SET_CART_ITEMS, TOGGLE_CART_OPEN} = CART_ACTION_TYPES;

  switch(type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const {SET_CART_ITEMS, TOGGLE_CART_OPEN} = CART_ACTION_TYPES;
  const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    
    const newCartCount = newCartItems.reduce((total, cartItem) => 
    total + cartItem.quantity, 0);
  
    const newCartTotal = newCartItems.reduce((total, cartItem) => 
    total + (cartItem.price * cartItem.quantity), 0);

    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    }
    dispatch(
      createAction(
        SET_CART_ITEMS, payload
      )
    );
  }
  const setIsCartOpen = (bool) =>{

    dispatch(
      createAction(
        TOGGLE_CART_OPEN, bool
      )
    );
  }
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
}
  const subtractItemFromCart = (cartItemToSubtract) => {
    const newCartItems = subtractCartItem(cartItems, cartItemToSubtract);
    updateCartItemsReducer(newCartItems);
}
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
}
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, subtractItemFromCart, removeItemFromCart, cartTotal };

  return ( <CartContext.Provider value={value}>{children}</CartContext.Provider>);
};