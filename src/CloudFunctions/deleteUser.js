import React, {useState} from "react";
import {functions} from "../firebase";

export const DeleteUser = (uid) => {
    console.log(uid);
    const deleteUserRef = functions.httpsCallable('removeUserById');
    deleteUserRef({uid})
        .then(result => console.log("User deleted Successfully!"))
        .catch(error => console.log(error.message));
};
