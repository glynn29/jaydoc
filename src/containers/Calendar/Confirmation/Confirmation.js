import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Container from "@material-ui/core/Container";

const Confirmation = props => {
    if(!props.formData){
        return <Redirect to={"/"}/>
    }

    const {formData} = props;
    console.log(props.formData);

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>Sign Up Successful!</p>
            <p>{formData.eventName}</p>
            <p>You signed up as {formData.position} from {formData.startTime} to {formData.endTime} on {formData.date}?</p>
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
