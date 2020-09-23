import React from "react";
import {AddAdmin} from '../../../CloudFunctions/addAdmin';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Report = () => {
    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Reports Page</Typography>
            <AddAdmin/>
        </Container>
    );
};

export default Report;
