import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    data: null
};

const updateConfirmation = (state, action) => {
    return updateObject(state, {
        data: action.data
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CONFIRMATION:
            return updateConfirmation(state, action);
        default:
            return state;
    }
};

export default reducer;
