import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../../firebase";
import formStyles from "../../../../../../components/UI/Styles/formStyle";

const Add = props => {
    const classes = formStyles();
    const [name, setName] = useState("");
    const positionList = props.positionList;

    const submitFormHandler = (event) =>{
        event.preventDefault();
        let newPositions = [...positionList];
        newPositions.push(name);
        firestore.collection('positions').doc('positions').update({
            positions: newPositions
        }).catch(error => console.log(error));
        props.onAdd();
    };

    return (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} required>
                            <TextField
                                value={name}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Position Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={classes.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add Position
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Add;


