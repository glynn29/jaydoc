import React, {useState} from "react";
import {connect} from "react-redux";

import Aux from "../Auxillary/Auxillary";
import classes from "./Layout.module.css"
import Toolbar from "../../../components/Navigation/ToolBar/Toolbar";
import SideDrawer from "../../../components/Navigation/NavigationItems/SideDrawer/SideDrawer";
import Footer from "../../../components/UI/Footer/Footer";
const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };


    return(
        <Aux>
            <div className={classes.Box}>
                <div>
                    <Toolbar
                        isAuth={props.isAuthenticated}
                        drawerToggleClicked={sideDrawerToggleHandler}/>
                    <SideDrawer
                        isAuth={props.isAuthenticated}
                        open={sideDrawerIsVisible}
                        closed={sideDrawerClosedHandler}/>
                </div>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </div>
            <Footer/>
        </Aux>
    );
};

const mapPropsToState = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
};


export default connect(mapPropsToState)(Layout);
