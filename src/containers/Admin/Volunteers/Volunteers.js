import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ApprovedVolunteer from "../ApprovedVolunteer/ApprovedVolunteer";
import RegisteredVolunteer from "../RegisteredVolunteer/RegisteredVolunteer";
import {firestore} from "../../../firebase";
import useStyles from "../../../components/UI/Styles/formStyle";

const headCells = [
    { id: 'first' , label: 'First Name' },
    { id: 'last' , label: 'Last Name' },
    { id: 'role' , label: 'Role' },
    { id: 'approved', label: 'Approved'},
    { id: 'language', label: 'Language'},
];

const Volunteers = props => {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const [approvedVolunteers, setApprovedVolunteers] = useState([]);
    const [registeredVolunteers, setRegisteredVolunteers] = useState([]);
    const [toggle, setToggle] = useState(false);

    async function getVolunteers(){
        console.log("Got Volunteers");
        let volunteers = [];
        const volunteerRef = await firestore.collection('users').get();
        volunteerRef.forEach((user) => {
            volunteers.push({...user.data(), userDocId: user.id});
        });
        setTableData(volunteers)
    }

    useEffect(() => {
        getVolunteers()
            .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        let AVList = [];
        let RVList = [];
        tableData.map(row => {
            if (row.approved === "true"){
                AVList.push(row);
            }else {
                RVList.push(row);
            }
        });
        setApprovedVolunteers(AVList);
        setRegisteredVolunteers(RVList)
    },[tableData]);

    const toggleView = () => {
        setToggle(!toggle);
    };

    return(
        <div style={{textAlign: 'center'}}>
            <Typography variant="h3">Volunteers Page</Typography>
            <Button
                onClick={toggleView}
                color="primary"
                variant="contained"
                style={{margin: 4}}
            >
                Approved Volunteers
            </Button>
            <Button
                onClick={toggleView}
                color="primary"
                variant="contained"
                style={{margin: 4}}
            >
                New Volunteers: ({registeredVolunteers.length})
            </Button>
            {!toggle &&
                <ApprovedVolunteer headCells={headCells} tableData={approvedVolunteers} getVolunteers={getVolunteers}/>
            }
            {toggle &&
                <RegisteredVolunteer headCells={headCells} tableData={registeredVolunteers} getVolunteers={getVolunteers}/>
            }
        </div>
    );
};

export default Volunteers;
