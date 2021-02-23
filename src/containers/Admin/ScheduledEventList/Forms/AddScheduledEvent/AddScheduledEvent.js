import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

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
import Volunteers from "../Volunteers/Volunteers";
import Positions from "../../../EventList/Forms/Positions/Positions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import Spinner from "../../../../../components/UI/Spinner/Spinner";


const headCells = [
    { id: 'position', label: 'Position' },
    { id: 'volunteer', label: 'Volunteer' },
];

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

    const [positionList, setPositionList] = useState(props.positionList);
    const [volunteersList, setVolunteersList] = useState([]);
    const [positionsModalOpen, setPositionsModalOpen] = useState(false);

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
           // setPositionList(eventsRef.data().positions);
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
        setPositionList(props.positionList);
        setVolunteersList([]);
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
        }).then(function (res) {
            positions.forEach(user => {
                if (user.email){
                    firestore.collection("users").where("email", "==", user.email).get().then(function (result) {
                        result.forEach((row) =>{
                            console.log(row.data(), row.id);
                            firestore.collection('users').doc(row.id).collection('volunteerEvents').add({
                                date,
                                endTime,
                                eventId,
                                eventName,
                                id: row.data().id,
                                name: row.data().first + " " + row.data().last,
                                position: user.position,
                                role: row.data().role,
                                startTime,
                                scheduledEventId: res.id
                            }).catch(error => console.log(error));
                        })
                    });
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

    const updateVolunteers = (positions) => {
        setPositions(positions);
        handleModalClose();
    };


    //positions modal functions
    const convertList = () => {
        //turn positions into list or {name: , count:}
        //from {email, position, language, volunteer}
        let minimum = 0;
        let i = 0;
        let count = 0;
        let tempPositionList = [...positionList];
        let tempVolunteerList = [];
        const tempPositions = [...positions];

        let newList = [];
        console.table(tempPositionList);
        console.table(tempPositions);

        tempPositionList.forEach((position, index) =>{
            for (let j = i; j < tempPositions.length; j++){
                if(tempPositions[j].position === position || tempPositions[j].position === position.name){
                    count++;
                    i++;
                    if (tempPositions[j].volunteer){
                        minimum++;
                        tempVolunteerList.push(tempPositions[j]);
                        console.log(i, j , minimum);
                    }
                }
            }
            let name = "";
            if (position.name)
                name = position.name;
            else
                name = position;

            console.log(index, i, count);
            newList[index] = {name: name, count: count, minimum: minimum};
            count = 0;
            minimum = 0;

        });
        setVolunteersList(tempVolunteerList);
        setPositionList(newList);
    };

    const handlePositionsOpen = () => {
        convertList();
        setPositionsModalOpen(true);
    };

    const handlePositionsClose = () => {
        setPositionsModalOpen(false);
    };

    const updatePositions = (positionsVar) => {
        //take new positions list and add users back into it
        //need to revert the list back
        const updatedPositionList = [];
        const positions = [...positionsVar];
        positions.forEach((position) => {
            for (let i = 0; i < position.count; i++){
                updatedPositionList.push({position: position.name});
            }
        });
        //outside go through each volunteer that was saved and check with inner loop
        //inner loop go through the positions array and see if it matches the position on the volunteer
        //positions {name, count, minimum}
        let volunteerIndex = 0;
        volunteersList.forEach(volunteer => {
            for (let i = volunteerIndex; i < updatedPositionList.length; i++){
                if (volunteer.position === updatedPositionList[i].position) {
                    volunteerIndex = i;
                    break;
                }
            }
            updatedPositionList[volunteerIndex] = volunteer;
            volunteerIndex++;
        });
        setPositionList(positions);
        setPositions(updatedPositionList);

        console.table(positions);
        console.table(updatedPositionList);
        handlePositionsClose();
    };

    return (
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
                    {positions && ( loading ? <Spinner/>:<Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Button onClick={handlePositionsOpen}
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                            >
                                Edit Positions
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
                form={<Volunteers cancel={handleModalClose} submit={updateVolunteers} positions={positions} headCells={headCells}/>}
                title={"Add Positions"}
            />
            <TransitionModal
                open={positionsModalOpen}
                handleOpen={handlePositionsOpen}
                handleClose={handlePositionsClose}
                form={<Positions cancel={handlePositionsClose} submit={updatePositions} positionList={positionList} button={"Edit Positions"}/>}
                title={"Edit Positions"}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList
    };
};

export default connect(mapStateToProps)(AddScheduledEvent);

