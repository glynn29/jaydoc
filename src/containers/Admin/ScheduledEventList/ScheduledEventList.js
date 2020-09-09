import React, {useEffect, useState} from "react";

import AddScheduledEvent from "./Forms/AddScheduledEvent/AddScheduledEvent";
import EditScheduledEvent from "./Forms/EditScheduledEvent/EditScheduledEvent";
import TransitionModal from "../../../components/UI/Modal/Modal";
import EnhancedTable from "../../../components/UI/Table/Table";
import Container from "@material-ui/core/Container";

import DateTimePicker from "../../../components/UI/DateTimePicker/DateTimePicker";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'nameName', label: 'Event Name' },
    { id: 'start', label: 'Start' },
    { id: 'end',  label: 'End' },
];

const rowLabels = [
    { id: 'eventName' },
    { id: 'start' },
    { id: 'end',   }
];

const ScheduledEventList = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('scheduledEvents').get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setTableData(events);
    }

    useEffect( () => {
        getEvents().catch(error => {console.log(error)});
    },[]);

    function addEvent() {
        handleAddClose();
        getEvents().catch(error => {console.log(error)});
    }

    function editEvent() {
        handleEditClose();
        getEvents().catch(error => {console.log(error)});
    }

    function deleteEvent(eventId) {
        firestore.collection('scheduledEvents').doc(eventId).delete()
            .then(()=>{
                const newList = tableData.filter(event => event.id !== eventId);
                setTableData(newList);
            })
            .catch(error => {console.log(error)});
        console.log("event removed");
    }

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const toggleEdit = ({eventName, start, id, end, notes}) => {
        setFormData({eventName, start, id, end, notes});
        setEditOpen(!editOpen);
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const toggleAdd = () => {
        setAddOpen(!addOpen);
    };
    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>Event page</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                rowLables={rowLabels}
                delete={deleteEvent}
                add={toggleAdd}
                edit={(row) => toggleEdit(row)}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditScheduledEvent formData={formData} onEdit={editEvent} />}
                title={"Edit Scheduled Event"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddScheduledEvent onAdd={addEvent} />}
                title={"Schedule Event"}
            />
        </Container>
    );
};

export default ScheduledEventList;
