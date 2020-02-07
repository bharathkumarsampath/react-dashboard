import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import CheckBoxStyles from './CheckBoxStyles'

export default function Checkboxes({ text, checked = false, handleChange, value }) {
    const classes = CheckBoxStyles();

    return (
        <div className={classes.root}>
            <Checkbox
                name={text}
                checked={checked}
                onChange={handleChange}
                value={value}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography className={classes.checkBoxText}>{text}</Typography>

        </div>
    );
}
