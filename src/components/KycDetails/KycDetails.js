import React from 'react';
import ListCell from '../../components/List/List'
const KycDetails = (props) => {


    return (
        <div>


            <ListCell name='First Name' value={props.LoanApp.firstName} />
            <ListCell name='Last Name' value={props.LoanApp.lastName} />
            <ListCell name='Marital Status' value={props.LoanApp.maritalStatus} />
            <ListCell name='Education Level' value={props.LoanApp.educationLevel} />
            <ListCell name='Loan Purpose' value={props.LoanApp.loanPurpose} />
            <ListCell name='Employment Type' value={(props.LoanApp.employmentType) ? ("Salaried") : ("Not Salaried")} />
            <ListCell name='Monthly Income' value={'₹' + props.LoanApp.monthlyIncome} />
            <ListCell name='Father Name' value={props.LoanApp.fatherName} />
            <ListCell name='Mother Name' value={props.LoanApp.motherName} />
            <ListCell name='Resident Type' value={props.LoanApp.residenceType} />
        </div>



    );


}



export default KycDetails;