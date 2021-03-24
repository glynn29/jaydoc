import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";

import AddScheduledEvent from "./Forms/AddScheduledEvent/AddScheduledEvent";
import EditScheduledEvent from "./Forms/EditScheduledEvent/EditScheduledEvent";
import DetailsEvent from "./Forms/DetailsEvent/DetailsEvent";
import DeleteScheduledEvent from "./Forms/DeleteScheduledEvent/DeleteScheduledEvent";
import TransitionModal from "../../../components/UI/Modal/Modal";
import EnhancedTable from "../../../components/UI/Table/Table";
import Container from "@material-ui/core/Container";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'name', label: 'Event Name' },
    { id: 'date', label: 'Date (Y-M-D)',},
    { id: 'start', label: 'Start Time', time: true },
    { id: 'end',  label: 'End Time', time: true }
];

const ScheduledEventList = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [eventList, setEventList] = useState([]);

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('events').get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setEventList(events);
    }

    useEffect( () => {
        getEvents().catch(error => {console.log(error)});
    },[]);

    async function getScheduledEvents() {
        let events = [];
        const eventsRef = await firestore.collection('scheduledEvents').orderBy("date","desc").get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setTableData(events);
    }

    useEffect( () => {
        getScheduledEvents().catch(error => {console.log(error)});
    },[]);

    //add modal functions
    function addEvent() {
        handleAddClose();
        getScheduledEvents().catch(error => {console.log(error)});
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
        getScheduledEvents().catch(error => {console.log(error)});
    }

    const handleEditOpen = (props) => {
        setFormData({...props});
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    //delete modal functions
    function deleteEvent({id}) {

        //also delete event from users scheduledEvents

        firestore.collection('scheduledEvents').doc(id).delete()
            .then(()=>{
                getScheduledEvents().catch(error => {console.log(error)});
            })
            .catch(error => {console.log(error)});
        console.log("event removed");
        handleDeleteClose();
    }

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    //details modal functions
    const handleDetailsOpen = (props) => {
        setFormData({...props});
        setDetailsOpen(true);
    };

    const handleDetailsClose = () => {
        setDetailsOpen(false);
    };

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Schedule Event Page</Typography>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                delete={handleDeleteOpen}
                add={handleAddOpen}
                edit={handleEditOpen}
                details={handleDetailsOpen}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditScheduledEvent formData={formData} onEdit={editEvent} eventList={eventList} handleClose={handleEditClose}/>}
                title={"Edit Scheduled Event"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddScheduledEvent onAdd={addEvent} eventList={eventList} handleClose={handleAddClose}/>}
                title={"Schedule Event"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteScheduledEvent formData={formData} submit={deleteEvent} cancel={handleDeleteClose}/>}
                title={"Are You Sure?"}
            />
            <TransitionModal
                open={detailsOpen}
                handleOpen={handleDetailsOpen}
                handleClose={handleDetailsClose}
                form={<DetailsEvent formData={formData} close={handleDetailsClose}/>}
                title={"Details"}
            />
        </Container>
    );
};

export default ScheduledEventList;
