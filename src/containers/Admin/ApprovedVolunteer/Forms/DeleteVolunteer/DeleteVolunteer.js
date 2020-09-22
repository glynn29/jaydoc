import React, {useState} from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const DeleteVolunteer = props => {
    const classes = useStyles();
    const formData = props.formData;

    console.log(formData);
    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
                <Typography>Delete {formData.first + " " + formData.last} ?</Typography>
                <Grid item xs={5}>
                    <Button variant="contained" className={classes.deleteButton} onClick={props.cancel}>Cancel</Button>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained"  className={classes.detailsButton} onClick={() => props.submit({userDocId: formData.userDocId, id: formData.id})}>Confirm</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default DeleteVolunteer;
