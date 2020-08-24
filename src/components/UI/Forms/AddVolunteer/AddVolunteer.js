import React, {useState,useEffect} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const list = [
    {name:"M1"},
    {name:"M2"},
    {name:"M3"},
    {name:"M4"},
];

const AddVolunteer = props => {
    const formClasses = formStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState("");
    const [spanish, setSpanish] = useState(false);

    //useEffect to mount data from id from props

    const submitFormHandler = () =>{
        props.onAdd();
        alert("Added User: " + first + " " + last + " " + email + " " + status + " active:" + active + " spanish:" + spanish);
    };

    const form = (
        <div>
            <CssBaseline />
            <form className={formClasses.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <TextField
                            value={first}
                            onChange={event => setFirst(event.target.value)}
                            name="firstName"
                            variant="outlined"
                            required

                            id="firstName"
                            label="First Name"
                            autoFocus
                        /></Grid>
                    <Grid item>
                        <TextField
                            value={last}
                            onChange={event => setLast(event.target.value)}
                            variant="outlined"
                            required

                            id="lastName"
                            label="Last Name"
                            name="lastName"
                        /></Grid>
                    <Grid item>
                        <TextField
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            variant="outlined"
                            required

                            id="email"
                            label="Email Address"
                            name="email"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            variant="outlined"
                            required

                            id="password"
                            label="Password"
                            name="password"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required >Status</InputLabel>
                            <Select
                                native
                                value={status}
                                onChange={event => setStatus(event.target.value) }
                                label="Status"
                                inputProps={{
                                    name: 'status',
                                    id: 'outlined-age-native-simple',
                                }}
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
                        <FormControlLabel
                            checked={spanish}
                            value={spanish}
                            onChange={event => setSpanish(event.target.value)}
                            control={<Checkbox value={spanish} color="primary" />}
                            label="Speak Spanish"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            checked={active}
                            value={active}
                            onChange={event => setActive(event.target.value)}
                            control={<Checkbox value={active} color="primary" />}
                            label="Active"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"

                    variant="contained"
                    color="primary"
                    className={formClasses.submit}
                >
                    Add Volunteer
                </Button>
            </form>
        </div>
    );

    return form;
};

export default AddVolunteer;
