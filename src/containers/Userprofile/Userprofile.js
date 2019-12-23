import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar'
import LoansHeader from '../../components/LoansHeader/LoansHeader'
import LoanDetails from '../../components/UserDetails/UserDetails'
import OfferDetails from '../../components/OfferDetails/OfferDetails'
import KycDetails from '../../components/KycDetails/KycDetails'
import EmployerDetails from '../../components/EmployerDetails/EmployerDetails'
import LoanAgreement from '../../components/LoanAgreement/LoanAgreement'
const UserProfile = (props) => {

    return (
        <div style={{ backgroundColor: 'rgb(245,247,251)', fontFamily: "Open Sans" }}>
            <Toolbar />
            <LoansHeader LoanApp={props.location.state.LoanApp} />
            <div style={{ display: 'flex' }}>
                <div>
                    <LoanDetails LoanApp={props.location.state.LoanApp} />
                    <OfferDetails LoanApp={props.location.state.LoanApp} />
                    <KycDetails LoanApp={props.location.state.LoanApp} />
                    <EmployerDetails LoanApp={props.location.state.LoanApp} />
                </div>
                <div>
                    <LoanAgreement LoanApp={props.location.state.LoanApp} />
                </div>
            </div>



        </div>
    );
}

export default UserProfile;