import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import formStyles from "../../../../../components/UI/Styles/formStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {firestore} from "../../../../../firebase";
import AddPositions from "./AddPositions";
import TransitionModal from "../../../../../components/UI/Modal/Modal";

const AddEvent = props => {
    const classes = formStyles();
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [details, setDetails] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [positions, setPositions] = useState([]);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        firestore.collection('events').add({
            name,
            sponsor,
            details,
            positions
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

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    function submitHandler(positionsForm) {
        handleModalClose();
        setPositions(positionsForm);
        console.table(positionsForm);
    }

    function cancelHandler() {
        handleModalClose();
    }

    const form = (
        <div>
            <CssBaseline />
            <form className={classes.root} autoComplete="off" onSubmit={submitFormHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
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
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
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
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={details}
                                onChange={event => setDetails(event.target.value)}
                                id="outlined-textarea"
                                label="Message"
                                placeholder="Keep up the good work"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={toggleModal}
                            fullWidth
                            variant="contained"
                            color="primary"
                            >
                            Add Positions
                        </Button>
                    </Grid>
                    <Grid item>
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
                form={<AddPositions submit={submitHandler} cancel={cancelHandler} />}
                title={"Add Positions"}
            />
        </div>
    );

    return form;
};

export default AddEvent;

