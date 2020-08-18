import axios from 'axios'

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const logout = () => {
  return{
      type: actionTypes.AUTH_LOGOUT
  };
};

export const login = (authData) => {
  return dispatch =>{
      dispatch(authStart());

  }
};
