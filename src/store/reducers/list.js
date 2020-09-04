import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    roleList: [],
    error: null,
    loading: false,
};

const fetchListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const fetchListSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        roleList: action.roleList
    });
};

const fetchListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_LIST_START:
            return fetchListStart(state, action);
        case actionTypes.FETCH_LIST_SUCCESS:
            return fetchListSuccess(state, action);
        case actionTypes.FETCH_LIST_FAIL:
            return fetchListFail(state, action);
        default:
            return state;
    }
};

export default reducer;
