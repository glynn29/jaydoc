import React, {useState} from "react";
import TransitionModal from "../../Modal/Modal";

import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import * as classes from './EditEvent.module.css'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const list = [
    {name:"M1"},
    {name:"M2"},
    {name:"M3"},
    {name:"M4"},
];

const EditEvent= props => {
    const formClasses = formStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [details, setDetails] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitFormHandler = () =>{
            alert(name + " " + sponsor + " " + details);
    };

    const form = (
        <div>
        <CssBaseline />
        <form className={formClasses.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                <Grid item>
                    <TextField
                        value={name}
                        onChange={event => setName(event.target.value)}
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Event Name"
                        autoFocus
                    />
                </Grid>
                <Grid item>
                    <TextField
                        value={sponsor}
                        onChange={event => setSponsor(event.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        id="sponsor"
                        label="Sponsor"
                        name="sponsor"
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={formStyles.formControl}>
                        <TextField
                            value={details}
                            onChange={event => setDetails(event.target.value)}
                            id="outlined-textarea"
                            label="Message"
                            placeholder="Keep up the good work"
                            multiline
                            variant="outlined"
                            fullWidth
                            required
                            rows={10}
                            inputProps={{ className: formClasses.textarea }}
                        /></FormControl>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={formStyles.submit}
            >
                Edit Event
            </Button>
        </form>
        </div>
    );

    return(
      <div>
          <Button variant="contained" color="secondary" type="button" onClick={handleOpen}>
              Edit
          </Button>
          <TransitionModal open={open} handleOpen={handleOpen} handleClose={handleClose} form={form} title={"Edit Event"}/>
      </div>
    );
};

export default EditEvent;
