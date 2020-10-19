import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import EnhancedTable from "../../../../../components/UI/Table/Table";

const AdminContact = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        setComments(props.comments);
    },[props.comments]);


    const headCells = [
        {id: 'subject', label: 'Subject'},
        {id: 'message', label: 'Message'}
    ];

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h4">Comment Messages</Typography>
            <EnhancedTable
                data={comments}
                headCells={headCells}
            />
        </Container>
    )
};

export default AdminContact;
