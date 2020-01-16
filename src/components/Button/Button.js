import React from 'react';
import { BootstrapButton, useStyles } from './Button-styles'



export default function CustomizedButtons(props) {
    const classes = useStyles();

    return (
        <div>
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={props.onClick}>
                {props.text}
            </BootstrapButton>
        </div>
    );
}
