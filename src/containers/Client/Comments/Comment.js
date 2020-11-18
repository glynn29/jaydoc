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
import pdf from '../../../assests/documents/Mandatory Reporting Protocol Jaydoc Free Clinic.pdf';

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

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Mandatory Reporting</Typography>
            <Typography variant="body1">You have reached our mandatory reporting portal. Please <a href={pdf} target="_blank" rel="noopener noreferrer">click here</a> to review the mandatory reporting protocol. We thank you for following JayDoc protocol and taking the time to submit your concerns. We are not simply here to reprimand – our goal is for JayDoc to continue to serve as a safe, respectful place for all our volunteers.  This messaging system is anonymous. There will be no connection of your name or email to this report. However, we would appreciate it if you would at least provide the subgroup that you are a part of in clinic (i.e. administrative intern, community resource intern, lab sciences volunteer, interpreter, student physician, pharmacy student, resident, or attending physician, etc.). We also ask that you provide either the other individuals names or subgroups who were involved in the incident at hand. Please use the space below to explain, in the best detail you can provide, what took place in clinic. Thank you for making JayDoc a better place!  - The MR Team</Typography>
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
};

export default Comment;


