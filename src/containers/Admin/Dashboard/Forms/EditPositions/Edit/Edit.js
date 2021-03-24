import React, {useEffect, useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


import {firestore} from "../../../../../../firebase";
import TransitionModal from "../../../../../../components/UI/Modal/Modal";
import formStyles from "../../../../../../components/UI/Styles/formStyle";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Edit = props => {
    const classes = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [roles, setRoles] = useState([...props.formData.positions]);
    const roleList = props.roleList;

    const submitFormHandler = (event) =>{
        event.preventDefault();
        // firestore.collection('events').add({
        //     name,
        //     positions: positionList
        // }).then(()=>{props.onAdd();})
        //     .catch(error => {console.log(error)});
        // console.log("event ADDED");
        props.onEdit({roles, name});
    };


    return (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                value={name}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Position Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <AutoComplete
                                onChange={(event,value) => {setRoles(value)}}
                                multiple
                                options={roleList}
                                value={roles}
                                limitTags={2}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} key={params} variant="outlined" label="Roles" placeholder="Roles" />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={classes.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Edit;


