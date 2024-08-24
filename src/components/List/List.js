import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListStyles from './List-Styles'
const ListCell = (props) => {
    const classes = ListStyles();

    return (

        <div className={(props.name === 'Loan Amount' || props.name === 'Transferrable Amount' || props.name === 'Tenure') ? (classes.impFields) : (classes.cell)}>
            <Typography variant="subtitle2" gutterBottom className={classes.name}>
                {props.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom className={classes.value}>
                {props.value}
            </Typography>
        </div >



    );


}



export default ListCell;