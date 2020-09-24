import React, {useEffect} from "react";

import {firestore} from "../../../firebase";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../components/UI/Styles/formStyle";

const Account = (props) => {
    const classes = useStyles();
    const {events} = props;

    useEffect(() => {
       props.getCurrentUser();
    },[]);

    let userEvents = [];
    let futureEvents = [];
    let pastEvents = [];
    console.log("events",events);

    if(events){
        events.map((event, index) => {
            let currentDate = new Date();
            let date = new Date(event.date);
            const button = <Button onClick={e => {console.log(event)}} variant="contained" className={classes.deleteButton}>Cancel</Button>

            if(date > currentDate){
                futureEvents.push(<p  key={index}> Event: {event.eventName}, Date: {date.toDateString()}, Position: {event.position}, Start: {event.startTime}, End: {event.endTime} {button}</p>);
                console.log("Future")
            }else {
                pastEvents.push(<p  key={index}> Event: {event.eventName}, Date: {date.toDateString()}, Position: {event.position}, Start: {event.startTime}, End: {event.endTime}</p>);
                console.log("past")
            }
        userEvents.push(<p  key={index}> Event: {event.eventName}, Date: {event.date}, Position: {event.position}, Start: {event.startTime}, End: {event.endTime}</p>)
        });
    }else {
        userEvents = <p> No events</p>
    }


    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>Account pages</p>
            <p>Future Events</p>
            {futureEvents}
            <p>Past Events</p>
            {pastEvents}
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
