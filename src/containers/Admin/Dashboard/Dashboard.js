import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {firestore} from "../../../firebase";
import AdminContact from "./Forms/AdminContact/AdminContact";
import AdminComments from "./Forms/AdminComments/AdminComments";
import formStyles from "../../../components/UI/Styles/formStyle";
import EditRoles from "./Forms/EditRoles/EditRoles";
import EditPositions from "./Forms/EditPositions/EditPositions";

const Dashboard = () => {
    const classes = formStyles();
    const [contact, setContact] = useState([]);
    const [comment, setComment] = useState([]);
    const [page, setPage] = useState('contact');

    const list = [
        'contact',
        'anonymous reporting',
        'edit roles',
        'edit positions'];

    useEffect(() => {
        getContact()
            .catch();
        getComment()
            .catch();
    }, []);

    async function getContact() {
        let contactList = [];
        const ref = await firestore.collection('contact')
            .get();
        ref.forEach((res) => {
            contactList.push({...res.data(), id: res.id});
        });
        setContact(contactList);
    }

    async function getComment() {
        let commentList = [];
        const ref = await firestore.collection('comments')
            .get();
        ref.forEach((res) => {
            commentList.push({...res.data(), id: res.id});
        });
        setComment(commentList);
    }

    const getElement = () => {
        switch (page) {
            case 'contact':
                return <AdminContact contact={contact}/>;
            case 'anonymous reporting':
                return <AdminComments comments={comment}/>;
            case 'edit roles':
                return <EditRoles/>;
            case 'edit positions':
                return <EditPositions/>;
            default:
                return <div>Error</div>;
        }
    };

    return (
        <Container component="main" maxWidth="lg" style={{textAlign: 'center'}}>
            <Grid container spacing={2} direction={"column"} alignItems={"stretch"}>
                <Grid item>
                    <Typography variant="h3">Admin Dashboard Page</Typography>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Page</InputLabel>
                        <Select
                            value={page}
                            onChange={event => setPage(event.target.value)}
                            label="Page"
                            inputProps={{
                                name: 'page',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            {list.map(listItem => {
                                return (
                                    <MenuItem key={listItem} value={listItem}>{listItem}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <br/>
                {
                    getElement()
                }
            </Grid>
        </Container>
    );
};

export default Dashboard;
