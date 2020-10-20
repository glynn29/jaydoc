import React, {useState} from "react";

import TextField from "@material-ui/core/TextField";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import formStyles from "../../../../../components/UI/Styles/formStyle";

const User = props => {
    const [volunteer, setVolunteer] = useState(null);
    const [error, setError] = useState(null);
    const classes = formStyles();

    const selectHandler = () => {
        if (!volunteer){
            setError("No volunteer Selected");
        }else{
            props.select(volunteer);
        }
    };

    return (
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <AutoComplete
                            onChange={(event,value) => {setError(null); setVolunteer(value)}}
                            options={props.volunteers.sort((a, b) => -b.first.charAt(0).localeCompare(a.first.charAt(0)))}
                            groupBy={(option) => option.first.charAt(0)}
                            getOptionLabel={(option) => (option.first + " " + option.last)}
                            renderInput={(params) => (
                                <TextField {...params} key={params} variant="outlined" label="Volunteer" placeholder="Volunteer" />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                </Grid>
                <Button onClick={selectHandler} fullWidth variant="contained" color="primary">Select</Button>
            </Grid>
        </Container>
    );
};

export default User;
