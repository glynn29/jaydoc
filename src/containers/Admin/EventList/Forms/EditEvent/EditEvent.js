import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";

const EditEvent= props => {
    const formClasses = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [sponsor, setSponsor] = useState(props.formData.sponsor);
    const [details, setDetails] = useState(props.formData.details);
    //const [positions, setPositions] = useState([]);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('events').doc(props.formData.id).set({
            name: name,
            sponsor: sponsor,
            details: details,
            positions: [
                {
                    name: "Director",
                    count: 3
                },
                {
                    name: "Student",
                    count: 5
                }
            ]
        })
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    const form = (
        <div >
        <CssBaseline />
        <h1>{"Id is: " + props.formData.id}</h1>
        <form className={formClasses.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                <Grid item>
                    <TextField
                        value={name}
                        onChange={event => setName(event.target.value)}
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Event Name"
                        autoFocus
                    />
                </Grid>
                <Grid item>
                    <TextField
                        value={sponsor}
                        onChange={event => setSponsor(event.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        id="sponsor"
                        label="Sponsor"
                        name="sponsor"
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={formClasses.formControl}>
                        <TextField
                            value={details}
                            onChange={event => setDetails(event.target.value)}
                            id="outlined-textarea"
                            label="Details"
                            multiline
                            variant="outlined"
                            fullWidth
                            required
                            rows={10}
                            inputProps={{ className: formClasses.textarea }}
                        /></FormControl>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={formClasses.submit}
            >
                Edit Event
            </Button>
        </form>
        </div>
    );

    return form;
};

export default EditEvent;
