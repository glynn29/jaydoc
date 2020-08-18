import React from "react";
import {connect} from "react-redux";

import classes from "./Layout.module.css"
import Toolbar from "../Navigation/ToolBar/Toolbar";
import SideDrawer from "../Navigation/NavigationItems/SideDrawer/SideDrawer";
class layout extends React.Component{
    state={
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {

        this.setState((prevState)=>{
        return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return(
            <div>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>

                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }


}

const mapPropsToState = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapPropsToState)(layout);
