import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useStyles from "../Styles/formStyle";
import * as classes from './Modal.module.css'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const TransitionModal = (props) => {
    const formStyles = useStyles();


    return (
        <div >
            <Container>
            <Modal
                //className={classes.Box}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={formStyles.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={formStyles.modalPaper}>
                        <Grid container spacing={2} direction={"column"} alignItems={"center"}>
                        <h2>{props.title}</h2>
                        <p>blah blah blah</p>
                        {props.form}
                        </Grid>
                    </div>
                </Fade>
            </Modal>
            </Container>
        </div>
    );
};

export default TransitionModal;
