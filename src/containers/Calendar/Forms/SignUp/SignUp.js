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

    const [filteredTableData, setFilteredTableData] = useState([]);
    const [formData, setFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [alreadyInEvent, setAlreadyInEvent] = useState(false);
    const [position, setPosition] = useState();

    useEffect(()=> {
        let filteredTableData = [];
        props.formData.positions.forEach((row, index) => {
            for(let i = 0; i < positions.length; i++){
                if(positions[i] === row.position){
                    filteredTableData.push({...row, index, name});
                    if (row.volunteer === name){
                        setAlreadyInEvent(true);
                        setPosition(row.position);
                        break;
                    }
                }
            }
        });
        setFilteredTableData(filteredTableData);
    },[name, positions, props.formData.positions]);

    if(confirm){
        return(
            <Redirect to={"/confirm"}/>
        );
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (props) => {
        console.log(props);
        setFormData({position: props.position, name, eventName, startTime, endTime, date, index: props.index, details});
        setModalOpen(true);
    };

    function arraysEqual(a, b) {
        //checks to see if two arrays of objects are the same
        return a.every((o,i) => Object.keys(o).length === Object.keys(b[i]).length && Object.keys(o).every(k => o[k] === b[i][k]));
    }

    function submitHandler({index, position, date}) {
        handleModalClose();
        props.onConfirm(formData);
        let newTableData = [...tableData];
        const newRow = newTableData[index];
        newTableData[index] = {...newRow, volunteer: name, email, language};

        //get the current event in the database, and see if its out of sync with client before updating
        firestore.collection('scheduledEvents').doc(props.formData.id).get().then(
            function (res) {
                const currentPos = res.data().positions; // current database positions array
                console.table(currentPos);
                console.table(tableData);
                console.table(newTableData);
                if (arraysEqual(currentPos, tableData)){
                    //update event with new positions array
                    firestore.collection('scheduledEvents').doc(props.formData.id)
                        .set({
                            positions: newTableData
                        },{merge: true})
                        .catch(error => console.log(error));

                    //add event to users events
                    firestore.collection('users').doc(props.userDocId).collection('volunteerEvents')
                        .add({
                            eventId: props.formData.id,
                            eventName,
                            position: position,
                            startTime,
                            endTime,
                            date: date,
                            id: props.userId,
                            role: props.role,
                            name
                        })
                        .catch(error => console.log(error));
                    setConfirm(true);
                }else {
                    alert("error signing up, please try again.")
                }
            }
        );

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
                    { !alreadyInEvent ? <EnhancedTable data={filteredTableData} headCells={headCells} signUp={handleModalOpen}/> : <p>Already signed up for this event as {position}</p>}
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
                title={"Are You Sure?"}
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
