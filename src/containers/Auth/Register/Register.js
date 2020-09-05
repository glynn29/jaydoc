import React, {useState} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import formStyles from "../../../components/UI/Styles/formStyle";
import * as actions from "../../../store/actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Register = (props) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [role, setRole] = useState("");
    const [spanish, setSpanish] = useState(false);
    const list = props.roleList;
    const classes = formStyles();

    const submitHandler = (event) =>{
        event.preventDefault();
        const formData = {
            first: first,
            last: last,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            role: role,
            spanish: spanish
        };
        props.onRegister(formData);
    };

    if(props.isRegistered){
         return <Redirect to={"/login"}/>
    }

    const form = (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={submitHandler}>
                    {props.error}
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
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    MenuProps={MenuProps}
                                    value={role}
                                    onChange={event => setRole(event.target.value) }
                                    label="Role"
                                    inputProps={{
                                        name: 'role',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {list.map( listItem => {
                                        return (
                                            <MenuItem key={listItem} value={listItem}>{listItem}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center" >
                            <FormControlLabel
                                style={{alignItems: 'center',}}
                                className={classes.formControl}
                                checked={spanish}
                                value={spanish}
                                onChange={event => setSpanish(!spanish)}
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

    return props.loading ? <Spinner/> : form;
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isRegistered: state.auth.registered,
        roleList: state.lists.roleList
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onRegister: (registerData) => dispatch(actions.register(registerData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
