import React from "react";
import jaydocLogo from "../../assets/images/jaydoc.jpg";
import classes from "./Logo.module.css"
const logo = (props) => (
    <div className={classes.Logo}><img src={jaydocLogo} alt="Jaydoc"/></div>
);

export default logo;
