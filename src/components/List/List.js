import React from 'react';
import Typography from '@material-ui/core/Typography';
const ListCell = (props) => {


    return (

        <div style={{ display: 'flex', padding: '0.6rem 1rem 0rem 1rem', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" align='left' gutterBottom style={{ fontSize: '1.1rem', fontWeight: '400' }}>
                {props.name}
            </Typography>
            <Typography variant="subtitle2" align='right' gutterBottom style={{ fontSize: '1.1rem', fontWeight: '400', textAlign: 'right' }}>
                {props.value}
            </Typography>
        </div>



    );


}



export default ListCell;