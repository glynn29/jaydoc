import * as actionTypes from './actionTypes';
import {auth, firestore} from "../../firebase";

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

async function createUser({first, last, email, role, spanish}) {
    const user = await auth.currentUser;
    firestore.collection('users').add({
        first: first,
        last: last,
        email: email,
        role: role,
        spanish: spanish,
        id: user.uid,
        approved: 'false',
        events: [
            {position: 'Director', eventId: 'LPnLIhcQpvnafAZey5lb'},
            {position: 'Student', eventId:'PYI8ymMLtYD8qTAHNmOD'}
        ]
    })
}

export const register = (registerData) => {
    return dispatch => {
        dispatch(authStart());
        auth.createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then(()=>{
                const name = registerData.first + " " + registerData.last;
                console.log(name);
                dispatch(registerSuccess());
            })
            .then(()=>{
                createUser(registerData).catch(error => console.log(error));
            })
            .catch(error => dispatch(authFail(error.message)))
    }
};


