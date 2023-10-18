import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";


export const rootReducer = combineReducers({
    //object where keys and values are name of reducer slice and acutal reducer function
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});