import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
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
import {firestore} from "../../../firebase";

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
    const [emails, setEmails] = useState([]);
    const [eventEmails, setEventEmails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const list = props.roleList;

    useEffect(() => {
        firestore.collection("email").doc("emailTemplate").get()
            .then((email) => {
                setMessage(email.data().email);
            })
    },[]);

    const getPositions = (positions) => {
        console.log(positions);
        let emailList = positions
            .filter(position => position.email)
            .map(position => position.email);

        setEventEmails(emailList);
        setEmails(emailList);
    };

    async function getEmailsByRole() {
        setLoading(true);
        let rolesList = [];
        let emailsTemp = [];
        rolesList = role.map(row => {
            return row.name
        });
        const result = await firestore.collection("users").where("role","in", rolesList).get();
        await result.forEach(row => {
            emailsTemp.push(row.data().email);
        });
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
                    .then(res => {
                        setEmails(res);
                    })
                    .catch(error => console.log(error));
            }else {
                setEmails([]);
                err ="No emails";
            }
        }else{
            if(emails.length > 0){
                if(role.length > 0){
                    getEmailsByRole()
                        .then(res => {
                            const emailsTemp = eventEmails.filter(email => res.includes(email));
                            setEmails(emailsTemp);
                        })
                        .catch(error => console.log(error));
                }else{
                    setEmails(eventEmails);
                }
            }else {
                setEmails([]);
                err ="No emails";
            }
        }
        setError(err);
    };

    const form = (
        <Container component="main" maxWidth="md" style={{textAlign:"center"}}>
            <Typography variant="h3">Email Page</Typography>
            <Typography>Use this page to send email reminders</Typography>
            <CssBaseline />
            <form className={classes.root} autoComplete="off" onSubmit={onSubmitHandler}>
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
                                placeholder="Keep up the good work"
                                multiline
                                variant="outlined"
                                fullWidth
                                required
                                rows={10}
                                inputProps={{ className: classes.textarea }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                {emailType === "Event Email" &&
                    <ReminderForm getPositions={getPositions}/>
                }
                <Typography color="error">{error}</Typography>
                {emails.map(email => <p key={email}>{email}</p>)}
                {loading && <Spinner/>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Send Reminders
                </Button>
            </form>
        </Container>
    );

    return form;
};

const mapStateToProps = state =>{
    return {
        roleList: state.lists.roleList
    }
};

export default connect(mapStateToProps)(Email);


