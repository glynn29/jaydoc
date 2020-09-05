import React, {useState} from "react";
import {connect} from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {firestore} from "../../../../../firebase";


const AddVolunteer = props => {
    const formClasses = formStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [spanish, setSpanish] = useState(false);
    const list = props.roleList;

    //'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9DgOSm5USDUgymoYLpUIrlToWjY0vB1I';
    //add axios post to create real user

    const submitFormHandler = (event) =>{
       event.preventDefault();
       firestore.collection('users').add({
           approved: "true",
           first,
           last,
           email,
           id: 1,
           role,
           spanish: `${spanish}`
       }).then(() => props.onAdd())
           .catch(error => console.log(error));
       console.log("user added");
    };

    const form = (
        <div>
            <CssBaseline />
            <form className={formClasses.root} autoComplete="off" onSubmit={submitFormHandler}>
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
                            <InputLabel htmlFor="outlined-age-native-simple" required >Role</InputLabel>
                            <Select
                                native
                                value={role}
                                onChange={event => setRole(event.target.value) }
                                label="Role"
                                inputProps={{
                                    name: 'role',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {list.map( listItem => {
                                    return (
                                        <option key={listItem} value={listItem}>{listItem}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            checked={spanish}
                            value={spanish}
                            onChange={event => setSpanish(!spanish)}
                            control={<Checkbox value={spanish} color="primary" />}
                            label="Speak Spanish"
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

const mapStateToProps = state => {
    return{
        roleList: state.lists.roleList
    };
};

export default connect(mapStateToProps)(AddVolunteer);
