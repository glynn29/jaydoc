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

import {firestore} from "../../../../../firebase";
import Container from "@material-ui/core/Container";


const AddVolunteer = props => {
    const classes = formStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [language, setLanguage] = useState("");
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
           language
       }).then(() => props.onAdd())
           .catch(error => console.log(error));
       console.log("user added");
    };

    const form = (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form className={classes.root} autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={first}
                                onChange={event => setFirst(event.target.value)}
                                name="firstName"
                                variant="outlined"
                                required
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={last}
                                onChange={event => setLast(event.target.value)}
                                variant="outlined"
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                required
                                id="password"
                                label="Password"
                                name="password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel required >Role</InputLabel>
                            <Select
                                native
                                value={role}
                                onChange={event => setRole(event.target.value) }
                                label="Role"
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
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                color="primary"
                                variant="outlined"
                                label="Second Language"
                                fullWidth
                                value={language}
                                onChange={event => setLanguage(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Add Volunteer
                </Button>
            </form>
        </Container>
    );

    return form;
};

const mapStateToProps = state => {
    return{
        roleList: state.lists.roleList
    };
};

export default connect(mapStateToProps)(AddVolunteer);
