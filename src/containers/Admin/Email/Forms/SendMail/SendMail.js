import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import useStyles from "../../../../../components/UI/Styles/formStyle";


const SendMail = props => {
    const classes = useStyles();
    let {formData} = props;

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={2}  >
                <Grid item xs={12}>
                    {<ul>{formData.map(email => <li style={{textAlign: 'left'}} key={email}>{email}</li>)}</ul>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" className={classes.cancelButton} onClick={props.cancel}>Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained"  className={classes.detailsButton} onClick={() => props.submit(formData)}>{props.button}</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default SendMail;
