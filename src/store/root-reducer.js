import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    //object where keys and values are name of reducer slice and acutal reducer function
    user: userReducer,

});