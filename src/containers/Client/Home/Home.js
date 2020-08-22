import React from "react";

import * as classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes.Box}>
            <h1 className={classes.Line}>Welcome</h1>
            <h2 className={classes.Line}>About Us</h2>
            <p>
                <b>THIS SITE IS EXCLUSIVELY FOR VOLUNTEERS WHO HAVE ALREADY BEEN TRAINED OR VERIFIED. PLEASE DO NOT REGISTER UNLESS DIRECTED TO DO SO.</b>
                <br/><br/>
                This volunteer website allows you to directly schedule yourself for the days that you want, as well as allow you to see what positions are full and which ones are still open. Hopefully, this will make scheduling a much more convenient experience for all of you.
                <br/><br/>
                After signing up for a particular date, you are responsible for that time and must find a replacement yourself if something changes. If this does occur, please email us and let us know who will be filling in for you, and we will remove your name. We will not remove you from a scheduled date without a designated replacement.
                <br/><br/>
                To schedule yourself, simply click on the calendar icon, a calendar will open, and all you have to do is select the day you want. Once you do this, a list of all the positions will come up. You will be able to see who is working on that day, what slots are open and what slots have been filled. Please only select the position that you are eligible for.
                <br/><br/>
                We hope that you enjoy using this website, and that it works as well as we planned for it to. We know there is always room for improvement, so please do not hesitate to contact us.
                <br/><br/>
                Thank you,<br/>
                Jaydoc Exec
                <br/><br/>
                JayDoc Free Clinic is a student-run free clinic, operated by University of Kansas medical students under the supervision of an attending licensed physician. There are absolutely no charges for services provided and no one will be turned away. Patients are seen during General Clinic nights Mondays and Wednesdays 5-9pm on a first-come, first-served basis. Sign up and become one of our volunteers today! This site was designed to facilitate communication and scheduling of our clinic's volunteers. Additionally, we offer specialty clinics on Tuesdays from 5-9 p.m. for patients who receive referrals from our general clinic. These specialty clinics include diabetes care (twice per month), prenatal and women's health care (twice per month), ophthalmology (once per month), and physical therapy (twice per month). Again, these sessions are limited to patients referred by our general clinic and given a specific appointment slot.</p>
        </div>
    );
};

export default Home;
