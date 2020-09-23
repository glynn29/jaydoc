import React from 'react';

import TextField from '@material-ui/core/TextField';

export const CustomDatePicker = (props) => (
    <TextField
        fullWidth
        variant="outlined"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        id={props.label}
        label={props.label}
        type="date"
        InputLabelProps={{
            shrink: true,
        }}
    />
);

export const CustomTimePicker = (props) => (
    <TextField
        fullWidth
        variant="outlined"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        id={props.label}
        label={props.label}
        type="time"
        InputLabelProps={{
            shrink: true,
        }}
    />
);
