import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'react-calendar/dist/Calendar.css'

//import {Calender} from '@material-ui/pickers/views/Calendar/Calendar';
import Calendar from 'react-calendar';
import * as classes from './Calendar.module.css';
import {firestore} from "../../firebase";
import SignUp from "./Forms/SignUp/SignUp";
import TransitionModal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions";

const CalendarBox = (props) => {
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
        //props.getCurrentUser();
    }, []);

    function editModal() {
        handleModalClose();
        getEvents().catch(error => {console.log(error)});
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = ({name, date, start, end, positions, eventId, id}) => {
        setFormData({name, date, start, end, positions, eventId, id});
        setModalOpen(true);
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

                                const currentDate = new Date();
                                const rowDate = new Date(row.date + "T17:00");
                                const day = rowDate.getDate();
                                const month = rowDate.getMonth();
                                const year = rowDate.getFullYear();
                                //console.log("Day of week", date, "date",rowDate, "rowDate", row.date);
                                //console.log(date.getDate());
                                const isPastDate = currentDate > rowDate;
                                const itemClass = isPastDate ? //console.log("true"): console.log("false");
                                classes.PastCalenderItem : classes.CalenderItem;
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
            <p>{date.toDateString()}</p>
            <p style={{textAlign: 'flexEnd'}}>Red = Past, Blue = Scheduled</p>
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

const mapStateToProps = state => {
    return{
        positions: state.auth.positions
    };
};

const mapDispatchToProps = dispatch => {
    return{
        getCurrentUser: () => dispatch(actions.getUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBox);
