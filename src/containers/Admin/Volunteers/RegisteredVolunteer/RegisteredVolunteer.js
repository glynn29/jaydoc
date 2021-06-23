import React, {useEffect, useState} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../components/UI/Table/Table";
import {firestore} from "../../../../firebase";
import {DeleteUser} from "../../../../CloudFunctions/deleteUser";
import DeleteVolunteer from "../Forms/DeleteVolunteer/DeleteVolunteer";
import TransitionModal from "../../../../components/UI/Modal/Modal";

const RegisteredVolunteer = (props) => {
    const {headCells} = props;
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [tableData, setTableData] = useState(props.tableData);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setTableData(props.tableData);
    }, [props.tableData]);

    //functions to accept a registered user
    async function acceptVolunteer(userDocId) {
        await firestore.collection('users').doc(userDocId).set({
            approved: "true",
        }, {merge: true});
        props.getVolunteers();
    }

    const handleAccept = ({userDocId}) => {
        acceptVolunteer(userDocId)
            .catch(error => {console.log(error)});
        console.log("user Accepted");
    };

    //delete modal functions
    const deleteVolunteer = ({userDocId, id}) => {
        setFormData({...props});
        firestore.collection('users').doc(userDocId).delete()
            .then(() => DeleteUser(id))
            .then(() => {
                props.getVolunteers().catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        handleDeleteClose();
    };

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return (
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <p>Newly Registered Volunteers</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                accept={handleAccept}
                delete={handleDeleteOpen}
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

export default RegisteredVolunteer;
