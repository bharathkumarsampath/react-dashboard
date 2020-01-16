import React from 'react';
import ListCell from '../../components/List/List'
const KycDetails = (props) => {


    return (
        <div
        // style={{ backgroundColor: 'white', width: '28vw', height: '28rem', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}
        >
            {/* <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'left', marginRight: '15rem' }}>
                    KYC Details
            </Typography>
                <ExpandMoreIcon style={{ color: 'grey' }} />
            </div> */}


            <ListCell name='First Name' value={props.LoanApp.firstName} />
            <ListCell name='Last Name' value={props.LoanApp.lastName} />
            <ListCell name='Marital Status' value={props.LoanApp.maritalStatus} />
            <ListCell name='Education Level' value={props.LoanApp.educationLevel} />
            <ListCell name='Loan Purpose' value={props.LoanApp.loanPurpose} />
            <ListCell name='Employment Type' value={props.LoanApp.employerType} />
            <ListCell name='Monthly Income' value={'₹' + props.LoanApp.monthlyIncome} />
            <ListCell name='Father Name' value={props.LoanApp.fatherName} />
            <ListCell name='Mother Name' value={props.LoanApp.motherName} />
            <ListCell name='Resident Type' value={props.LoanApp.residenceType} />
        </div>



    );


}



export default KycDetails;