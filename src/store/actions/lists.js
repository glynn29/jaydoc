import * as actionTypes from './actionTypes';
import {firestore} from "../../firebase";

export const fetchListStart = () => {
    return{
        type: actionTypes.FETCH_LIST_START
    };
};

export const fetchRoleSuccess = (list) => {
    return{
        type: actionTypes.FETCH_ROLE_SUCCESS,
        roleList: list
    };
};

export const fetchPositionSuccess = (list) => {
    return{
        type: actionTypes.FETCH_POSITION_SUCCESS,
        positionList: list
    };
};

export const fetchListFail = (error) => {
    return{
        type: actionTypes.FETCH_LIST_FAIL,
        error: error
    };
};

export const fetchRoleList = () => {
    return dispatch =>{
        dispatch(fetchListStart());
        let list = [];
        firestore.collection('roles').doc("roles").get()
            .then((doc) => {
                list = doc.data().roles;
            })
            .then(()=>{
                console.log("dispatch success");
                dispatch(fetchRoleSuccess(list))}
            )
            .catch( error => dispatch(fetchListFail(error)));

    }
};

export const fetchPositionList = () => {
    return dispatch =>{
        dispatch(fetchListStart());
        let list = [];
        firestore.collection('positions').doc("positions").get()
            .then((doc) => {
                list = doc.data().positions;
            })
            .then(()=>{
                console.log("dispatch success");
                dispatch(fetchPositionSuccess(list))}
            )
            .catch( error => dispatch(fetchListFail(error)));

    }
};
