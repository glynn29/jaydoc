import React, {useState, useEffect} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../components/UI/Table/Table";
import EditVolunteerForm from "./Forms/EditVolunteer/EditVolunteer";
import AddVolunteer from "./Forms/AddVolunteer/AddVolunteer";
import TransitionModal from "../../../components/UI/Modal/Modal";
import {firestore} from "../../../firebase";
import {DeleteUser} from "../../../CloudFunctions/deleteUser"
import DeleteVolunteer from "./Forms/DeleteVolunteer/DeleteVolunteer";

const ApprovedVolunteer = (props) => {
    const {headCells} = props;
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState(props.tableData);

    useEffect(() => {
        setTableData(props.tableData);
    }, [props.tableData]);

    //add modal functions
    function addVolunteer() {
        handleAddClose();
        props.getVolunteers().catch(error => console.log(error));
    }

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    //edit modal functions
    function editVolunteer() {
        handleEditClose();
        props.getVolunteers().catch(error => console.log(error));
    }

    const handleEditOpen = ({first, last, role, approved, language, userDocId}) => {
        let approvedBool = false;
        if(approved === 'true'){
            approvedBool = true
        }
        setFormData({first, last, role, approved: approvedBool, language, userDocId});
        setEditOpen(!editOpen);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    //delete modal functions
    function deleteVolunteer({userDocId, id}) {
        firestore.collection('users').doc(userDocId).delete()
            .then(() => DeleteUser(id))
            .then(() => {
                props.getVolunteers().catch(error => console.log(error));
        })
            .catch(error => console.log(error));
        handleDeleteClose();
        console.log("user removed");
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
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <p>Approved Volunteers</p>
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
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteVolunteer formData={formData} submit={deleteVolunteer} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </Container>
    );
};

export default ApprovedVolunteer;
