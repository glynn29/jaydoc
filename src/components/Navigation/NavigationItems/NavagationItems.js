import React, {useContext} from "react";

import Typography from "@material-ui/core/Typography";
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavagationItem/NavigationItem";
import {AuthContext} from "../../../containers/Auth/Auth";

const NavigationItems = (props) => {
    const {currentUser, isAdmin} = useContext(AuthContext);

    const nav = currentUser ?
                <NavigationItem link="/logout" clicked={props.clicked}><Typography>Logout</Typography></NavigationItem>
            :
                <NavigationItem link="/login" clicked={props.clicked}><Typography>Login</Typography></NavigationItem>;

    const adminLinks = (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked}><Typography>DashBoard</Typography></NavigationItem>
        <NavigationItem link="/eventList" clicked={props.clicked}><Typography>Events</Typography></NavigationItem>
        <NavigationItem link="/scheduledEventList" clicked={props.clicked}><Typography>Schedule Events</Typography></NavigationItem>
        <NavigationItem link="/volunteerList" clicked={props.clicked}><Typography>Volunteers</Typography></NavigationItem>
        <NavigationItem link="/email" clicked={props.clicked}><Typography>Email</Typography></NavigationItem>
        <NavigationItem link="/report" clicked={props.clicked}><Typography>Report</Typography></NavigationItem>
        {nav}
    </ul>);

    const userLinks = (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked}><Typography>Home</Typography></NavigationItem>
        <NavigationItem link="/comments" clicked={props.clicked}><Typography>Comments</Typography></NavigationItem>
        <NavigationItem link="/contactUs" clicked={props.clicked}><Typography>Contact</Typography></NavigationItem>
        {currentUser && <NavigationItem link="/account" clicked={props.clicked}><Typography>Account</Typography></NavigationItem>}
        {currentUser && <NavigationItem link="/calendar" clicked={props.clicked}><Typography>Calendar</Typography></NavigationItem>}
        {nav}
    </ul>);

    return isAdmin ? adminLinks : userLinks;
};

export default NavigationItems
