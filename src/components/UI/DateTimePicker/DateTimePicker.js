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
        width: '100%',
    },
}));

export const CustomDatePicker = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TextField
                variant="outlined"
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                id={props.label}
                label={props.label}
                type="date"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};


export const CustomTimePicker = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TextField
                variant="outlined"
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                id={props.label}
                label={props.label}
                type="time"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};


export default function DateAndTimePickers(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TextField
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                id={props.label}
                label={props.label}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};
