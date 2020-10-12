import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import formStyles from "../../../components/UI/Styles/formStyle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../firebase";

const Comment = () => {
    const classes = formStyles();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);

    const submitHandler = (event) =>{
        event.preventDefault();
        firestore.collection('comments').add({
            subject,
            message
        }).then(function () {
            setResponse("Message sent");
        }).catch(function (error) {
            setResponse(error.message);
        });
    };

    const form = (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Comments</Typography>
            <Typography variant="body1">We appreciate everything our volunteers do to make the clinic function. If there's something that you'd like to pass along to us in private, please do it below. We appreciate the feedback - constructive, of course. If you're having technical difficulty with the site or with your account please use the 'Contact' tab to report it.</Typography>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={subject}
                                onChange={event => setSubject(event.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="subject"
                                label="Subject"
                                name="subject"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
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
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return form;
};

export default Comment;


