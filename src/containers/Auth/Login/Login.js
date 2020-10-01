import React, {useState, useContext} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import formStyles from "../../../components/UI/Styles/formStyle";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from '../../../store/actions/index'
import {AuthContext} from "../../../containers/Auth/Auth";

const Login = (props) => {
    const {currentUser} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = formStyles();

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onLogin(email, password);
    };

    if (currentUser){
        return <Redirect to={"/"}/>;
    }

    if (props.loading){
        return <Spinner/>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (email, password) => dispatch(actions.login(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
