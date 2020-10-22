import React, {useEffect} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../components/UI/Styles/formStyle";
import {firestore} from "../../../firebase";
import * as actions from "../../../store/actions";
import {getCurrentUser} from "../../../store/actions/auth";

const Account = (props) => {
    const classes = useStyles();
    const {events} = props;

    useEffect(() => {
       props.getCurrentUser();
    },[getCurrentUser]);

    let futureEvents = [];
    let pastEvents = [];

    const cancelEvent = (event) =>{
        console.log('trying to cancel');
        console.table(event);
        firestore.collection("cancellation").add({
            event
        })
            .then(function () {
                alert("Cancellation request sent")
            })
            .catch(error => console.log(error));
    };

    if(events){
        events.map((event, index) => {
            let currentDate = new Date();
            const date = new Date(event.date + "T17:00");
            const startTime = new Date(event.date + "T" + event.startTime);
            const endTime = new Date(event.date + "T" + event.endTime);
            const button = <Button onClick={() => cancelEvent(event)} variant="contained" className={classes.deleteButton}>Cancel</Button>;
            const eventRow = <p  key={index}> Event: {event.eventName} <br/> Position: {event.position}<br/> Date: {date.toDateString()}, from {startTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} - {endTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}<br/> {date >= currentDate && button}</p>;
            if(date >= currentDate){
                futureEvents.push(eventRow);
            }else {
                pastEvents.push(eventRow);
            }
        });
    }


    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Account Page</Typography>
            <Typography variant="h4">Future Events:</Typography>
            {futureEvents.length > 0 ? futureEvents : "No events"}
            <Typography variant="h4">Past Events:</Typography>
            {pastEvents.length > 0 ? pastEvents : "No events"}
        </Container>);
};

const mapStateToProps = state => {
    return{
        events: state.auth.events
    };
};

const mapDispatchToProps = dispatch => {
    return{
        getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
