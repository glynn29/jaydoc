import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import {firestore} from "../../../../../firebase";

const list = [
    {template: 'clinic', name: 'jaydoc clinic', sponsor:'foo', }
];

const AddEvent = props => {
    const formClasses = formStyles();
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [details, setDetails] = useState("");
    //const [positions, setPositions] = useState([]);
    const [template, setTemplate] = useState("");

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('events').add({
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
        }).then(()=>{props.onAdd();})
            .catch(error => {console.log(error)});
        console.log("event ADDED");
    };

    const form = (
        <div>
            <CssBaseline />
            <form className={formClasses.root} autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required>Template</InputLabel>
                            <Select
                                native
                                value={template}
                                onChange={event => setTemplate(event.target.value) }
                                label="Template"
                            >
                                <option aria-label="None" value="" />
                                {list.map( listItem => {
                                    return (
                                        <option key={listItem.name} value={listItem.name}>{listItem.name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
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
                                label="Message"
                                placeholder="Keep up the good work"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: formClasses.textarea }}
                            /></FormControl>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={formClasses.submit}
                    >
                        Add Event
                    </Button>
                </Grid>
            </form>
        </div>
    );

    return form;
};

export default AddEvent;

