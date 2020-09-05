import * as actionTypes from './actionTypes';
import {firestore} from "../../firebase";

export const fetchListStart = () => {
    return{
        type: actionTypes.FETCH_LIST_START
    };
};

export const fetchListSuccess = (list) => {
    return{
        type: actionTypes.FETCH_LIST_SUCCESS,
        roleList: list
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
        firestore.collection('roles').get()
            .then((roles) => {
                roles.forEach((doc) => {
                    doc.data().roles.map((role) => {
                        return list.push(role);
                    })
                });
                //console.log(list);
            })
            .then(()=>{
                console.log("dispatch success");
                dispatch(fetchListSuccess(list))}
            )
            .catch( error => dispatch(fetchListFail(error)));

    }
};
