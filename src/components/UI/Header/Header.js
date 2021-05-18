import React from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/InfoOutlined";

const header = ({title, info, title2}) => {
    const infoText = "Notes from developer: " + info;
    const header = (
        <div>
            <Typography variant="h3" >{title}</Typography>
            <div style={{'display': 'inline-block', 'align': 'baseline'}}>
                <Tooltip title={infoText} aria-label="add">
                    <InfoIcon color="disabled" style={{'float': 'left'}}/>
                </Tooltip>
                <Typography style={{'display': 'contents'}}>{title2}</Typography>
            </div>
            <br />
            <br />
        </div>
    );

    return header;
};

export default header;
