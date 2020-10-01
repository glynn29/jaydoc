import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import formStyles from "../../../components/UI/Styles/formStyle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ContactUs = () => {
    const classes = formStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const list = [
        "Technical Issue",
        "Registration / Membership Issue",
        "General Issue"
    ];

    const form = (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Contact Us</Typography>
            <Typography>If you are having technical difficulty with the website, or if you have a general question about JayDoc Free Clinic, please use the following form to submit your query:</Typography>
                <CssBaseline />
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
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
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple" required>Category</InputLabel>
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
                                    value={subject}
                                    onChange={event => setSubject(event.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="subject"
                                    label="Subject"
                                    name="subject"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl variant="outlined" className={classes.formControl}>
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
                                    inputProps={{ className: classes.textarea }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                SEND
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
    );

    return form;
};

export default ContactUs;


