import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useStyles from "../../../../components/UI/Styles/formStyle";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Typography from "@material-ui/core/Typography";

const AreYouSure = props => {
    const classes = useStyles();
    const {formData} = props;
    const [loading, setLoading] = useState(false);

    const form = (
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Are You Sure?
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <p>{formData.eventName}</p>
                    <p>Are you sure you want to sign up for {formData.position} from {formData.startTime} to {formData.endTime} on {formData.date}?</p>
                    <p>{formData.details}</p>
                    <p>Once you sign up you will need Admin approval to cancel</p>
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
                        onClick={() => {
                            setLoading(true);
                            props.submit({index: formData.index, position: formData.position, date: formData.date, details: formData.details});
                        }}
                        fullWidth
                    >
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );

    return loading ? <Spinner/> : form;
};

export default AreYouSure;
