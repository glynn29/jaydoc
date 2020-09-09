import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";
import DateTimePicker from "../../../../../components/UI/DateTimePicker/DateTimePicker";

const EditScheduledEvent = props => {
    const formClasses = formStyles();
    const [eventName, setEventName] = useState(props.formData.eventName);
    const [start, setStart] = useState(props.formData.start);
    const [end, setEnd] = useState(props.formData.end);
    const [notes, setNotes] = useState(props.formData.notes);
    //const [positions, setPositions] = useState([]);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('scheduledEvents').doc(props.formData.id).set({
            name: eventName,
            sponsor: start,
            details: end,
            positions: [
                {
                    name: "Director",
                    count: 3
                },
                {
                    name: "Student",
                    count: 5
                }
            ]
        })
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    const form = (
        <div >
            <CssBaseline />
            <h1>{"Id is: " + props.formData.id}</h1>
            <form className={formClasses.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <TextField
                            value={eventName}
                            onChange={event => setEventName(event.target.value)}
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Event Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <DateTimePicker value={start} onChange={setStart} label="Start Time"/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <DateTimePicker value={end} onChange={setEnd} label="End Time"/>
                        </FormControl>
                    </Grid>
                    {/*<Grid item>*/}
                    {/*    <TextField*/}
                    {/*        value={start}*/}
                    {/*        onChange={event => setStart(event.target.value)}*/}
                    {/*        variant="outlined"*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="start"*/}
                    {/*        label="Start"*/}
                    {/*        name="start"*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    {/*    <TextField*/}
                    {/*        value={end}*/}
                    {/*        onChange={event => setEnd(event.target.value)}*/}
                    {/*        variant="outlined"*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="end"*/}
                    {/*        label="End"*/}
                    {/*        name="end"*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl}>
                            <TextField
                                value={notes}
                                onChange={event => setNotes(event.target.value)}
                                id="outlined-textarea"
                                label="Notes"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: formClasses.textarea }}
                            /></FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={formClasses.submit}
                >
                    Edit Event
                </Button>
            </form>
        </div>
    );

    return form;
};

export default EditScheduledEvent;
