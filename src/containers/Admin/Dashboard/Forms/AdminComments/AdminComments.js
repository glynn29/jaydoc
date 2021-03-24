import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../../components/UI/Table/Table";
import DeleteComment from "./DeleteComment/DeleteComment";
import TransitionModal from "../../../../../components/UI/Modal/Modal";
import {firestore} from "../../../../../firebase";

const headCells = [
    {id: 'subject', label: 'Subject'},
    {id: 'message', label: 'Message'}
];

const AdminContact = (props) => {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({});
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(()=>{
        setComments(props.comments);
    },[props.comments]);

    //delete functions
    function deleteComment({id}) {
        firestore.collection('comments').doc(id).delete()
            .then(()=>{
                const newList = comments.filter(event => event.id !== id);
                setComments(newList);
            })
            .then(function () {
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
            <Typography variant="h4">Mandatory Reporting Messages</Typography>
            <EnhancedTable
                data={comments}
                headCells={headCells}
                delete={handleDeleteOpen}
            />
            <TransitionModal
                open={deleteOpen}
                handleOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
                form={<DeleteComment formData={formData} submit={deleteComment} cancel={handleDeleteClose} />}
                title={"Are You Sure?"}
            />
        </Container>
    )
};

export default AdminContact;
