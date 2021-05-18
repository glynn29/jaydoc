import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


import {firestore} from "../../../../../../firebase";
import formStyles from "../../../../../../components/UI/Styles/formStyle";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormHelperText from "@material-ui/core/FormHelperText";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Edit = props => {
    const classes = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [positions, setPositions] = useState([...props.formData.positions]);
    const [hasError, setHasError] = useState(false);
    const positionList = props.positionList;
    const roles = props.roleList;

    const submitFormHandler = (event) =>{
        event.preventDefault();
        if (positions.length < 1){
            setHasError(true);
        }else {
            let newRoles = [...roles];
            newRoles[props.formData.index] = {name, positions};
            firestore.collection('roles').doc('roles').update({
                roles: newRoles
            }).catch(error => console.log(error));
            props.onEdit();
        }
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
                                label="Role Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <AutoComplete
                                onChange={(event,value) => {setPositions(value)}}
                                multiple
                                options={positionList}
                                value={positions}
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
                                    <TextField {...params} key={params} variant="outlined" label="Positions" placeholder="Positions" />
                                )}
                            />
                            {hasError && <FormHelperText style={{color:"red"}}>Please select one or more positions</FormHelperText>}
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
                            Edit Role
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Edit;


