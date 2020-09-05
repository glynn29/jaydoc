import React, {useEffect, useState} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditEventForm from "./Forms/EditEvent/EditEvent";
import AddEventForm from "./Forms/AddEvent/AddEvent";
import TransitionModal from "../../../components/UI/Modal/Modal";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'name', label: 'Event Name' },
    { id: 'sponsor', label: 'Sponsor' },
    { id: 'id',  label: 'ID' },
];

const rowLabels = [
    { id: 'name' },
    { id: 'sponsor' },
    { id: 'id',   }
];

const EventList = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('events').get();
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

    function detailsEvent(event) {
        console.log(event);
        alert(event.name + " " + event.details + " " +event.positions.map(position => position.name +  " "+ position.count ))
    }

    function deleteEvent(eventId) {
        firestore.collection('events').doc(eventId).delete()
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

    const toggleEdit = ({name, sponsor, id, details, positions}) => {
        setFormData({name, sponsor, id, details, positions});
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
                details={detailsEvent}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditEventForm formData={formData} onEdit={editEvent} />}
                title={"Edit Event"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddEventForm onAdd={addEvent} />}
                title={"Add Event"}
            />
        </Container>
    );
};

export default EventList;
