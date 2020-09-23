import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Dashboard = () => {
    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Admin Dashboard Page</Typography>
        </Container>
    );
};

export default Dashboard;
