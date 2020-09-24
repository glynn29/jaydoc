import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../components/UI/Table/Table";
import AreYouSure from "../AreYouSure/AreYouSure";
import TransitionModal from "../../../../components/UI/Modal/Modal";
import * as actions from "../../../../store/actions";
import {firestore} from "../../../../firebase";

const headCells = [
    { id: 'position', label: 'Position' },
    { id: 'volunteer', label: 'Volunteer'},
];

const SignUp = (props) => {
    const {positions, name, email} = props;
    const eventName = props.formData.name;
    const startTime = props.formData.start;
    const endTime = props.formData.end;
    const date = props.formData.date;
    const tableData = props.formData.positions;

    const [filteredTableData, setFilteredTableData] = useState([]);
    const [formData, setFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [alreadyInEvent, setAlreadyInEvent] = useState(false);
    const [position, setPosition] = useState();

    useEffect(()=> {
        let filteredTableData = [];
        props.formData.positions.map((row, index) => {
            for(let i = 0; i < positions.length; i++){
                if(positions[i] === row.position){
                    filteredTableData.push({...row, index, name});
                    if (row.volunteer === name){
                        setAlreadyInEvent(true);
                        setPosition(row.position);
                    }
                }
            }
        });
        setFilteredTableData(filteredTableData);
    },[]);

    if(confirm){
        return(
            <Redirect to={"/confirm"}/>
        );
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (props) => {
        console.log(props);
        setFormData({position: props.position, name, eventName, startTime, endTime, date, index: props.index});
        setModalOpen(true);
    };

    function submitHandler({index, position, date}) {
        handleModalClose();
        props.onConfirm(formData);
        let newTableData = tableData;
        const newRow = newTableData[index];
        newTableData[index] = {...newRow, volunteer: name, email};

        firestore.collection('scheduledEvents').doc(props.formData.id)
            .set({
                positions: newTableData
            },{merge: true})
            .catch(error => console.log(error));

        firestore.collection('users').doc(props.userDocId).collection('volunteerEvents')
            .add({
                eventId: props.formData.id,
                eventName,
                position: position,
                startTime,
                endTime,
                date: date,
                id: props.userId,
                role: props.role,
                name
            })
            .catch(error => console.log(error));
        setConfirm(true);
    }

    function cancelHandler() {
        handleModalClose();
    }

    const formattedStart = new Date(date + "T" + startTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedEnd = new Date(date + "T" + endTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const formattedDate = new Date(date).toDateString();

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>{eventName} From {formattedStart} to {formattedEnd} on {formattedDate}</p>
            { !alreadyInEvent ? <EnhancedTable data={filteredTableData} headCells={headCells} signUp={handleModalOpen}/> : <p>Already signed up for this event as {position}</p>}
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<AreYouSure formData={formData} submit={submitHandler} cancel={cancelHandler} />}
                title={"Are You Sure?"}
            />
        </Container>
    )
};

const mapStateToProps = state => {
    return{
        role: state.auth.role,
        email: state.auth.email,
        positions: state.auth.positions,
        userId: state.auth.userId,
        name: state.auth.name,
        events: state.auth.events,
        userDocId: state.auth.userDocId
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onConfirm: (data) => dispatch(actions.updateConfirmation(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
