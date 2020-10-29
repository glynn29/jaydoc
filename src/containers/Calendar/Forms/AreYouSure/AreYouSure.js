import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useStyles from "../../../../components/UI/Styles/formStyle";

const AreYouSure = props => {
    const classes = useStyles();
    const {formData} = props;

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <p>{formData.eventName}</p>
                    <p>{formData.name}, are you sure you want to signup for {formData.position} from {formData.startTime} to {formData.endTime} on {formData.date}?</p>
                    <p>Once you signup you will need Admin approval to cancel</p>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.submit({index: formData.index, position: formData.position, date: formData.date})}
                        fullWidth
                    >
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default AreYouSure;
