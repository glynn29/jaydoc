import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useStyles from "../../../../../components/UI/Styles/formStyle";
import Grid from "@material-ui/core/Grid";
import EnhancedTable from "../../../../../components/UI/Table/Table";

const headCells = [
    { id: 'position',  label: 'Position' },
    { id: 'volunteer', label: 'Volunteer'}
];

const DetailsEvent = props => {
    const classes = useStyles();
    const formData = props.formData;

    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={1}>
                <EnhancedTable
                    data={formData.positions}
                    headCells={headCells}
                />
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.close}
                        fullWidth
                    >Close</Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default DetailsEvent;
