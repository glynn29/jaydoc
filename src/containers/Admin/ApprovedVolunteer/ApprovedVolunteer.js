import React, {useState, useEffect} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditVolunteerForm from "./Forms/EditVolunteer/EditVolunteer";
import AddVolunteer from "./Forms/AddVolunteer/AddVolunteer";
import TransitionModal from "../../../components/UI/Modal/Modal";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'first' , label: 'First Name' },
    { id: 'last' , label: 'Last Name' },
    { id: 'role' , label: 'Role' },
    { id: 'approved', label: 'Approved'},
    { id: 'spanish', label: 'Spanish'},
];

const ApprovedVolunteer = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);

    async function getVolunteers(){
        let volunteers = [];
        const volunteerRef = await firestore.collection('users').get();
        volunteerRef.forEach((user) => {
            volunteers.push(user.data());
        });
        setTableData(volunteers)
    }

    useEffect(() => {
        getVolunteers().catch(error => console.log(error));
    },[]);

    function addVolunteer() {
        handleAddClose();
        getVolunteers().catch(error => console.log(error));
    }

    function editVolunteer() {
        handleEditClose();
        getVolunteers().catch(error => console.log(error));
    }

    function deleteVolunteer(userId) {
        firestore.collection('users').doc(userId).delete()
            .then(() => {
                const newList = tableData.filter(user => user.id !== userId);
                setTableData(newList);
            })
            .catch(error => console.log(error));
        console.log("user removed");
    }

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const toggleEdit = ({first, last, role, approved, spanish, id}) => {
        setFormData({first, last, role, approved, spanish, id});
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
            <p>Approved Volunteers page</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                delete={deleteVolunteer}
                add={toggleAdd}
                edit={(row) => toggleEdit(row)}
            />
            <TransitionModal
                open={editOpen}
                handleOpen={handleEditOpen}
                handleClose={handleEditClose}
                form={<EditVolunteerForm formData={formData} onEdit={editVolunteer}/>}
                title={"Edit Approved Volunteer"}
            />
            <TransitionModal
                open={addOpen}
                handleOpen={handleAddOpen}
                handleClose={handleAddClose}
                form={<AddVolunteer onAdd={addVolunteer}/>}
                title={"Add Approved Volunteer"}
            />
        </Container>
    );
};

export default ApprovedVolunteer;
