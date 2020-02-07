import React from 'react';
import ListCell from '../../components/List/List'
const EmployerDetails = (props) => {



    const Address = (props.LoanApp.workAddressStreet1) ? (props.LoanApp.workAddressStreet1) : (null) + "," + (props.LoanApp.workAddressStreet2) ? (props.LoanApp.workAddressStreet2) : (null);
    return (
        <div >


            <ListCell name='Employer Name' value={props.LoanApp.employerName} />

            <ListCell name='Employment Type' value={(props.LoanApp.employmentType) ? ("Salaried") : ("Not Salaried")} />

            <ListCell name='Monthly Income' value={'₹' + props.LoanApp.monthlyIncome} />
            {/* <ListCell name='Employer Type' value={props.LoanApp.employerType} /> */}
            {/* <ListCell name='Country' value={props.LoanApp.workAddressCountry} /> */}
            <ListCell name='Address' value={Address} />
            <ListCell name='Pin Code' value={props.LoanApp.workAddressPin} />
            <ListCell name='City' value={props.LoanApp.workAddressCity} />
            <ListCell name='State' value={props.LoanApp.workAddressState} />
        </div>



    );


}



export default EmployerDetails;