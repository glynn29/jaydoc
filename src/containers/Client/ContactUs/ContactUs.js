import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import formStyles from "../../../components/UI/Styles/formStyle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../firebase";
import {connect} from "react-redux";

const ContactUs = (props) => {
    const classes = formStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);

    useEffect(function () {
        if(props.email)
            setEmail(props.email);
        if(props.name)
            setName(props.name);
    }, [props.email, props.name]);

    const list = [
        "Technical Issue",
        "Registration / Membership Issue",
        "General Issue"
    ];

    const submitHandler = (event) =>{
        event.preventDefault();
        firestore.collection('contact').add({
            name,
            email,
            category,
            message
        }).then(function () {
            setResponse("Message sent");
        }).catch(function (error) {
            setResponse(error.message);
        });
    };

    const form = (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <br /> <br />
            <Typography>If you are having technical difficulty with the website, or if you have a general question about JayDoc Free Clinic, please use the following form.</Typography>
            <br />
            <form autoComplete="off" onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={name}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl variant="outlined" className={classes.formControl} required>
                            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                            <Select
                                native
                                value={category}
                                onChange={event => setCategory(event.target.value) }
                                label="Category"
                                inputProps={{
                                    name: 'category',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="Select a category" value="" />
                                {list.map( listItem => {
                                    return (
                                        <option key={listItem} value={listItem}>{listItem}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                autoFocus
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                id="outlined-textarea"
                                label="Message"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {response}
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return form;
};

const mapStateToProps = state => {
    return{
        email: state.auth.email,
        name: state.auth.name
    };
};

export default connect(mapStateToProps)(ContactUs);

