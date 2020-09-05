import React, {useState} from "react";
import 'react-calendar/dist/Calendar.css'

import Calendar from 'react-calendar';
import * as classes from './Calendar.module.css';

const CalendarBox = () => {
    const [date, setDate] = useState(new Date());

    // const links = {
    //     link1: <a href="www.google.com">Google</a>
    // };

    return (
        <div className={classes.Box}>

            <p>calendar page</p>


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
                    //onClickDay={(date) => alert(date)}
                    //tileContent={links.link1}
                />
            <p>{date.toDateString()}</p>
        </div>);
};

export default CalendarBox;
