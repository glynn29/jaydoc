import React, {useState, useEffect} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
//import * as classes from './Register.module.css';
import formStyles from "../../../components/UI/Styles/formStyle";

const list2 = [
    "M1",
    "M2",
    "M3",
    "M4"
];

const list = [
    {name:"M1"},
    {name:"M2"},
    {name:"M3"},
    {name:"M4"},
];

const Register = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [status, setStatus] = useState(null);
    const [spanish, setSpanish] = useState(false);

    const classes = formStyles();

    // useEffect(() => {
    //
    // }, [list])

    const form = (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={first}
                                onChange={event => setFirst(event.target.value)}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={last}
                                onChange={event => setLast(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={passwordConfirm}
                                onChange={event => setPasswordConfirm(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Password Confirm"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid >
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
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
                                control={<Checkbox value="spanish" color="primary" />}
                                label="Speak Spanish"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>


    );

    return form;
}

export default Register;
