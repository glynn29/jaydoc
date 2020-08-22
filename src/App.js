import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './containers/Auth/Login/Login';
import Register from "./containers/Auth/Register/Register";
import ContactUs from "./containers/Client/ContactUs/ContactUs";
import Comment from "./containers/Client/Comments/Comment";
import Calendar from "./containers/Calendar/Calendar";
import Account from "./containers/Client/Account/Account";
import Home from "./containers/Client/Home/Home";
import Logout from "./containers/Auth/Logout/Logout";

import Dashboard from "./containers/Admin/Dashboard/Dashboard";
import Email from "./containers/Admin/Email/Email";
import EventList from "./containers/Admin/EventList/EventList";
import Report from "./containers/Admin/Report/Reports";
import Users from "./containers/Admin/Users/Users";
import Layout from "./containers/hoc/Layout/Layout";

const App = (props) =>{
        let routes = (
            <Switch>
                <Route path="/account" component={Account}/>
                <Route path="/calendar" component={Calendar}/>
                <Route path="/contactUs" component={ContactUs}/>
                <Route path="/comments" component={Comment}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        );

        if(props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/account" component={Account}/>
                    <Route path="/calendar" component={Calendar}/>
                    <Route path="/contactUs" component={ContactUs}/>
                    <Route path="/comments" component={Comment}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={Home}/>
                </Switch>
            );
        }

    // <Switch>
    //     <Route path="/email" component={Email}/>
    //     <Route path="/report" component={Report}/>
    //     <Route path="/eventList" component={EventList}/>
    //     <Route path="/volunteerList" component={Users}/>
    //     <Route path="/" exact component={Dashboard}/>
    // </Switch>

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
}

export default withRouter(connect(null,null)(App));
