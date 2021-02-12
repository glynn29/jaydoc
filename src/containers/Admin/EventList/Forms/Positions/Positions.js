import React, { useState} from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

const Positions = props => {
    const classes = formStyles();
    const [positionList, setPositionList] = useState(props.positionList);

    const submitHandler = (event) => {
        event.preventDefault();
        props.submit(positionList);
    };

    const onChangeHandler = (event, position ,index) => {
        const count = event.target.value;

        let newPositions = [...positionList];

        if(count >= 0 && count >= newPositions[index].minimum)
            newPositions[index] = {...positionList[index], name: position.name, count: count};

        setPositionList(newPositions);
    };

    return(
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitHandler}>
                <Grid container spacing={2} >
                {positionList.map((position, index) => {
                    return(
                        <Grid key={index} item sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    onChange={(event) => onChangeHandler(event, position,index)}
                                    value={positionList[index].count}
                                    type="number"
                                    label={position.name}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </FormControl>
                        </Grid>
                    );
                })}
                    <Grid item sm={6}>
                        <Button onClick={props.cancel} fullWidth className={classes.cancelButton} variant="outlined">Cancel</Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button type="submit" fullWidth color="primary" variant="contained">{props.button}</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Positions;
