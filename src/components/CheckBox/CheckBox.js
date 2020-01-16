import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';

export default function Checkboxes({ text, checked = false, handleChange, value }) {

    // const handleChange = event => {
    //     setChecked(event.target.checked);
    //     if (event.target.checked) {
    //         var tempArray = [...props.checkBoxArray];
    //         tempArray[event.target.value] = 1;
    //         props.setCheckBoxArray(tempArray);
    //     } else {
    //         var tempArray = [...props.checkBoxArray];
    //         tempArray[event.target.value] = 0;
    //         props.setCheckBoxArray(tempArray);
    //     }
    // };


    return (
        <div className="displayFlex alignCenter">
            <Checkbox
                name={text}
                checked={checked}
                onChange={handleChange}
                value={value}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography style={{ paddingTop: '3%' }}>{text}</Typography>

        </div>
    );
}
