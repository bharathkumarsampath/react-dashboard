import React from 'react';
import ListCell from '../../components/List/List'
const KycDetails = (props) => {

    const panCardText = "Pan Card";


    return (
        <div>


            <ListCell name='First Name' value={props.LoanApp.firstName} />
            <ListCell name='Last Name' value={props.LoanApp.lastName} />
            <ListCell name='Marital Status' value={(props.LoanApp.maritalStatus === "S") ? ("Single") : ("Married")} /> {/*need to change later*/}
            <ListCell name='Education Level' value={props.LoanApp.educationLevel} />
            <ListCell name='Loan Purpose' value={props.LoanApp.loanPurpose} />
            <ListCell name='Father Name' value={props.LoanApp.fatherName} />
            <ListCell name='Mother Name' value={props.LoanApp.motherName} />
            <ListCell name='Resident Type' value={props.LoanApp.residenceType} />
            <ListCell name='Proof Of Address' value={panCardText} />
            <ListCell name='Pan Number' value={props.LoanApp.pan} />
            <ListCell name='Date Of Birth' value={props.LoanApp.dob} />
        </div>



    );


}



export default KycDetails;