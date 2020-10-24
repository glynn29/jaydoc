import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {firestore} from "../../../../../firebase";
import EnhancedTable from "../../../../../components/UI/Table/Table";

const Cancellation = () => {
    const [cancellations, setCancellations] = useState([]);

    const headCells = [
        {id: 'name', label: 'Name'},
        {id: 'position', label: 'Position'},
        {id: 'eventName', label: 'Event Name'},
        {id: 'date', label: 'Date'},
        {id: 'startTime', label: 'Start Time'}
    ];

    async function getCancellations() {
        const cancellationList = [];
        const ref = await firestore.collection("cancellation").get();
        ref.forEach((res) => {
            console.log(res.data());
            cancellationList.push(res.data().event);
        });
        setCancellations(cancellationList);
    }

    useEffect(function () {
        getCancellations()
            .catch(error => console.log(error));
    },[]);

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Cancellation Requests</Typography>
            <EnhancedTable
                data={cancellations}
                headCells={headCells}
            />
        </Container>
    );
};

export default Cancellation;
