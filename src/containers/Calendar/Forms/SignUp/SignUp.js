import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../components/UI/Table/Table";
import AreYouSure from "../AreYouSure/AreYouSure";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import * as actions from "../../../../store/actions";
import {firestore} from "../../../../firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useStyles from "../../../../components/UI/Styles/formStyle";

const headCells = [
    { id: 'position', label: 'Position' },
    { id: 'volunteer', label: 'Volunteer'},
];

const SignUp = (props) => {
    const classes = useStyles();
    const {positions, name, email, language} = props;
    const eventName = props.formData.name;
    const startTime = props.formData.start;
    const endTime = props.formData.end;
    const date = props.formData.date;
    const tableData = props.formData.positions;
    const details = props.formData.details;

    const [successIfStatement, setSuccessIfStatement] = useState(false);
    const [successTransaction, setSuccessTransaction] = useState(false);
    const [formData, setFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [alreadyInEvent, setAlreadyInEvent] = useState(false);

    useEffect(()=> {
        tableData.forEach((row) => {
            if (row.volunteer === name){
                setAlreadyInEvent(true);
            }
        });
    },[name, positions, tableData]);

    useEffect(()=>{
        if(successIfStatement && successTransaction){
            setConfirm(true);
        }
    }, [successIfStatement, successTransaction]);

    if(confirm){
        return(
            <Redirect to={"/confirm"}/>
        );
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (props) => {
        setFormData({position: props.position, name, eventName, startTime, endTime, date, index: props.index, details});
        setModalOpen(true);
    };

    //async function that runs a transaction so client and server stay in sync for user event sign ups
    async function eventSingUpEvent({index, position, date}) {
        const eventRef = firestore.collection('scheduledEvents').doc(props.formData.id);
        //create doc to update later
        const userRef = firestore.collection('users').doc(props.userDocId).collection('volunteerEvents').doc();
        try{
            await firestore.runTransaction( async (t) =>{
                //get the current event in the database, and see if its out of sync with client before updating
                const doc = await t.get(eventRef);

                // current database positions array
                const currentPos = doc.data().positions;

                //if it has a volunteer then that spot is taken
                if(currentPos[index].volunteer){
                    alert("An error has occurred while signing up, please try again.");
                    props.getEvents();
                    props.cancel();
                    setSuccessIfStatement(false);
                }else{
                    let newTableData = [...currentPos];
                    const newRow = newTableData[index];
                    newTableData[index] = {...newRow, volunteer: name, email, language};
                    //update event with new positions array
                    t.update(eventRef, {positions: newTableData});
                    //add event to users events
                    t.set(userRef,
                        {
                            eventId: props.formData.id,
                            eventName,
                            position: position,
                            startTime,
                            endTime,
                            date: date,
                            id: props.userId,
                            role: props.role,
                            name
                        }
                    );
                     setSuccessIfStatement(true);
                }
            });
            setSuccessTransaction(true);
        }catch (e) {
            setSuccessTransaction(false);
            alert("An error has occurred while signing up, please try again.");
            props.getEvents(props.date);
            props.cancel();
        }
    }

    function submitHandler({index, position, date}) {
        handleModalClose();
        props.onConfirm(formData);
        eventSingUpEvent({index, position, date}).catch(error => console.log(error));
    }

    function cancelHandler() {
        handleModalClose();
    }

    const formattedStart = new Date(date + "T" + startTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedEnd = new Date(date + "T" + endTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedDate = new Date(date + "T17:00").toDateString();

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <p>{eventName} From {formattedStart} to {formattedEnd} on {formattedDate}</p>
                </Grid>
                <Grid item xs={12}>
                    <EnhancedTable data={tableData} headCells={headCells} signUp={!props.formData.isPastDate ? handleModalOpen : undefined} positions={positions} alreadyInEvent={alreadyInEvent}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<AreYouSure formData={formData} submit={submitHandler} cancel={cancelHandler}/>}
            />
        </Container>
    )
};

const mapStateToProps = state => {
    return{
        role: state.auth.role,
        email: state.auth.email,
        positions: state.auth.positions,
        userId: state.auth.userId,
        name: state.auth.name,
        events: state.auth.events,
        userDocId: state.auth.userDocId,
        language: state.auth.language
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onConfirm: (data) => dispatch(actions.updateConfirmation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
