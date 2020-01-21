import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListStyles from './List-Styles'
const ListCell = (props) => {
    const classes = ListStyles();

    return (

        <div className={(props.name === 'Loan Amount' || props.name === 'Transferrable Amount' || props.name === 'Tenure') ? (classes.impFields) : (null)} style={{ display: 'flex', padding: '0.8rem 1rem 0rem 1rem', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" gutterBottom style={{ fontSize: '14px', fontWeight: '400', heigth: '19px', letterSpacing: '0.25px', lineHeight: '19px' }}>
                {props.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: '600', textAlign: 'right', fontSize: '14px', heigth: '20px', letterSpacing: '0.25px', lineHeight: '19px' }}>
                {props.value}
            </Typography>
        </div >



    );


}



export default ListCell;