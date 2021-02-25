import React from "react";

import Volunteers from "../../../Admin/ScheduledEventList/Forms/Volunteers/Volunteers";
import Container from "@material-ui/core/Container";
import {firestore} from "../../../../firebase";

const headCells = [
    { id: 'position', label: 'Position' },
    { id: 'volunteer', label: 'Volunteer'},
    { id: 'language', label: 'Language'},
];

const AdminSingUp = (props) => {
    console.table(props.formData);
    const {start, end, date, name, eventId} = props.formData;

    const submitFormHandler = (positions) =>{
        console.log(props.formData);
        firestore.collection('scheduledEvents').doc(props.formData.id).get().then(function (res) {
            let upToDate = true;
            for (let i = 0; i < props.formData.positions.length; i++){
                if (props.formData.positions[i].volunteer !== res.data().positions[i].volunteer){
                    upToDate = false;
                    console.log(false);
                }
            }

            if(upToDate){
                firestore.collectionGroup("volunteerEvents").where("scheduledEventId", "==", props.formData.id).get()
                    .then(function (result) {
                        result.forEach(row => {
                            row.ref.delete().catch(error => console.log(error));
                        });
                    }).then(function () {
                    firestore.collection('scheduledEvents').doc(props.formData.id).update({
                        positions: positions
                    }).catch(error => console.log(error));
                }).then(function () {
                    positions.forEach(user => {
                        if (user.email){
                            firestore.collection("users").where("email", "==", user.email).get().then(function (result) {
                                result.forEach((row) =>{
                                    console.log(row.data(), row.id);
                                    firestore.collection('users').doc(row.id).collection('volunteerEvents').add({
                                        date,
                                        endTime: end,
                                        eventId,
                                        eventName: name,
                                        id: row.data().id,
                                        name: row.data().first + " " + row.data().last,
                                        position: user.position,
                                        role: row.data().role,
                                        startTime: start,
                                        scheduledEventId: props.formData.id
                                    }).catch(error => console.log(error));
                                })
                            });
                        }
                    });
                })
                    .then(()=>{props.submit();})
                    .catch(error => {console.log(error)});
                console.log("event Edited");
            }else {
                props.submit();
                alert("Error, someone may have just signed up, please try again");
            }
        });
    };

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Volunteers cancel={props.cancel} submit={submitFormHandler} positions={props.formData.positions} headCells={headCells} isPastDate={props.formData.isPastDate}/>
        </Container>
    );
};

export default AdminSingUp;
