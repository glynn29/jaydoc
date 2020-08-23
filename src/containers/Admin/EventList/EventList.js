import React, {useState} from "react";
import EnhancedTable from "../../../components/UI/Table/Table";
import EditEventForm from "../../../components/UI/Button/EditEvent/EditEvent";
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

function deleteEvent(eventId) {
    alert("removed id : " + eventId)
}

function addEvent() {
    alert("Event added")
}

function detailsEvent(eventId) {
    alert("details Event id:" + eventId)
}

const formInfo = {name: "Ladies night", sponsor: "foo", id: 12 };

const EventList = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(formInfo);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const toggleEdit = (eventId) => {
        setFormData({...formData, id: eventId});
        setOpen(!open);

    };

    return (
        <div>
            <p>Event page</p>
            <EnhancedTable
                data={rows}
                headCells={headCells}
                rowLables={rowLabels}
                delete={deleteEvent}
                add={addEvent}
                edit={toggleEdit}
                details={detailsEvent}
            />
            <TransitionModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                form={<EditEventForm formData={formData}/>}
                title={"Edit Event"}
            />
        </div>
    );
};

export default EventList;
