import React, {useState} from "react";
import {connect} from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {firestore} from "../../../../../firebase";
import Container from "@material-ui/core/Container";


const EditVolunteer = props => {
    const classes = formStyles();
    const [first, setFirst] = useState(props.formData.first);
    const [last, setLast] = useState(props.formData.last);
    const [approved, setApproved] = useState(props.formData.approved);
    const [role, setRole] = useState(props.formData.role);
    const [language, setLanguage] = useState(props.formData.language);
    const list = props.roleList;

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('users').doc(props.formData.userDocId).set({
            first: first,
            last: last,
            approved: `${approved}`,
            language,
        }, {merge: true})
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    const form = (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form className={classes.root} noValidate autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} >
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
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={last}
                                onChange={event => setLast(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required>Role</InputLabel>
                                <Select
                                    native
                                    value={role}
                                    onChange={event => setRole(event.target.value) }
                                    label="Role"
                                    inputProps={{
                                        name: 'role',
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
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                color="primary"
                                variant="outlined"
                                label="Second Language"
                                fullWidth
                                value={language}
                                onChange={event => setLanguage(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            className={classes.formControl}
                            checked={approved}
                            value={approved}
                            onChange={event => setApproved(!approved)}
                            control={<Checkbox value={approved} color="primary" />}
                            label="Approved"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                >
                    Edit User
                </Button>
            </form>
        </Container>
    );

    return form;
};

const mapStateToProps = state => {
    return{
        roleList: state.lists.roleList
    };
};

export default connect(mapStateToProps)(EditVolunteer);
