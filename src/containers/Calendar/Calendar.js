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
        props.getCurrentUser();
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

    const toggleModal = ({name, date, start, end, positions, eventId, id}) => {
        setFormData({name, date, start, end, positions, eventId, id});
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
                                //console.log(row);
                                const tempDate = new Date(row.date);
                                const day = tempDate.getDate();
                                const month = tempDate.getMonth();
                                //console.log("Day of week", date.getDate(), "date",day);
                                return(
                                    view === 'month' && date.getDate() === day && date.getMonth() === month ? <p key={row.id} onClick={()=>toggleModal(row)} className={classes.CalenderItem}>{row.name}</p>: null
                                );
                            });
                            return(<div className={classes.CalenderItemBlock}>{table}</div>);
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
