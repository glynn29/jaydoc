import React, {useContext, useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './containers/Auth/Login/Login';
import Register from "./containers/Auth/Register/Register";
import ContactUs from "./containers/Client/ContactUs/ContactUs";
import Comment from "./containers/Client/Comments/Comment";
import Calendar from "./containers/Calendar/Calendar";
import Confirmation from "./containers/Calendar/Confirmation/Confirmation";
import Account from "./containers/Client/Account/Account";
import Home from "./containers/Client/Home/Home";
import Logout from "./containers/Auth/Logout/Logout";
import Dashboard from "./containers/Admin/Dashboard/Dashboard";
import Email from "./containers/Admin/Email/Email";
import EventList from "./containers/Admin/EventList/EventList";
import ScheduledEventList from "./containers/Admin/ScheduledEventList/ScheduledEventList";
import Report from "./containers/Admin/Report/Reports";
import Users from "./containers/Admin/Users/Users";
import Layout from "./containers/hoc/Layout/Layout";
import {AuthContext} from "./containers/Auth/Auth";
import * as actions from './store/actions/index';
//import firebase from "./firebase";
//import withErrorHandler from "./containers/hoc/withErrorHandler/withErrorHandler";

const App = (props) =>{
    const {currentUser, isAdmin} = useContext(AuthContext);

    const {onFetchRoleList} = props;
    useEffect(() => {
        console.log("fetching roles from app.js");
        onFetchRoleList();
    },[onFetchRoleList]);

    let routes = (
        <Switch>
            <Route path="/contactUs" component={ContactUs}/>
            <Route path="/comments" component={Comment}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" exact component={Home}/>
        </Switch>
    );

    if(currentUser){
        routes = (
            <Switch>
                <Route path="/account" component={Account}/>
                <Route path="/calendar" component={Calendar}/>
                <Route path="/contactUs" component={ContactUs}/>
                <Route path="/comments" component={Comment}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/login" component={Login}/>
                <Route path="/confirm" component={Confirmation}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        );
    }

    if(currentUser && isAdmin) {
        routes = (
            <Switch>
                <Route path="/email" component={Email}/>
                <Route path="/report" component={Report}/>
                <Route path="/eventList" component={EventList}/>
                <Route path="/volunteerList" component={Users}/>
                <Route path="/scheduledEventList" component={ScheduledEventList}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/login" component={Login}/>
                <Route path="/" exact component={Dashboard}/>
            </Switch>
        );
    }
    return (
        <div>
            <Layout currentUser={currentUser}>
                {routes}
            </Layout>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchRoleList: () => dispatch(actions.fetchRoleList()),
        onFetchPositionList: () => dispatch(actions.fetchPositionList())
    }
};

export default withRouter(connect(null,mapDispatchToProps)(App));
