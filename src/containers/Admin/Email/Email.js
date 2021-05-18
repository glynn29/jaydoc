import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {createEvent} from "ics";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import AutoComplete from "@material-ui/lab/AutoComplete";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import formStyles from "../../../components/UI/Styles/formStyle";
import ReminderForm from "./Forms/Reminder/Reminder";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {firestore, functions} from "../../../firebase";
import TransitionModal from "../../../components/UI/Modal/Modal";
import SendMail from "./Forms/SendMail/SendMail";
import Header from "../../../components/UI/Header/Header";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const list2 = [
    "Custom Email",
    "Event Email",
];

const Email = (props) => {
    const classes = formStyles();
    const [emailType, setEmailType] = useState("Custom Email");
    const [role, setRole] = useState([]);
    const [subject, setSubject] = useState("Event Reminder");
    const [message, setMessage] = useState("");
    const [event, setEvent] = useState({});

    const [emails, setEmails] = useState([]);
    const [eventEmails, setEventEmails] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const list = props.roleList;

    useEffect(() => {
        firestore.collection("email").doc("emailTemplate").get()
            .then((email) => {
                setMessage(email.data().email);
            })
    },[]);

    const getEvent = (event) => {
        //get emails from event signed up positions
        let emailList = event.positions
            .filter(position => position.email)
            .map(position => position.email);

        setEvent(event);
        //emailList.push("jpennington@kumc.edu");
        //emailList.push("gll46960@ucmo.edu");

        setEventEmails(emailList);
        if(emailList.length > 0) {
            setEmails(emailList);
            setError(null);
        }else {
            setEmails([]);
        }
    };

    async function getEmailsByRole() {
        setLoading(true);
        let emailsTemp = [];
        let rolesList = role.map(row => {
            return row.name
        });
        const result = await firestore.collection("users").where("role","in", rolesList).get();
        await result.forEach(row => {
            emailsTemp.push(row.data().email);
        });
        //emailsTemp.push("gll46960@ucmo.edu");
        setLoading(false);
        console.log(emailsTemp);
        return emailsTemp;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let err = null;

        if(emailType === "Custom Email"){
            if(role.length > 0){
                getEmailsByRole()
                    .then(emailsResponse => {
                        handleModalOpen(emailsResponse);
                    })
                    .catch(error => console.log(error));
            }else {
                setEmails([]);
                err ="Select one or more roles to retrieve emails for";
            }
        }else{
            if(emails.length > 0){
                if(role.length > 0){
                    getEmailsByRole()
                        .then(emailResponse => {
                            const emailsTemp = eventEmails.filter(email => emailResponse.includes(email));
                            handleModalOpen(emailsTemp);
                        })
                        .catch(error => console.log(error));
                }else{
                    handleModalOpen(eventEmails);
                }
            }else {
                if (eventEmails.length <= 0)
                    err = "No emails found";
                else
                    err ="Select an event to retrieve emails for. Filter the event by selecting one or more roles";
            }
        }
        setError(err);
    };

    const handleModalOpen = (emails) => {
        if(emails.length > 0) {
            setEmails(emails);
            setFormData(emails);
            setModalOpen(true);
        }
        else{
            setError("No emails found")
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    function sendMailHandler() {
        handleModalClose();
        const mailRef = functions.httpsCallable('sendEventMail');
        //const mailRef = functions.httpsCallable('sendMail');

        if (emailType === "Event Email") {
            //create ics file and attach to email
            const start = new Date(event.date + "T" + event.start);
            const end = new Date(event.date + "T" + event.end);

            const eventTemp = {
                start: [start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes()],
                end: [end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes()],
                title: event.name,
                description: event.details,
                location: "340 Southwest Blvd, Kansas City, KS 66103"
            };

            createEvent(eventTemp, (error, value) => {
                if (error) {
                    console.log(error);
                    return
                }
                console.table(value);
                mailRef({
                    name: "volunteer",
                    subject: subject,
                    text: message,
                    emails: emails,
                    icsAttachment: btoa(value)
                })
                .then(result => console.log("Email Sent", result))
                .catch(error => console.log(error.message));
            });
        }else{
            //no ics, just email
            mailRef({
                name: "volunteer",
                subject: subject,
                text: message,
                emails: emails,
            })
            .then(result => console.log("Email Sent", result))
            .catch(error => console.log(error.message));
        }
    }

    // <Header title="Email Page"
    //         info="Notes from developer: This page is for sending emails"
    //         title2="Use this page to send email reminders"/>
    return (
        <Container component="main" maxWidth="md" style={{textAlign:"center"}}>
            <Typography variant="h3">Email Page</Typography>
            <Typography>Use this page to send email reminders</Typography>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={2} direction={"column"} alignItems={"stretch"} >
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel htmlFor="outlined-age-native-simple" required >Email Type</InputLabel>
                            <Select
                                value={emailType}
                                onChange={event => setEmailType(event.target.value) }
                                label="Email Type"
                                inputProps={{
                                    name: 'emailType',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                {list2.map( listItem => {
                                    return (
                                        <MenuItem key={listItem} value={listItem}>{listItem}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <AutoComplete
                                onChange={(event,value) => {setRole(value)}}
                                multiple
                                options={list}
                                limitTags={2}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} key={params} variant="outlined" label="Roles" placeholder="Roles" />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl} required>
                            <TextField
                                value={subject}
                                onChange={event => setSubject(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="subject"
                                label="Subject"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                id="outlined-textarea"
                                label="Message"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={8}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                {emailType === "Event Email" &&
                    <ReminderForm getEvent={getEvent}/>
                }
                <Typography color="error">{error}</Typography>
                {loading ?
                    <Spinner/> :
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Get Emails
                    </Button>}
            </form>
            <TransitionModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                form={<SendMail submit={sendMailHandler} cancel={handleModalClose} formData={formData}/>}
                title={"Emails"}
            />
        </Container>
    );
};

const mapStateToProps = state =>{
    return {
        roleList: state.lists.roleList
    }
};

export default connect(mapStateToProps)(Email);


