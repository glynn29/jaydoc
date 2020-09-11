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


const EditVolunteer = props => {
    const formClasses = formStyles();
    const [first, setFirst] = useState(props.formData.first);
    const [last, setLast] = useState(props.formData.last);
    const [approved, setApproved] = useState(true);
    const [role, setRole] = useState(props.formData.role);
    const [spanish, setSpanish] = useState(false);
    const list = props.roleList;

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('users').doc(props.formData.id).set({
            first: first,
            last: last,
            approved: approved,
            spanish: spanish,
        }, {merge: true})
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    const form = (
        <div>
            <CssBaseline />
            <h1>{"Id is: " + props.formData.id}</h1>
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
                        />
                    </Grid>
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
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={formClasses.formControl} >
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
                    <Grid item>
                        <FormControlLabel
                            checked={spanish}
                            value={spanish}
                            onChange={event => setSpanish(!spanish)}
                            control={<Checkbox value={spanish} color="primary" />}
                            label="Speak Spanish"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
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
                    className={formClasses.submit}
                >
                    Edit User
                </Button>
            </form>
        </div>
    );

    return form;
};

const mapStateToProps = state => {
    return{
        roleList: state.lists.roleList
    };
};

export default connect(mapStateToProps)(EditVolunteer);
