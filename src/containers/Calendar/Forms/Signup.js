import React, {useEffect, useState} from "react";

import Container from "@material-ui/core/Container";

import EnhancedTable from "../../../components/UI/Table/Table";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'name', label: 'Event Name' },
    { id: 'date', label: 'Date'},
    { id: 'start', label: 'Start Time' },
    { id: 'end',  label: 'End Time' }
];

const SignUp = (props) => {
    const [tableData, setTableData] = useState([]);
    const [eventName, setEventName] = useState(props.formData.name);
    const [startTime, setStartTime] = useState(props.formData.start);
    const [endTime, setEndTime] = useState(props.formData.end);

    async function getPositions() {
        let positions = [];
        const eventsRef = await firestore.collection('events').doc(props.formData.eventId).get();
        if (eventsRef.exists) {
            console.log("positions",eventsRef.data());
            positions = eventsRef.data().positions;
        }else {
            console.log("no doc", props.formData.eventId);
        }
        setTableData(positions);
    }

    useEffect( () => {
        getPositions().catch(error => {console.log(error)});
    },[]);

    return(
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <p>{eventName} From {startTime} to {endTime}</p>

            <EnhancedTable
                data={tableData}
                headCells={headCells}
            />
        </Container>
    )
};
export default SignUp;
