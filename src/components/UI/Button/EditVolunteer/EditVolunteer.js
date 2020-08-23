import React, {useState} from "react";
import TransitionModal from "../../Modal/Modal";

import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const EditVolunteer = props => {
    const formClasses = formStyles();
    const [open, setOpen] = React.useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState(null);
    const [spanish, setSpanish] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitFormHandler = () =>{
        alert(first + " " + last + " " + email + " " + status + " active:" + active + " spanish:" + spanish);
    };

    const form = (
        <div>
            <CssBaseline />
            <form className={formClasses.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <TextField
                            value={first}
                            onChange={event => setFirst(event.target.value)}
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        /></Grid>
                    <Grid item>
                        <TextField
                            value={last}
                            onChange={event => setLast(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                        /></Grid>
                    <Grid item>
                        <TextField
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required fullWidth>Status</InputLabel>
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
                            control={<Checkbox value={spanish} color="primary" />}
                            label="Speak Spanish"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            checked={active}
                            value={active}
                            onChange={event => setActive(event.target.value)}
                            control={<Checkbox value={active} color="primary" />}
                            label="Active"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={formStyles.submit}
                >
                    Edit User
                </Button>
            </form>
        </div>
    );

    return(
        <div>
            <Button variant="contained" color="secondary" type="button" onClick={handleOpen}>
                Edit
            </Button>
            <TransitionModal open={open} handleOpen={handleOpen} handleClose={handleClose} form={form} title={"Edit Volunteer"}/>
        </div>
    );
};

export default EditVolunteer;
