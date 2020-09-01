import React, {useState} from "react";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditEventForm from "../../../components/UI/Forms/EditEvent/EditEvent";
import AddEventForm from "../../../components/UI/Forms/AddEvent/AddEvent";
import TransitionModal from "../../../components/UI/Modal/Modal";

function createData(name, sponsor, id) {
    return { name, sponsor, id };
}

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

let rows = [
    createData('Womens health nightttt', "foo1", 6, ),
    createData('Womens health night2', "foo2", 62, ),
    createData('Womens health night3', "foo3", 36, ),
    createData('Womens health night4', "foo4", 632, ),
];



const formInfo = {name: "Ladies night", sponsor: "foo", id: 12 };

const EventList = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [formData, setFormData] = useState(formInfo);
    const [tableData, setTableData] = useState(rows);

    function addEvent() {
        alert("Event added")
    }

    function detailsEvent(eventId) {
        alert("details Event id:" + eventId)
    }

    function deleteEvent(eventId) {
        const newList = rows.filter(event => event.id !== eventId);
        setTableData(newList);
    }

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const toggleEdit = (eventId) => {
        setFormData({...formData, id: eventId});
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
        <div>
            <p>Event page</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                rowLables={rowLabels}
                delete={deleteEvent}
                add={toggleAdd}
                edit={toggleEdit}
                details={detailsEvent}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditEventForm formData={formData}/>}
                title={"Edit Event"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddEventForm onAdd={addEvent}/>}
                title={"Add Event"}
            />
        </div>
    );
};

export default EventList;
