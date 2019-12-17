import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import ListCell from '../../components/List/List'
const OfferDetails = (props) => {


    return (
        <div style={{ backgroundColor: 'white', width: '25rem', height: '30rem', borderRadius: '0.4rem', margin: '1rem', boxShadow: '-1px 2px 6px -2px rgba(0,0,0,0.27)' }}>
            <div style={{ display: 'flex', padding: '1rem' }}>
                <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'left', marginRight: '15rem' }}>
                    Offer Details
            </Typography>
                <ExpandMoreIcon style={{ color: 'grey' }} />
            </div>

            <Divider />
            <ListCell name='Amount Applied For' value={'₹' + props.LoanApp.appliedAmount} />
            <ListCell name='Loan Amount' value={'₹' + props.LoanApp.loanAmount} />
            <ListCell name='Pre EMI' value={'₹' + props.LoanApp.preEmiAmount} />
            <ListCell name='Transferrable Amount' value={'₹' + props.LoanApp.transferrableAmount} />
            <ListCell name='Processing Fee' value={'₹' + props.LoanApp.processingFee} />
            <ListCell name='EMI' value={'₹' + props.LoanApp.loanEmi} />
            <ListCell name='Tenure' value={props.LoanApp.loanTenure + ' Months'} />
            <ListCell name='Rate of Interest' value={props.LoanApp.rateOfInterest + '%'} />
            <ListCell name='First EMI' value={props.LoanApp.firstEmiDate} />
            <ListCell name='Maturity' value={props.LoanApp.firstEmiDate} />
            <ListCell name='Application Submitted On' value={props.LoanApp.submissionDate} />
        </div>



    );


}



export default OfferDetails;