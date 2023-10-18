import CATEGORIES_ACTION_TYPES from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: []
};

export const categoriesReducer = 
    (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    const {SET_CATEGORIES} = CATEGORIES_ACTION_TYPES;
    switch(type) {
        case SET_CATEGORIES:
            return {...state, categories: payload};
        default:
            return state;
    }
};
