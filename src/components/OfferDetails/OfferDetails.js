import React from 'react';
import ListCell from '../../components/List/List'
const OfferDetails = (props) => {


    const transferrableAmount = props.LoanApp.loanAmount - props.LoanApp.preEmiAmount - Number(props.LoanApp.processingFee);


    return (
        <div>
            {/* <ListCell name='Amount Applied For' value={'₹' + props.LoanApp.loanAmount} /> need to change later */}
            <ListCell name='Loan Amount' value={'₹' + props.LoanApp.loanAmount} style={{ backgroundColor: '#f5f7fb' }} />
            <ListCell name='Pre EMI' value={'₹' + props.LoanApp.preEmiAmount} />
            <ListCell name='Transferrable Amount' value={'₹' + transferrableAmount} />
            <ListCell name='Processing Fee' value={'₹' + props.LoanApp.processingFee} />
            <ListCell name='EMI' value={'₹' + props.LoanApp.loanEmi} />
            <ListCell name='Tenure' value={props.LoanApp.loanTenure + ' Months'} />
            <ListCell name='Rate of Interest' value={props.LoanApp.rateOfInterest + '%'} />
            {/* <ListCell name='First EMI' value={(props.LoanApp.firstEmiDate) ? (props.LoanApp.firstEmiDate.substring(0, 12)) : (null)} /> */}
            {/* {(props.LoanApp.firstEmiDate) ? (
                <ListCell name='Maturity' value={GetFormattedDate(props.LoanApp.firstEmiDate, props.LoanApp.loanTenure)} />
            ) : (null)} */}

            {/* <ListCell name='Application Submitted On' value={props.LoanApp.submissionDate} /> */}
        </div>



    );


}



export default OfferDetails;