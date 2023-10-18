import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'categories'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//whenever you dispatch an action, it hits middleware before reducerrs
const middleWares = [process.env.NODE_ENV === 'development' && logger,
sagaMiddleware,
].filter(Boolean);
//middlewares enhance the store
const composedEnhaners = compose(applyMiddleware(...middleWares));

//takes three args, *rootreducer*, additional state values, logger (see flow of state, pre, action, post)
export const store = createStore(persistedReducer, undefined, composedEnhaners);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);