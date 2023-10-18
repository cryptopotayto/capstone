import CART_ACTION_TYPES from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    const { SET_CART_ITEMS, TOGGLE_CART_OPEN } = CART_ACTION_TYPES;
    switch(type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            };
        case TOGGLE_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default: return state;
    }
};