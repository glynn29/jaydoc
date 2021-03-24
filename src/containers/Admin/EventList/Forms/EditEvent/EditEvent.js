import React, {useState, useEffect} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import Positions from "../Positions/Positions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";

const EditEvent= props => {
    const classes = formStyles();
    const [name, setName] = useState(props.formData.name);
    const [sponsor, setSponsor] = useState(props.formData.sponsor);
    const [details, setDetails] = useState(props.formData.details);
    const [modalOpen, setModalOpen] = useState(false);
    const [positionList, setPositionList] = useState([...props.formData.positions]);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('events').doc(props.formData.id).set({
            name: name,
            sponsor: sponsor,
            details: details,
            positions: positionList
        },{merge: true})
            .then(()=>{props.onEdit();})
            .catch(error => {console.log(error)});
        console.log("event Edited");
    };

    useEffect(() => {
        let positionListUpdate = [];
        positionList.forEach(position => {
            positionListUpdate.push({...position, minimum: "0"});
        });
        setPositionList(positionListUpdate);
    }, []);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    function submitHandler(positionsForm) {
        handleModalClose();
        setPositionList(positionsForm);
        console.table(positionsForm);
    }

    return (
        <Container component="main" maxWidth="sm" className={classes.Container}>
            <CssBaseline />
            <form autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={name}
                            onChange={event => setName(event.target.value)}
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Event Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={sponsor}
                            onChange={event => setSponsor(event.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="sponsor"
                            label="Sponsor"
                            name="sponsor"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="outlined-textarea"
                                label="Details"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={8}
                                inputProps={{ className: classes.textarea }}
                            /></FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleModalOpen}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                        >
                            Edit Positions
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
                            Edit Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<Positions submit={submitHandler} cancel={handleModalClose} positionList={positionList} button={"Edit Positions"}/>}
                title={"Edit Positions"}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList
    };
};

export default connect(mapStateToProps)(EditEvent);
