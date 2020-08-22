import React from "react";

import Typography from "@material-ui/core/Typography";

import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavagationItems";
import classes from "./SideDrawer.module.css"
import Backdrop from "../../../UI/Backdrop/Backdrop";


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Typography variant="h5">JayDoc Free Clinic <Typography variant="h6">Official Volunteer Website</Typography></Typography>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} clicked={props.closed} />
                </nav>
            </div>
        </div>
    );
};

export default sideDrawer;
