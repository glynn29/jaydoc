import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const DeleteEvent = props => {
    const classes = useStyles();
    const formData = props.formData;

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>Delete {formData.name}?</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        className={classes.detailsButton}
                        onClick={() => props.submit({id: formData.id})}
                        fullWidth
                    >Confirm</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default DeleteEvent;
