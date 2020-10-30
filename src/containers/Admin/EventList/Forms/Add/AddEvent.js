import React, {useEffect, useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";
import Positions from "../Positions/Positions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";

const AddEvent = props => {
    const classes = formStyles();
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [details, setDetails] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [positionList, setPositionList] = useState([]);

    useEffect(() => {
        const updatedPositionList = [];
        props.positionList.map(position => {
            updatedPositionList.push({name: position, count: "0"});
        });
        setPositionList(updatedPositionList);
    },[]);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('events').add({
            name,
            sponsor,
            details,
            positions: positionList
        }).then(()=>{props.onAdd();})
            .catch(error => {console.log(error)});
        console.log("event ADDED");
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    function submitHandler(positionsForm) {
        handleModalClose();
        setPositionList(positionsForm);
    }

    const form = (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                value={name}
                                onChange={event => setName(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Event Name"
                                autoFocus
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                        <TextField
                            value={sponsor}
                                onChange={event => setSponsor(event.target.value)}
                                variant="outlined"
                                fullWidth
                                id="sponsor"
                                label="Sponsor"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="outlined-textarea"
                                label="Event Details"
                                multiline
                                variant="outlined"
                                fullWidth
                                rows={8}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleModalOpen}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            >
                            Add Positions
                        </Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button
                            onClick={props.handleClose}
                            fullWidth
                            className={classes.cancelButton}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<Positions submit={submitHandler} cancel={handleModalClose} positionList={positionList} button={"Add Positions"}/>}
                title={"Add Positions"}
            />
        </Container>
    );

    return form;
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList
    };
};

export default connect(mapStateToProps)(AddEvent);


