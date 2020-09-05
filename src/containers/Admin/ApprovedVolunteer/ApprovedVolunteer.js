import React, {useState} from "react";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditVolunteerForm from "./Forms/EditVolunteer/EditVolunteer";
import AddVolunteer from "./Forms/AddVolunteer/AddVolunteer";
import TransitionModal from "../../../components/UI/Modal/Modal";
import Container from "@material-ui/core/Container";

function createData(first, last, role, active, login, id) {
    return { first, last, role, active, login, id };
}

let rows = [
    createData("john1", "cena1", "M1", "true", 54, 1 ),
    createData("john2", "cena2", "M3", "true", 542, 2 ),
    createData("john3", "cena3", "M2", "false", 514, 3 ),
    createData("john4", "cena4", "M4", "true", 534, 4 ),
    createData("john1", "cena1", "M1", "true", 54, 5 ),
    createData("john2", "cena2", "M3", "true", 542, 6 ),
    createData("john3", "cena3", "M2", "false", 514, 7 ),
    createData("john4", "cena4", "M4", "true", 534, 8 ),
];

const headCells = [
    { id: 'first' , label: 'First Name' },
    { id: 'last' , label: 'Last Name' },
    { id: 'role' , label: 'Role' },
    { id: 'active', label: 'Active'},
    { id: 'id', label: 'ID' },
];

const rowLabels = [
    { id: 'first'},
    { id: 'last'},
    { id: 'role'},
    { id: 'active'},
    { id: 'id'},
];

const formInfo = {first: "John", last: "cena", role: 'M1', active: 'true', id: 12 };

const ApprovedVolunteer = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [formData, setFormData] = useState(formInfo);
    const [tableData, setTableData] = useState(rows);

    function addVolunteer() {//added to AddVolunteer component below
        alert("Person added");
        const newVolunteer = createData("john", "cena", "M1", "true", 54, (Math.random().toFixed()) );
        const newTableData = [...tableData];
        newTableData.push(newVolunteer);
        setTableData(newTableData);
    }

    function deleteVolunteer(userId) {
        const newList = rows.filter(event => event.id !== userId);
        setTableData(newList);
        alert("removed id : " + userId)
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

    return (<Container component="main" maxWidth="md">
        <p>Approved Volunteers page</p>
        <EnhancedTable
            data={tableData}
            headCells={headCells}
            rowLables={rowLabels}
            delete={deleteVolunteer}
            add={toggleAdd}
            edit={toggleEdit}
        />
        <TransitionModal
            open={addOpen}
            handleOpen={handleAddOpen}
            handleClose={handleAddClose}
            form={<AddVolunteer onAdd={addVolunteer}/>}
            title={"Add Approved Volunteer"}
        />
        <TransitionModal
            open={editOpen}
            handleOpen={handleEditOpen}
            handleClose={handleEditClose}
            form={<EditVolunteerForm formData={formData}/>}
            title={"Edit Approved Volunteer"}/>
    </Container>);
};

export default ApprovedVolunteer;
