import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import useStyles from "../../../../../../components/UI/Styles/formStyle";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const Respond = (props) => {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const formData = props.formData;

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>To: {formData.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Email: {formData.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Subject: {formData.category}</Typography>
                </Grid>
                <Grid item xs={12}>
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
                            rows={8}
                            inputProps={{ className: classes.textarea }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        className={classes.detailsButton}
                        onClick={() => props.submit({name: formData.name, subject: formData.category, message: message, email: formData.email})}
                        fullWidth
                    >Respond</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Respond;
