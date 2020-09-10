import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
const AreYouSure = props => {
    const classes = useStyles();
    const [formData, setFormData] = useState(props.formData);

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
                <p>{formData.eventName}</p>
                <p>{formData.name}, are you Sure you want to signup for {formData.position} from {formData.startTime} to {formData.endTime} on {formData.date}?</p>
                <p>Once you signup you will need Admin approval to cancel</p>
                <Grid item>
                    <Button variant="contained" className={classes.deleteButton} onClick={props.cancel}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained"  className={classes.detailsButton} onClick={props.submit}>Confirm</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default AreYouSure;
