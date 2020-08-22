import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

import * as classes from './Comment.module.css';
import formStyles from "../../../components/UI/Styles/formStyle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Comment = () => {
    const formClasses = formStyles();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const form = (
        <div className={classes.Box}>
            <h1><Typography variant="h3">Comments</Typography></h1>
            <p><Typography variant="body1">We appreciate everything our volunteers do to make the clinic function. If there's something that you'd like to pass along to us in private, please do it below. We appreciate the feedback - constructive, of course. If you're having technical difficulty with the site or with your account please use the 'Contact' tab to report it.</Typography></p>
            {/*<Container component="main" maxWidth="xs">*/}

                <CssBaseline />

                    <form className={formClasses.root} noValidate autoComplete="off">
                        <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>

                        <FormControl variant="outlined" className={formStyles.formControl}>
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
                        /></FormControl>

                        <FormControl variant="outlined" className={formStyles.formControl}>
                        <TextField
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            id="outlined-textarea"
                            label="Message"
                            placeholder="Keep up the good work"
                            multiline
                            variant="outlined"
                            fullWidth
                            required
                            rows={15}
                            inputProps={{ className: formClasses.textarea }}
                        /></FormControl></Grid>
                    </form>

            {/*</Container>*/}
        </div>
    );

    return form;
};

export default Comment;


