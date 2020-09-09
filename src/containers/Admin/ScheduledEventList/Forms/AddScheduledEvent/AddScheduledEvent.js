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
import DateTimePicker from "../../../../../components/UI/DateTimePicker/DateTimePicker";

const AddScheduledEvent = props => {
    const formClasses = formStyles();
    const [eventName, setEventName] = useState("");
    const [eventId, setEventID] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [eventNotes, setEventNotes] = useState("");
    const [eventList, setEventList] = useState([]);
    //const [positions, setPositions] = useState([]);

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('events').get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setEventList(events);
    }

    // async function getUserStuff() {
    //     const userRef = await firestore.collection("users").get();
    //     console.log(userRef);
    //     userRef.forEach(event => {
    //         let events = [];
    //         //events = event.data().events;
    //         console.log(events.length);
    //     })
    // }

    useEffect( () => {
        getEvents().catch(error => {console.log(error)});
    },[]);

    // useEffect(()=> {
    //      eventList.filter(e => e.name === eventName).map(row => setEventID(row.id));
    // },[eventName]);

    const submitFormHandler = (e) =>{
        e.preventDefault();
        console.log(eventName + " " + eventId);
        firestore.collection('scheduledEvents').add({
            start: startDateTime,
            end: endDateTime,
            eventName: eventName,
            eventId: eventId,
            notes: eventNotes,
        }).then(()=>{props.onAdd();})
            .catch(error => {console.log(error)});
        console.log("event Scheduled ");
    };

    const selectChangeHandler = (event) =>{
        setEventName(event.target.value);
        eventList.filter(e => e.name === event.target.name).map(row => setEventID(row.id));
    };

    const form = (
        <div>
            <CssBaseline />
            <form className={formClasses.root} autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required>Event</InputLabel>
                            <Select
                                native
                                value={eventName}
                                onChange={e => selectChangeHandler(e)}
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
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <DateTimePicker value={startDateTime} onChange={setStartDateTime} label="Start Time"/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <DateTimePicker value={endDateTime} onChange={setEndDateTime} label="End Time"/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <TextField
                                value={eventNotes}
                                onChange={event => setEventNotes(event.target.value)}
                                id="outlined-textarea"
                                label="Event Notes"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: formClasses.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={formClasses.submit}
                    >
                        Schedule Event
                    </Button>
                </Grid>
            </form>
        </div>
    );

    return form;
};

export default AddScheduledEvent;

