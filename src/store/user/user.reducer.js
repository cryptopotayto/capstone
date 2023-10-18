import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
    currentUser: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    const {SET_CURRENT_USER} = USER_ACTION_TYPES;
    switch(type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: payload, };
        default:
            return state;
    }
};