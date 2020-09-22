import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";

import ApprovedVolunteer from "../ApprovedVolunteer/ApprovedVolunteer";
import RegisteredVolunteer from "../RegisteredVolunteer/RegisteredVolunteer";
import {firestore} from "../../../firebase";

const headCells = [
    { id: 'first' , label: 'First Name' },
    { id: 'last' , label: 'Last Name' },
    { id: 'role' , label: 'Role' },
    { id: 'approved', label: 'Approved'},
    { id: 'language', label: 'Language'},
];

const Volunteers = props => {
    const [tableData, setTableData] = useState([]);
    const [approvedVolunteers, setApprovedVolunteers] = useState([]);
    const [registeredVolunteers, setRegisteredVolunteers] = useState([]);

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

    return(
        <div>
            <Typography variant="h2" style={{textAlign:"center"}}>Volunteers Page</Typography>
            <ApprovedVolunteer headCells={headCells} tableData={approvedVolunteers} getVolunteers={getVolunteers}/>
            <RegisteredVolunteer headCells={headCells} tableData={registeredVolunteers} getVolunteers={getVolunteers}/>
        </div>
    );
};

export default Volunteers;
