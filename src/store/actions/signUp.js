import * as actionTypes from "./actionTypes";

export const updateConfirmation = (data) => {
    return{
        type: actionTypes.UPDATE_CONFIRMATION,
        data: data
    };
};
