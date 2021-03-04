import React, {useEffect, useState} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditEventForm from "./Forms/EditEvent/EditEvent";
import AddEventForm from "./Forms/Add/AddEvent";
import TransitionModal from "../../../components/UI/Modal/Modal";
import {firestore} from "../../../firebase";
import Typography from "@material-ui/core/Typography";
import DeleteEvent from "./Forms/DeleteEvent/DeleteEvent";

const headCells = [
    { id: 'name', label: 'Event Name' },
    { id: 'sponsor', label: 'Sponsor' },
];

const EventList = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
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

    //add modal functions
    function addEvent() {
        handleAddClose();
        getEvents().catch(error => {console.log(error)});
    }

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function editEvent() {
        handleEditClose();
        getEvents().catch(error => {console.log(error)});
    }

    const handleEditOpen = ({name, sponsor, id, details, positions}) => {
        setFormData({name, sponsor, id, details, positions});
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    //delete modal functions
    function deleteEvent({id}) {
        firestore.collection('events').doc(id).delete()
            .then(()=>{
                const newList = tableData.filter(event => event.id !== id);
                setTableData(newList);
            })
            .catch(error => {console.log(error)});
        console.log("event removed");
        handleDeleteClose();
    }

    const handleDeleteOpen = (props) => {
        console.log(props);
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Event Page</Typography>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                delete={handleDeleteOpen}
                add={handleAddOpen}
                edit={handleEditOpen}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditEventForm formData={formData} onEdit={editEvent} handleClose={handleEditClose}/>}
                title={"Edit Event"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddEventForm onAdd={addEvent} handleClose={handleAddClose}/>}
                title={"Add Event"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteEvent formData={formData} submit={deleteEvent} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </Container>
    );
};

export default EventList;
