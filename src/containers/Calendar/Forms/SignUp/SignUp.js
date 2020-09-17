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
    const {positions, name, userId} = props;
    const [tableData, setTableData] = useState(props.formData.positions);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [formData, setFormData] = useState({});
    const [eventName, setEventName] = useState(props.formData.name);
    const [startTime, setStartTime] = useState(props.formData.start);
    const [endTime, setEndTime] = useState(props.formData.end);
    const [date, setDate] = useState(props.formData.date);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(null);

    useEffect(()=> {
        let filteredTableData = [];
        props.formData.positions.map((row, index) => {
            for(let i = 0; i < positions.length; i++){
                if(positions[i] === row.position){
                    filteredTableData.push({...row, index});
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

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const toggleModal = (props) => {
        console.log(props);
        setFormData({position: props.position, name, eventName, startTime, endTime, date, index: props.index});
        setModalOpen(!modalOpen);
    };

    function submitHandler({index, position, date}) {
        handleModalClose();
        props.onConfirm(formData);
        let newTableData = tableData;
        const newRow = newTableData[index];
        newTableData[index] = {...newRow, volunteer: name};

        firestore.collection('scheduledEvents').doc(props.formData.id).set({
            positions: newTableData
        }, {merge: true})
            .then(() => {
                let newEvents = props.events;
                newEvents.push({
                    eventId: props.formData.id,
                    position: position,
                    date: date
                });

                firestore.collection('users').doc(props.userDocId).set({
                    events: newEvents
                }, {merge: true})
                .catch();
        })
            .catch();
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
            <EnhancedTable
                data={filteredTableData}
                headCells={headCells}
                signUp={toggleModal}
            />
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
