import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Container from "@material-ui/core/Container";

const Confirmation = props => {
    if(!props.formData){
        return <Redirect to={"/"}/>
    }
    const {formData} = props;

    const formattedStart = new Date(formData.date + "T" + formData.startTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedEnd = new Date(formData.date + "T" + formData.endTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedDate = new Date(formData.date + "T17:00").toDateString();

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>Sign Up Successful!</p>
            <p>{formData.eventName}</p>
            <p>You signed up as {formData.position} from {formattedStart} to {formattedEnd} on {formattedDate}?</p>
            <p>{formData.details}</p>
        </Container>
    )
};

const mapStateToProps = state => {
    return{
        formData: state.signUp.data
    };
};
export default connect(mapStateToProps)(Confirmation);
