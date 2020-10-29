import React, {useEffect, useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";
import {CustomTimePicker,
        CustomDatePicker
} from "../../../../../components/UI/DateTimePicker/DateTimePicker";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import Positions from "../Positions/Positions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";

const headCells = [
    { id: 'position', label: 'Position' },
    { id: 'volunteer', label: 'Volunteer' },
];

const EditScheduledEvent = props => {
    const classes = formStyles();
    const {eventList} = props;
    const [eventName, setEventName] = useState(props.formData.name);
    const [eventId, setEventID] = useState(props.formData.eventId);
    const [startTime, setStartTime] = useState(props.formData.start);
    const [endTime, setEndTime] = useState(props.formData.end);
    const [date, setDate] = useState(props.formData.date);
    const [details, setDetails] = useState("" + props.formData.details);
    const [positions, setPositions] = useState(props.formData.positions);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signedUpUsers, setSignedUpUsers] = useState([]);

    async function getPositions(eventId) {
        let positions = [];
        setLoading(true);
        const eventsRef = await firestore.collection('events').doc(eventId).get();
        if (eventsRef.exists) {
            console.log("positions",eventsRef.data());
            setDetails(eventsRef.data().details);
            eventsRef.data().positions.forEach((position) => {
                for (let i = 0; i < position.count; i++){
                    positions.push({position: position.name});
                }
            });
        }else {
            console.log("no doc", props.formData.eventId);
        }
        setLoading(false);
        setPositions(positions);
        console.table(positions);
    }

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collectionGroup("volunteerEvents").where("scheduledEventId", "==", props.formData.id).get()
            .then(function (result) {
                result.forEach(row => {
                    row.ref.delete().catch(error => console.log(error));
                });
             }).then(function () {
                firestore.collection('scheduledEvents').doc(props.formData.id).set({
                    start: startTime.toString(),
                    end: endTime.toString(),
                    date: date.toString(),
                    name: eventName,
                    eventId: eventId,
                    details: details,
                    positions: positions
                },{merge: true}).catch(error => console.log(error));
            }).then(function () {
                signedUpUsers.forEach(user => {
                    if (user !== undefined){
                        firestore.collection('users').doc(user.userDocId).collection('volunteerEvents').add({
                            date,
                            endTime,
                            eventId,
                            eventName,
                            id: user.id,
                            name: user.first + " " + user.last,
                            position: user.position,
                            role: user.role,
                            startTime,
                            scheduledEventId: props.formData.id
                        }).catch(error => console.log(error));
                    }
                });
            })
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    const selectChangeHandler = (event) =>{
        console.log(event.target.value);
        setEventName(event.target.value);
        eventList.filter(e => e.name === event.target.value).map(row => {
            getPositions(row.id).catch(error => console.log(error));
            setEventID(row.id)
        });
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const updatePositions = (positions, signedUpUsers) => {
        signedUpUsers.filter(row => row !== undefined);
        console.log(signedUpUsers);
        setSignedUpUsers(signedUpUsers);
        setPositions(positions);
        handleModalClose();
    };

    return (
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <CssBaseline />
            <form className={classes.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} required>
                            <InputLabel required>Event</InputLabel>
                            <Select
                                fullWidth
                                native
                                value={eventName}
                                onChange={selectChangeHandler}
                                label="Event"
                            >
                                <option aria-label="None" value="" />
                                {eventList.map(listItem => {
                                    return (
                                        <option key={listItem.id} value={listItem.name}>{listItem.name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <CustomDatePicker value={date} onChange={setDate} label="Date"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <CustomTimePicker value={startTime} onChange={setStartTime} label="Start Time"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <CustomTimePicker value={endTime} onChange={setEndTime} label="End Time"/>
                        </FormControl>
                    </Grid>
                    {positions && ( loading ? <Spinner/>:<Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Button onClick={handleModalOpen}
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                            >
                                Edit Volunteers
                            </Button>
                        </FormControl>
                    </Grid>)}
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="outlined-textarea"
                                label="Details"
                                multiline
                                variant="outlined"
                                fullWidth
                                rows={8}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={classes.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Edit Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<Positions cancel={handleModalClose} submit={updatePositions} positions={positions} headCells={headCells} signedUpUsers={signedUpUsers}/>}
                title={"Edit Positions"}
            />
        </Container>
    );
};

export default EditScheduledEvent;
