import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import EnhancedTable from "../../../../../components/UI/Table/Table";
import {firestore} from "../../../../../firebase";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import User from "../User/User";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import formStyles from "../../../../../components/UI/Styles/formStyle";

const Positions = props => {
    const classes = formStyles();
    const [volunteers, setVolunteers] = useState([]);
    const [positions, setPositions] = useState(props.positions);
    const [signedUpUsers, setSignedUpUsers] = useState(props.signedUpUsers);
    const [positionIndex, setPositionIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    async function getVolunteers(){
        console.log("Got Volunteers");
        let volunteers = [];
        const volunteerRef = await firestore.collection('users').get();
        volunteerRef.forEach((user) => {
            volunteers.push({...user.data(), userDocId: user.id});
        });
        setVolunteers(volunteers);
    }

    useEffect(() => {
        getVolunteers()
            .catch(error => console.log(error));
    },[]);

    const setVolunteer = (props) => {
        setPositionIndex(props.index);
        handleModalOpen();
        console.log(props);
    };

    const removeVolunteer = (props) => {
        let list = [...positions];
        list[props.index] = {position: props.position};
        setPositions(list);

        let userList = [...signedUpUsers];
        userList[props.index] = undefined;
        setSignedUpUsers(userList);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const onSelectHandler = (props) => {
        console.log(props, positionIndex);
        let list = [...positions];
        list[positionIndex] = {...list[positionIndex], volunteer: props.first + " " + props.last, email: props.email, language: props.language};
        setPositions(list);

        const position = list[positionIndex].position;
        let userList = [...signedUpUsers];
        userList[positionIndex] = {...props, position};
        setSignedUpUsers(userList);
        handleModalClose();
    };

    return (
        <Container component="main" maxWidth="sm" style={{textAlign: 'center'}}>
            <Grid container spacing={2}>
                <EnhancedTable
                    data={positions}
                    headCells={props.headCells}
                    set={setVolunteer}
                    remove={removeVolunteer}
                    noPagination
                />
                <Grid item xs={6}>
                    <Button
                        onClick={props.cancel}
                        fullWidth
                        className={classes.cancelButton}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={() => props.submit(positions, signedUpUsers)}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Save Positions
                    </Button>
                </Grid>
                <TransitionModal
                    open={modalOpen}
                    handleOpen={handleModalOpen}
                    handleClose={handleModalClose}
                    form={<User cancel={handleModalClose} volunteers={volunteers} select={onSelectHandler}/>}
                    title={"Add Users"}
                />
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return{
        positionList: state.lists.positionList
    };
};

export default connect(mapStateToProps)(Positions);

