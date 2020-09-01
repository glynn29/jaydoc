import React, {useState} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import formStyles from "../../../components/UI/Styles/formStyle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import ReminderForm from "../../../components/UI/Forms/Reminder/Reminder";

const list2 = [
    {name:"M1"},
    {name:"M2"},
    {name:"M3"},
    {name:"M4"},
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Email = () => {
    const formClasses = formStyles();
    const [emailType, setEmailType] = useState("");
    const [category, setCategory] = useState([]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const list = [
        "Mass Email",
        "Custom Email",
        "Reminder"
    ];

    const emailForm = (
        <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
            {emailType === "Custom Email" &&
            <Grid item>
                <FormControl variant="outlined" className={formClasses.formControl}>
                    <InputLabel required >Category</InputLabel>
                    <Select
                        multiple
                        value={category}
                        onChange={event => setCategory(event.target.value) }
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        label="Category"
                    >
                        {list2.map( listItem => {
                            return (
                                <MenuItem key={listItem.name} value={listItem.name}>
                                    <Checkbox checked={category.indexOf(listItem.name) > -1}/>
                                    <ListItemText primary={listItem.name}/>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>}
            <Grid item>
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
            </Grid>

            <Grid item>
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
                    inputProps={{ className: formClasses.textarea }}
                />
            </Grid>
        </Grid>
);

    const form = (
        <div style={{textAlign:"center", width: "70%", margin:"auto", }}>
            <Typography variant="h3">Email Page</Typography>
            <Typography>Use this page to send email reminders</Typography>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <form className={formClasses.root} noValidate autoComplete="off">
                    <Grid container spacing={1} direction={"column"} alignItems={"stretch"} >
                        <Grid item>
                            <FormControl variant="outlined" className={formClasses.formControl} >
                                <InputLabel htmlFor="outlined-age-native-simple" required >Email Type</InputLabel>
                                <Select
                                    native
                                    value={emailType}
                                    onChange={event => setEmailType(event.target.value) }
                                    label="Email Type"
                                    inputProps={{
                                        name: 'emailType',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="Select an Email Type" value="" />
                                    {list.map( listItem => {
                                        return (
                                            <option key={listItem} value={listItem}>{listItem}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {emailType !== "Reminder" && emailForm}
                        {emailType === "Reminder" && <ReminderForm/>}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        //fullWidth
                        className={formClasses.submit}
                    >
                        {emailType === "Reminder" ? "Send Reminders" : "Send Mail" }
                    </Button>
                </form>
            </Container>
        </div>
    );

    return form;
};

export default Email;


