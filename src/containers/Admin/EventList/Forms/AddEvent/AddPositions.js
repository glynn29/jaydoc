import React from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const AddPositions = props => {

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography component="h1" variant="h5">
                Add Positions
            </Typography>
            <form>
                {props.positions.map(position => {
                    return(
                        <div>{position} : <TextField type="number"></TextField></div>
                    );
                })}
            </form>
        </Container>
    );
};

export default AddPositions;
