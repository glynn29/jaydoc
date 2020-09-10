import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css'

//import {Calender} from '@material-ui/pickers/views/Calendar/Calendar';
import Calendar from 'react-calendar';
import * as classes from './Calendar.module.css';
import {firestore} from "../../firebase";
import SignUp from "./Forms/Signup";
import TransitionModal from "../../components/UI/Modal/Modal";

const CalendarBox = () => {
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

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const toggleModal = ({name, date, start, end, positions, eventId}) => {
        setFormData({name, date, start, end, positions, eventId});
        setModalOpen(!modalOpen);
    };

    return (
        <div className={classes.Box}>
            <p>Calendar page</p>
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
                    //onClickDay={(value, event) => console.table(event)}
                    tileContent={
                        ({ date, view }) => {
                            const table = tableData.map((row)=>{
                                const tempDate = new Date(row.date);
                                const day = tempDate.getDate();
                                const month = tempDate.getMonth();
                                //console.log("Day of week", date.getDate(), "date",day);
                                return(
                                    view === 'month' && date.getDate() === day && date.getMonth() === month ? <p key={row.id} onClick={()=>toggleModal(row)}>{row.name}</p>: null
                                );
                            });
                            return(table);
                        }
                    }
                />
            <p>{date.toDateString()}</p>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<SignUp formData={formData} onEdit={editModal} />}
                title={"Edit Event"}
            />
        </div>
    );
};

export default CalendarBox;
