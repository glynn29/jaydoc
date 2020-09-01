import * as actionTypes from './actionTypes';
import {auth} from "../../firebase";

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return{
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const registerSuccess = () => {
    return{
        type: actionTypes.REGISTER_SUCCESS,
        registered: true
    }
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    auth.signOut().then(() => console.log("user signed out"));
    return{
      type: actionTypes.AUTH_LOGOUT
    };
};

export const login = (email, password) => {
  return dispatch =>{
      dispatch(authStart());
      auth.signInWithEmailAndPassword(email,password)
          .then(()=>{
              console.log("logged in");
              dispatch(authSuccess());
          })
          .catch(error => dispatch(authFail(error.message)))
  }
};

export const register = (registerData) => {
    return dispatch => {
        dispatch(authStart());
        auth.createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then(()=>{
                dispatch(registerSuccess());
            }).catch(error => dispatch(authFail(error.message)))

    }
};

