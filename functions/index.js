const sendGrid = require('@sendgrid/mail');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const apiKey = functions.config().sendgrid.key;
const template = functions.config().sendgrid.template;

sendGrid.setApiKey(apiKey);

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

exports.sendEventMail = functions.https.onCall(async (data, context) => {
    const msg = {
        to: data.emails,
        from: 'jaydocinventory1@gmail.com',
        templateId: template,
        dynamic_template_data: {
            subject: data.subject,
            name: data.name,
            text: data.text,
        },
        attachments: [
            {
                content: data.icsAttachment,
                filename: "event.ics",
                type: "text/plain",
                disposition: "attachment"
            },
        ]

    };

    await sendGrid.send(msg);

    return {success: true};
});
