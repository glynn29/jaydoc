import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DateAndTimePickers(props) {
    const classes = useStyles();

    return (
        <TextField
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};
