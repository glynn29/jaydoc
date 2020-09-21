const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=> {
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true
        });
    }).then(() => {
        return {
            message: 'success user has been made admin'
        }
    }).catch(error => {return error})
});

exports.removeUserById = functions.https.onCall((data, context) => {
    return admin.auth().deleteUser(data.uid)
        .then(() => console.log("Successfully deleted user: ", data.uid))
        .catch(error => console.log("Error deleting user: ",error.message))
});
