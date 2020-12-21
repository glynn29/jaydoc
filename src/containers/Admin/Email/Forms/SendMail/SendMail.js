import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import useStyles from "../../../../../components/UI/Styles/formStyle";
import EnhancedTable from "../../../../../components/UI/Table/Table";


const headCells = [
    { id: 'email',  label: 'Email' },
];

const SendMail = props => {
    const classes = useStyles();
    let {formData} = props;

    const tableData = [];
    formData.forEach(row => {
        tableData.push({"email": row});
    });
    return(
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={2}  >
                <EnhancedTable
                    data={tableData}
                    headCells={headCells}
                />
                <Grid item xs={6} sm={6}>
                    <Button
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={props.cancel}
                        fullWidth
                    >Cancel</Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => props.submit(formData)}
                            fullWidth
                    >
                        Send Mail
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default SendMail;
