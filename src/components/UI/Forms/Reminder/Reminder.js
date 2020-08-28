import React, {useState} from "react";

import EnhancedTable from "../../Table/Table";
import TransitionModal from "../../Modal/Modal";

const headCells = [
    { id: 'time', label: 'Start Time' },
    { id: 'event', label: 'Event Name' },
    { id: 'position',  label: 'Position' },
    { id: 'volunteer',  label: 'Volunteer' },
    { id: 'email',  label: 'Email' },
];

const rowLabels = [
    { id: 'time'},
    { id: 'event'},
    { id: 'position'},
    { id: 'volunteer'},
    { id: 'email'},
];

function createData(time, event, position, volunteer, email) {
    return { time, event, position, volunteer, email };
}

let rows = [
    createData('08-24-2020 5:00PM', 'Jaydoc clinic', 'Director', 'John Cena1', 'cock1@cock.com'),
    createData('08-24-2020 6:00PM', 'Jaydoc clinic', 'Director', 'John Cena2', 'cock2@cock.com'),
    createData('08-24-2020 7:00PM', 'Jaydoc clinic', 'Director', 'John Cena3', 'cock3@cock.com'),
    createData('08-24-2020 5:00PM', 'Jaydoc clinic', 'Front Desk', 'John Cena4', 'cock4@cock.com'),
    createData('08-24-2020 5:00PM', 'Jaydoc clinic', 'Front Desk', 'John Cena5', 'cock5@cock.com'),
];

const Reminder = () => {
    const [tableData, setTableData] = useState(rows);

    return (
        <div>
            <p>Event page</p>
            <EnhancedTable
                data={tableData}
                headCells={headCells}
                rowLables={rowLabels}
            />
        </div>
    );
};

export default Reminder;
