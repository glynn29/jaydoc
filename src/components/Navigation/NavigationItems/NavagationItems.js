import React from "react";

import Typography from "@material-ui/core/Typography";

import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavagationItem/NavigationItem";

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>

        <NavigationItem link="/" exact clicked={props.clicked}><Typography>Home</Typography></NavigationItem>
            <NavigationItem link="/comments" clicked={props.clicked}><Typography>Comments</Typography></NavigationItem>
            <NavigationItem link="/contactUs" clicked={props.clicked}><Typography>Contact</Typography></NavigationItem>
            <NavigationItem link="/account" clicked={props.clicked}><Typography>Account</Typography></NavigationItem>
            <NavigationItem link="/calendar" clicked={props.clicked}><Typography>Calendar</Typography></NavigationItem>

        {!props.isAuthenticated
            ? <NavigationItem link="/login" clicked={props.clicked}><Typography>Login</Typography></NavigationItem>
            : <ul>
                <NavigationItem link="/logout" clicked={props.clicked}><Typography>Logout</Typography></NavigationItem>
                <NavigationItem link="/account" clicked={props.clicked}><Typography>Account</Typography></NavigationItem>
                <NavigationItem link="/calendar" clicked={props.clicked}><Typography>Calendar</Typography></NavigationItem>
            </ul>
        }
    </ul>
);

export default navigationItems
