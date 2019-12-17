import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import ListCell from '../../components/List/List'
const EmployerDetails = (props) => {


    return (
        <div style={{ backgroundColor: 'white', width: '25rem', height: '23rem', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ display: 'flex', padding: '1rem',justifyContent:'space-between' }}>
                <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'left'}}>
                    Employer Details
            </Typography>
                <ExpandMoreIcon style={{ color: 'grey' , textAlign: 'right'}} />
            </div>

            <Divider />
            <ListCell name='Employer Name' value={props.LoanApp.employerName} />
            <ListCell name='Employer Type' value={props.LoanApp.employerType} />
            <ListCell name='Country' value={props.LoanApp.kycWorkAddressCountry} />
            <ListCell name='Address' value={props.LoanApp.kycWorkAddressStreet} />
            <ListCell name='Pin Code' value={props.LoanApp.kycWorkAddressPincode} />
            <ListCell name='City' value={props.LoanApp.kycWorkAddressCity} />
            <ListCell name='State' value={props.LoanApp.kycWorkAddressState} />
        </div>



    );


}



export default EmployerDetails;