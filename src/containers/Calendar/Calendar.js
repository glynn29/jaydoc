import React, {useContext, useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar';

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import * as classes from './Calendar.module.css';
import {firestore} from "../../firebase";
import SignUp from "./Forms/SignUp/SignUp";
import TransitionModal from "../../components/UI/Modal/Modal";
import {AuthContext} from "../Auth/Auth";
import AdminSignUp from "./Forms/AdminSignUp/AdminSignUp";
import Spinner from "../../components/UI/Spinner/Spinner";


const CalendarBox = () => {
    const {isAdmin} = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);


    async function getEvents(start, end) {
        let events = [];

        setLoading(true);
        //get events only for current month
        const eventsRef2 = await firestore.collection('scheduledEvents').where("date" , ">=", start).where("date", "<=", end).orderBy("date","asc").get();

        eventsRef2.forEach((event) => {
            events.push({...event.data(), id: event.id});
        });
        setTableData(events);
        setLoading(false);
    }

    function getDateRanges(newDate) {
        console.log("called",newDate);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        let formattedMonth = month;
        if (month < 10){
            formattedMonth = "0" + month;
        }
        const start = year  + "-" + formattedMonth  + "-01";
        const end = year + "-" + formattedMonth + "-31";
        getEvents(start, end).catch(error => {console.log(error)});
    }

    useEffect(() => {
        getDateRanges(date);
    }, []);

    function editModal() {
        //reload events once user has signed up
        handleModalClose();
        getDateRanges(date);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (props) => {
        console.log(props);
        setFormData({...props});
        setModalOpen(true);
    };

    return (
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <Typography variant="h3">Calendar Page</Typography>
                <Calendar
                    onActiveStartDateChange={({activeStartDate}) => getDateRanges(activeStartDate)}
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
                                    <p key={row.id}
                                       onClick={()=> handleModalOpen({...row, isPastDate})}
                                       className={itemClass}
                                    >
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
            <div>{loading && <Spinner/>}</div>

            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={isAdmin ? <AdminSignUp formData={formData} cancel={handleModalClose} submit={editModal}/> : <SignUp formData={formData} onEdit={editModal} cancel={handleModalClose} getEvents={getDateRanges} date={date}/>}
                title={isAdmin ? "Edit Positions" : "Sign Up"}
            />
        </Container>
    );
};

export default CalendarBox;
