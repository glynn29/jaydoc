import React, {useState} from "react";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {firestore} from "../../../../firebase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ChangeRole = (props) => {
    const classes = formStyles();
    const [role, setRole] = useState("");
    const [positions, setPositions] = useState([]);
    const [otherRole, setOtherRole] = useState("");
    const [response, setResponse] = useState(null);
    const list = props.roleList;

    const onSelectHandler = (event) => {
        setRole(event.target.value);
        list.filter(e => e.name === event.target.value).map(row => setPositions(row.positions));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const tempRole = (role === "Other") ? otherRole.trim().charAt(0).toUpperCase() + otherRole.trim().slice(1) : role;

        const formData = {
            role: tempRole,
            positions: positions,
        };

        firestore.collection("users").doc(props.userId).update(formData)
            .then(() => {
                setResponse("Role changed successfully.");
            })
            .catch(error => setResponse(error))
            .finally(() => {
                setInterval(clearResponse, 5000);
        });
    };

    const clearResponse = () => {
        setResponse(null);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <Grid container spacing={1} style={{alignItems: 'center'}}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} required>
                            <InputLabel>Role</InputLabel>
                            <Select
                                MenuProps={MenuProps}
                                value={role}
                                onChange={onSelectHandler}
                                label="Role"
                            >
                                <MenuItem aria-label="None" value="" />
                                {list.map( listItem => {
                                    return (
                                        <MenuItem key={listItem.name} value={listItem.name}>{listItem.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    {role === "Other" &&
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <TextField
                                value={otherRole}
                                onChange={event => setOtherRole(event.target.value)}
                                label="Enter Role"
                                variant="outlined"
                                required
                                fullWidth
                                id="otherRole"
                            />
                        </FormControl>
                    </Grid>}
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Change Role
                        </Button>
                    </Grid>
                    { response && <Grid item xs={12}>
                        {response}
                    </Grid>}
                </Grid>
            </form>
        </div>
    )
};

export default ChangeRole;
