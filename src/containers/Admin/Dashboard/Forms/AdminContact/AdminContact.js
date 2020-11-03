import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../../components/UI/Table/Table";
import {firestore, functions} from "../../../../../firebase";
import Respond from "../AdminComments/Respond/Respond";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import DeleteComment from "../DeleteComment/DeleteComment";
import DeleteEvent from "../../../EventList/Forms/DeleteEvent/DeleteEvent";

const headCells = [
    {id: 'name', label: 'Name'},
    {id: 'email', label: 'Email'},
    {id: 'category', label: 'Category'},
    {id: 'message', label: 'Message'}
];

const AdminContact = (props) => {
    const [contact, setContact] = useState([]);
    const [formData, setFormData] = useState({});
    const [modal, setModal] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(()=>{
        setContact(props.contact);
    },[props.contact]);

    const sendEmail = (contact) => {
        const mailRef = functions.httpsCallable('sendEventMail');

        mailRef({
            name: contact.name,
            subject: contact.subject,
            text: contact.message,
            emails: contact.email,
        })
            .then(result => {
                console.log("Email Sent", result);
                handleModalClose();
            })
            .catch(error => console.log(error.message));
    };

    const handleModalOpen = (props) => {
        console.log(props);
        setFormData(props);
        setModal(true);
    };

    const handleModalClose = () => {
        setModal(false);
    };

    //delete functions
    function deleteEvent({id}) {
        firestore.collection('contact').doc(id).delete()
            .then(()=>{
                const newList = contact.filter(event => event.id !== id);
                setContact(newList);
            })
            .then(function(){
                handleDeleteClose();
            })
            .catch(error => {console.log(error)});
        console.log("event removed");
    }

    const handleDeleteOpen = (props) => {
        setFormData({...props});
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Contact Us Messages</Typography>
            <EnhancedTable
                data={contact}
                headCells={headCells}
                respond={handleModalOpen}
                delete={handleDeleteOpen}
            />
            <TransitionModal
                open={modal}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<Respond formData={formData} submit={sendEmail} cancel={handleModalClose}/>}
                title={"Response Email"}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteComment formData={formData} submit={deleteEvent} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </Container>
    )
};

export default AdminContact;
