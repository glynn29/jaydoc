import React, {useEffect, useState} from "react";

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
import {connect} from "react-redux";
import {firestore} from "../../../firebase";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const list2 = [
    "Custom Email",
    "Reminder",
];

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const Email = (props) => {
    const classes = formStyles();
    const [emailType, setEmailType] = useState("Custom Email");
    const [role, setRole] = useState([]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const list = props.roleList;

    useEffect(() => {
        firestore.collection("email").doc("emailTemplate").get()
            .then((email) => {
               console.log(email.data());
                setMessage(email.data().email);
            })
    },[]);

    const emailForm = (
        <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
            <Grid item>
                <FormControl variant="outlined" className={classes.formControl}>
                    <AutoComplete
                        //value={role}
                        //inputValue={role}
                        onChange={(event,value) => {setRole(value); console.log(role)}}
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
                        //style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} key={params} variant="outlined" label="Roles" placeholder="Roles" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
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
                        rows={15}
                        inputProps={{ className: classes.textarea }}
                    />
                </FormControl>
            </Grid>
        </Grid>
);

    const form = (
        <div style={{textAlign:"center", width: "70%", margin:"auto", }}>
            <Typography variant="h3">Email Page</Typography>
            <Typography>Use this page to send email reminders</Typography>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
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
                                    //value={role}
                                    //inputValue={role}
                                    onChange={(event,value) => {setRole(value); console.log(role)}}
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
                                    //style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField {...params} key={params} variant="outlined" label="Roles" placeholder="Roles" />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                    value={subject}
                                    onChange={event => setSubject(event.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="subject"
                                    label="Subject"
                                    name="subject"
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
                                    rows={15}
                                    inputProps={{ className: classes.textarea }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    {emailType === "Reminder" && <ReminderForm/>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        //fullWidth
                        className={classes.submit}
                    >
                        Send Reminders
                    </Button>
                </form>
            </Container>
        </div>
    );

    return form;
};

const mapStateToProps = state =>{
    return {
        roleList: state.lists.roleList
    }
};

export default connect(mapStateToProps)(Email);


