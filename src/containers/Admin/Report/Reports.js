import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import formStyles from "../../../components/UI/Styles/formStyle";
import {firestore} from "../../../firebase";
import Button from "@material-ui/core/Button";
import {CustomDatePicker} from "../../../components/UI/DateTimePicker/DateTimePicker";
import Spinner from "../../../components/UI/Spinner/Spinner";
import EnhancedTable from "../../../components/UI/Table/Table";

//how many times each person has volunteered
//how many times a person has for a night ex diabetes night
//how many times a role has volunteered ex all M1
//total number of people in a date range ex how many in the last 3 months
//total number of people in a role in a date range how many M1s in the last 3 months

const Report = (props) => {
    const classes = formStyles();
    const list = props.roleList;
    const [role, setRole] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventId, setEventID] = useState(null);
    const [eventList, setEventList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [results, setResults] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const volunteerInfo = "Click to get general volunteer's report. You can select an event to filter by.";
    const groupInfo = "Click to get the number of times a role has volunteered.";
    const dateRangeInfo = "Click to get the number of people that have volunteered in a date range. You can select a role to filter by.";

    useEffect( () => {
        getEvents().catch(error => {console.log(error)});
        getUsers().catch(error => {console.log(error)});
    },[]);

    async function getUsers() {
        setLoading(true);
        let users = [];
        const userRef = await firestore.collection('users').get();
        userRef.forEach(user => {
            users.push({...user.data(), id: user.id});
        });
        setUserList(users);
        setLoading(false);
    }

    async function getEvents() {
        setLoading(true);
        let events = [];
        const eventsRef = await firestore.collection('events').get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setEventList(events);
        setLoading(false);
    }

    const selectChangeHandler = (event) =>{
        console.table(eventList);
        console.log(event.target.value);
        setEventName(event.target.value);
        eventList.filter(e => e.name === event.target.value).map(row => setEventID(row.id));
    };

    const formatData = (list) => {
        console.table(list);
        //function to group users events together

        //group items by id
        list = list.reduce((result, item)=> {
            (result[item['id']] = result[item['id']] || []).push(item);
            return result;
        },{});
        //turn object into array
        list = Object.keys(list).reduce((array, key) => {
            return [...array, {key: list[key]}]
        }, []);
        //extract info from each element of array
        list = list.map((user) => {
            const id = user.key[0].id;
            const name = user.key[0].name;
            const count = user.key.length;

            //return (<td key={id}>Name: {name}, Count: {count}</td>);
            return {id, name, count}
        });
        setResults(list);
    };

    const headCells = [
        { id: 'name' , label: 'Name' },
        { id: 'count' , label: 'Count' },
    ];

    const createTable = results.length > 0 &&
        (<div style={{margin: 'auto'}}>
            Total number of volunteers: {results.length}
                <EnhancedTable
                    data={results}
                    headCells={headCells}
                />
            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Count</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {results.map((user) => {*/}
            {/*        return(*/}
            {/*            <tr key={user.id}>*/}
            {/*                <td>{user.name}</td>*/}
            {/*                <td>{user.count}</td>*/}
            {/*            </tr>*/}
            {/*        )*/}
            {/*    })*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
        );

    const volunteerReport = () => {
        if(eventName){
            let list = [];
            console.log(" vol event report", eventName);
            firestore.collectionGroup("volunteerEvents").where("eventName", "==", eventName).get()
                .then(res => {
                    res.forEach(eventRow => {
                        list.push(eventRow.data());
                    });
                    formatData(list);
                })
                .catch();
        }else {
            console.log("vol report",userList);
            let list = [];
            firestore.collectionGroup("volunteerEvents").get()
                .then(res => {
                    res.forEach(eventRow => {
                        list.push(eventRow.data());
                    });
                    formatData(list);
                })
                .catch();
        }
    };

    const groupReport = () => {
        if(role){
            setError(null);
            let list = [];
            firestore.collectionGroup("volunteerEvents")
                .where("role", "==", role)
                .get()
                .then(res => {
                    res.forEach(eventRow => {
                        list.push(eventRow.data());
                    });
                    formatData(list);
                })
                .catch();
            console.log("role event", role)
        }else{
            setError("Please select a role");
        }
    };

    const dateRangeReport = () => {
        if(startDate && endDate){
            setError(null);
            let list = [];
            console.log("date event", startDate, endDate);
            if (role){
                firestore.collectionGroup("volunteerEvents")
                    .where("role", "==", role)
                    .where("date", ">=", startDate)
                    .where("date", "<=", endDate)
                    .get()
                    .then(res => {
                        res.forEach(eventRow => {
                            list.push(eventRow.data());
                        });
                        formatData(list);
                    })
                    .catch();
            } else {
                firestore.collectionGroup("volunteerEvents")
                    .where("date", ">=", startDate)
                    .where("date", "<=", endDate)
                    .get()
                    .then(res => {
                        res.forEach(eventRow => {
                            list.push(eventRow.data());
                        });
                        formatData(list);
                    })
                    .catch();
            }
        }else {
            setError("Please select a start and end date");
        }
    };

    return (
        <Container component="main" maxWidth="md" style={{textAlign: 'center'}}>
            <Typography variant="h3">Reports Page</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={event => setRole(event.target.value)}
                            label="Role"
                        >
                            <MenuItem aria-label="None" value="">None</MenuItem>
                            {list.map( listItem => {
                                return (
                                    <MenuItem key={listItem.name} value={listItem.name}>{listItem.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Event</InputLabel>
                        <Select
                            value={eventName}
                            onChange={selectChangeHandler}
                            label="Event"
                        >
                            <MenuItem aria-label="None" value="">None</MenuItem>
                            {eventList.map( listItem => {
                                return (
                                    <MenuItem key={listItem.name} value={listItem.name}>{listItem.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <CustomDatePicker value={startDate} onChange={setStartDate} label="Start Date"/>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <CustomDatePicker value={endDate} onChange={setEndDate} label="End Date"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {error}
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title={volunteerInfo}>
                        <Button
                            onClick={volunteerReport}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                        Generate Volunteer Report
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title={groupInfo}>
                        <Button
                            onClick={groupReport}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Generate Group Report
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Tooltip title={dateRangeInfo}>
                        <Button
                            onClick={dateRangeReport}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Generate DateRange Report
                        </Button>
                    </Tooltip>
                </Grid>
                {loading ?
                    <Spinner/>
                    :
                    createTable
                }
            </Grid>
        </Container>
    );
};

const mapStateToProps = state =>{
    return{
        roleList: state.lists.roleList,
        positionList: state.lists.positionList,
    }
};

export default connect(mapStateToProps)(Report);
