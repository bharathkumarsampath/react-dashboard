import React from 'react';
import ListCell from '../../components/List/List'
const EmployerDetails = (props) => {


    return (
        <div >


            <ListCell name='Employer Name' value={props.LoanApp.employerName} />
            <ListCell name='Employer Type' value={props.LoanApp.employerType} />
            <ListCell name='Country' value={props.LoanApp.workAddressCountry} />
            <ListCell name='Address' value={props.LoanApp.workAddressStreet1 + "," + props.LoanApp.workAddressStreet2} />
            <ListCell name='Pin Code' value={props.LoanApp.workAddressPin} />
            <ListCell name='City' value={props.LoanApp.workAddressCity} />
            <ListCell name='State' value={props.LoanApp.workAddressState} />
        </div>



    );


}



export default EmployerDetails;