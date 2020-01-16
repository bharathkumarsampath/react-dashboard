import React from 'react';
import Typography from '@material-ui/core/Typography';
const ListCell = (props) => {


    return (

        <div style={{ display: 'flex', padding: '0.8rem 1rem 0rem 1rem', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" gutterBottom style={{ fontSize: '14px', fontWeight: '400', heigth: '19px', letterSpacing: '0.25px', lineHeight: '19px' }}>
                {props.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: '400', textAlign: 'right', fontSize: '14px', heigth: '20px', letterSpacing: '0.25px', lineHeight: '19px' }}>
                {props.value}
            </Typography>
        </div>



    );


}



export default ListCell;