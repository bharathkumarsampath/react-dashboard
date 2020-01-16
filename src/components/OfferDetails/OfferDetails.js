import React from 'react';
import ListCell from '../../components/List/List'
const OfferDetails = (props) => {


    return (
        <div>
            <ListCell name='Amount Applied For' value={'₹' + props.LoanApp.appliedAmount} />
            <ListCell name='Loan Amount' value={'₹' + props.LoanApp.loanAmount} />
            <ListCell name='Pre EMI' value={'₹' + props.LoanApp.preEmiAmount} />
            <ListCell name='Transferrable Amount' value={'₹' + props.LoanApp.transferrableAmount} />
            <ListCell name='Processing Fee' value={'₹' + props.LoanApp.processingFee} />
            <ListCell name='EMI' value={'₹' + props.LoanApp.loanEmi} />
            <ListCell name='Tenure' value={props.LoanApp.loanTenure + ' Months'} />
            <ListCell name='Rate of Interest' value={props.LoanApp.rateOfInterest + '%'} />
            <ListCell name='First EMI' value={props.LoanApp.firstEmiDate} />
            <ListCell name='Maturity' value={props.LoanApp.maturityDate} />
            <ListCell name='Application Submitted On' value={props.LoanApp.submissionDate} />
        </div>



    );


}



export default OfferDetails;