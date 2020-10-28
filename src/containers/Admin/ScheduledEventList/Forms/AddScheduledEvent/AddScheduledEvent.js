import React, {useEffect, useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import {firestore} from "../../../../../firebase";
import {CustomTimePicker,
        CustomDatePicker
} from "../../../../../components/UI/DateTimePicker/DateTimePicker";
import Container from "@material-ui/core/Container";
import Positions from "../Positions/Positions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import firebase from "firebase";

const AddScheduledEvent = props => {
    const classes = formStyles();
    const {eventList} = props;
    const [eventName, setEventName] = useState("");
    const [eventId, setEventID] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [details, setDetails] = useState("");
    const [positions, setPositions] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signedUpUsers, setSignedUpUsers] = useState([]);

    const headCells = [
        { id: 'position', label: 'Position' },
        { id: 'volunteer', label: 'Volunteer' },
    ];

    useEffect( () => {
        if (eventId) {
            getPositions().catch(error => console.log(error));
        }
    },[eventId]);

    async function getPositions() {
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

    const submitFormHandler = (e) =>{
        e.preventDefault();
        console.log(eventName + " " + eventId);

        firestore.collection('scheduledEvents').add({
            start: startTime.toString(),
            end: endTime.toString(),
            date: date.toString(),
            name: eventName,
            eventId: eventId,
            details: details,
            positions: positions
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
                    }).catch(error => console.log(error));
                }
            });
        })
            .then(()=>{props.onAdd();})
            .catch(error => {console.log(error)});
        console.log("event Scheduled ");
    };

    const selectChangeHandler = (event) =>{
        console.log(event.target.value);
        setEventName(event.target.value);
        eventList.filter(e => e.name === event.target.value).map(row => setEventID(row.id));
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

    const form = (
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <CssBaseline />
            <form className={classes.root} autoComplete="off" onSubmit={submitFormHandler}>
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
                                Add Volunteers
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
                                required
                                rows={8}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
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
                            Schedule Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<Positions cancel={handleModalClose} submit={updatePositions} positions={positions} headCells={headCells} signedUpUsers={signedUpUsers}/>}
                title={"Add Positions"}
            />
        </Container>
    );

    return form;
};

export default AddScheduledEvent;

