import React, {useEffect} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


import * as actions from "../../../store/actions";
import * as classes from './Account.module.css';
import ChangeRole from "./ChangeRole/ChangeRole";

const Account = (props) => {
    const {events, getCurrentUser} = props;

    useEffect(() => {
       getCurrentUser();
    },[getCurrentUser]);

    let futureEvents = [];
    let pastEvents = [];

    if(events){
        events.forEach((event, index) => {
            let currentDate = new Date();
            const date = new Date(event.date + "T17:00");
            const startTime = new Date(event.date + "T" + event.startTime);
            const endTime = new Date(event.date + "T" + event.endTime);
            const eventRow = <div  key={index}> <Typography variant="h6">{event.eventName}</Typography> Signed up as {event.position}<br/> {date.toDateString()}, from {startTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} - {endTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</div>;
            if(date >= currentDate){
                futureEvents.push(<Grid item xs={12} key={index}><Paper className={classes.Item}>{eventRow}</Paper></Grid>);
            }else {
                pastEvents.push(<Grid item xs={12} key={index}><Paper className={classes.Item}>{eventRow}</Paper></Grid>);
            }
        });
        futureEvents.reverse();
    }

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h3">Account Page</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{textAlign: 'left'}}>Future Events:</Typography>
                </Grid>
                    {futureEvents.length > 0 ? futureEvents : <Grid item xs={12}>No events</Grid>}
                <Grid item xs={12}>
                    <Typography variant="h4" style={{textAlign: 'left'}}>Past Events:</Typography>
                </Grid>
                    {pastEvents.length > 0 ? pastEvents : <Grid item xs={12}>No events</Grid>}
                <Grid item xs={12}>
                    <Typography variant="h4" style={{textAlign: 'left'}}>Change Role: </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ChangeRole roleList={props.roleList} userId={props.userId}/>
                </Grid>
            </Grid>
        </Container>);
};

const mapStateToProps = state => {
    return{
        events: state.auth.events,
        roleList: state.lists.roleList,
        userId: state.auth.userDocId
    };
};

const mapDispatchToProps = dispatch => {
    return{
        getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
