import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import EnhancedTable from "../../../components/UI/Table/Table";
import {firestore} from "../../../firebase";
import {DeleteUser} from "../../../CloudFunctions/deleteUser";

const RegisteredVolunteer = (props) => {
    const {headCells} = props;
    const [tableData, setTableData] = useState(props.tableData);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setTableData(props.tableData);
    }, [props.tableData]);

    const handleDeleteOpen = ({userDocId, id}) => {
        console.log(props);
        setFormData({...props});
        firestore.collection('users').doc(userDocId).delete()
            .then(() => {
                const newList = tableData.filter(user => user.id !== id);
                setTableData(newList);
            })
            .then(() => DeleteUser(id))
                // .then(() => {
                //     props.getVolunteers().catch(error => console.log(error));
                // })
            .catch(error => console.log(error));
        //setDeleteOpen(true);
    };

    async function acceptVolunteer(userDocId) {
        await firestore.collection('users').doc(userDocId).set({
            approved: "true",
        }, {merge: true});
        props.getVolunteers();
    }

    const handleAcceptOpen = ({userDocId}) => {
        //console.log(props);
        //setFormData({...props});
        // firestore.collection('users').doc(userDocId).set({
        //     approved: "true",
        // }, {merge: true})
        //     .then(()=>{props.getVolunteers().catch(error => console.log(error));})
        acceptVolunteer(userDocId)
            .catch(error => {console.log(error)});
        console.log("user Accepted");
        //setDeleteOpen(true);
    };

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>Newly Registered Volunteers</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                accept={handleAcceptOpen}
                delete={handleDeleteOpen}
            />
        </Container>
    );
};

export default RegisteredVolunteer;
