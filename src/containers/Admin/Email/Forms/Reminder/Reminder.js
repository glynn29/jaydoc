import React, {useEffect, useState} from "react";

import EnhancedTable from "../../../../../components/UI/Table/Table";
import {firestore} from "../../../../../firebase";

const headCells = [
    { id: 'name', label: 'Event Name' },
    { id: 'date', label: 'Date'},
    { id: 'start', label: 'Start Time' },
    { id: 'end',  label: 'End Time' }
];

const Reminder = (props) => {
    const [tableData, setTableData] = useState([]);
    const [event, setEvent] = useState({});

    const isSelected = (id) => event.id === id;

    const handleChange = (event) =>{
        props.getEvent(event);
        isSelected(event.name);
        setEvent(event);
    };

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('scheduledEvents').orderBy("date","desc").get();
        eventsRef.forEach((row) => {
            events.push({...row.data(), id: row.id});
        });
        setTableData(events);
    }

    useEffect( () => {
        getEvents().catch(error => {console.log(error)});
    },[]);

    return (
        <div>
            <p>Scheduled Events</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                checkbox={handleChange}
                isSelected={isSelected}
            />
        </div>
    );
};

export default Reminder;
