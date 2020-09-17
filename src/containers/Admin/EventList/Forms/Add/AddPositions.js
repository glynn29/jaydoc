import React, {useState} from "react";
import {connect} from "react-redux";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

const AddPositions = props => {
    const classes = formStyles();
    const [positions, setPositions] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();
        props.submit(positions);
    };

    const onChangeHandler = (event, position) => {
        const count = event.target.value;
        const newPos = {name: position, count};
        let newPositions = positions.filter(pos => {
            return pos.name !== position
        });

        if(count > 0)
            newPositions.push(newPos);

        setPositions(newPositions);
    };

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center', margin: 'auto'}}>
            <CssBaseline />
            <form className={classes.root} autoComplete="off" onSubmit={submitHandler}>
                <Grid container spacing={1} direction={"row"} alignItems={"stretch"}>
                {props.positionList.map(position => {
                    return(
                        <Grid key={position} item sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    onChange={(event) => onChangeHandler(event, position)}
                                    type="number"
                                    key={position}
                                    label={position}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                    );
                })}
                    <Grid item sm={6}>
                        <Button type="submit" fullWidth className={classes.detailsButton}>Add Positions</Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button onClick={props.cancel} fullWidth className={classes.deleteButton}>Cancel</Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList
    };
};

export default connect(mapStateToProps)(AddPositions);
