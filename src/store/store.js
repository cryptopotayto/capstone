import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//whenever you dispatch an action, it hits middleware before reducerrs
const middleWares = [logger];
//middlewares enhance the store
const composedEnhaners = compose(applyMiddleware(...middleWares));

//takes three args, *rootreducer*, additional state values, logger (see flow of state, pre, action, post)
export const store = createStore(rootReducer, undefined, composedEnhaners);