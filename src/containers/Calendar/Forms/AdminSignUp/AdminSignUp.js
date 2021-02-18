import React, {useState} from "react";

import Positions from "../../../Admin/ScheduledEventList/Forms/Volunteers/Volunteers";
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
    const [positions, setPositions] = useState(props.formData.positions);
    const [signedUpUsers, setSignedUpUsers] = useState([]);

    const updatePositions = (positions, signedUpUsers) => {
        signedUpUsers.filter(row => row !== undefined);
        console.log(signedUpUsers);
        setSignedUpUsers(signedUpUsers);
        setPositions(positions);
        //handleModalClose();
    };

    const submitFormHandler = (positions, signedUpUsers) =>{
        signedUpUsers.filter(row => row !== undefined);
        firestore.collectionGroup("volunteerEvents").where("scheduledEventId", "==", props.formData.id).get()
            .then(function (result) {
                result.forEach(row => {
                    row.ref.delete().catch(error => console.log(error));
                });
            }).then(function () {
            firestore.collection('scheduledEvents').doc(props.formData.id).set({
                positions: positions
            },{merge: true}).catch(error => console.log(error));
        }).then(function () {
            signedUpUsers.forEach(user => {
                if (user !== undefined){
                    firestore.collection('users').doc(user.userDocId).collection('volunteerEvents').add({
                        date,
                        endTime: end,
                        eventId,
                        eventName: name,
                        id: user.id,
                        name: user.first + " " + user.last,
                        position: user.position,
                        role: user.role,
                        startTime: start,
                        scheduledEventId: props.formData.id
                    }).catch(error => console.log(error));
                }
            });
        })
            .then(()=>{props.submit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    return(
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <Positions cancel={props.cancel} submit={submitFormHandler} positions={positions} headCells={headCells} signedUpUsers={signedUpUsers} isPastDate={props.formData.isPastDate}/>
        </Container>
    );
};

export default AdminSingUp;
