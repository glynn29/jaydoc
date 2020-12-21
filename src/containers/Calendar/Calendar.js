import React, {useContext, useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-calendar/dist/Calendar.css'

import Calendar from 'react-calendar';
import * as classes from './Calendar.module.css';
import {firestore} from "../../firebase";
import SignUp from "./Forms/SignUp/SignUp";
import TransitionModal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions";
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../Auth/Auth";
import AdminSingUp from "./Forms/AdminSignUp/AdminSignUp";
import Container from "@material-ui/core/Container";

const CalendarBox = () => {
    const {isAdmin} = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);

    async function getEvents() {
        let events = [];
        const eventsRef = await firestore.collection('scheduledEvents').orderBy("date","asc").get();
        eventsRef.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setTableData(events);
    }

    useEffect(() => {
        getEvents().catch(error => {console.log(error)});
    }, []);

    function editModal() {
        handleModalClose();
        getEvents().catch(error => {console.log(error)});
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (props) => {
        //const rowDate = new Date(props.date + "T17:00");
        //setFormData({...props, date: rowDate});
        setFormData({...props});
        setModalOpen(true);
    };

    return (
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <Typography variant="h3">Calendar Page</Typography>
                <Calendar
                    className={classes.Box}
                    onChange={e => setDate(e)}
                    value={date}
                    defaultValue={new Date()}
                    tileClassName={classes.Tile}
                    calendarType={"US"}
                    showNeighboringMonth={false}
                    nextLabel={"Next Month >"}
                    next2Label={"Next Year >"}
                    prevLabel={"< Previous Month"}
                    prev2Label={"< Previous Year"}
                    tileContent={
                        ({ date, view }) => {
                            const table = tableData.map((row)=>{

                                const currentDate = new Date();
                                const rowDate = new Date(row.date + "T19:00");
                                const day = rowDate.getDate();
                                const month = rowDate.getMonth();
                                const year = rowDate.getFullYear();
                                const isPastDate = currentDate > rowDate;
                                const itemClass = isPastDate ? classes.PastCalenderItem : classes.CalenderItem;
                                return(
                                    view === 'month' &&
                                    date.getDate() === day &&
                                    date.getMonth() === month &&
                                    date.getFullYear() === year
                                        ?
                                        <p
                                            key={row.id}
                                            onClick={()=> !isPastDate && handleModalOpen(row)}
                                            className={itemClass}>
                                            {row.name}
                                        </p>
                                        : null
                                );
                            });
                            return(
                                <div className={classes.CalenderItemBlock}>{table}</div>
                            );
                        }
                    }
                />
            <div>{date.toDateString()}</div>

            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={isAdmin ? <AdminSingUp formData={formData} cancel={handleModalClose} submit={editModal}/>:<SignUp formData={formData} onEdit={editModal} cancel={handleModalClose} getEvents={getEvents} />}
                title={isAdmin ? "Edit Positions" : "Sign Up"}
            />
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return{
        getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default connect(null, mapDispatchToProps)(CalendarBox);
