import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../../../components/UI/Table/Table";

const AdminContact = (props) => {
    const [contact, setContact] = useState([]);

    useEffect(()=>{
        setContact(props.contact);
    },[props.contact]);

    const headCells = [
        {id: 'name', label: 'Name'},
        {id: 'email', label: 'Email'},
        {id: 'category', label: 'Category'},
        {id: 'message', label: 'Message'}
    ];

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Contact Us Messages</Typography>
            <EnhancedTable
                data={contact}
                headCells={headCells}
            />
        </Container>
    )
};

export default AdminContact;
