import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UserDetails from '../../components/UserDetails/UserDetails'
import Grid from '@material-ui/core/Grid';
import Toolbar from '../../components/Toolbar/Toolbar'
import LoansHeader from '../../components/LoansHeader/LoansHeader'
import LoanDetails from '../../components/UserDetails/UserDetails'
import OfferDetails from '../../components/OfferDetails/OfferDetails'
import KycDetails from '../../components/KycDetails/KycDetails'
import EmployerDetails from '../../components/EmployerDetails/EmployerDetails'
import LoanAgreement from '../../components/LoanAgreement/LoanAgreement'
import $ from 'jquery'
const UserProfile = () => {

    const [LoanApp, setLoanApp] = React.useState({});


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                var settings = {
                    "url": "http://localhost:8080/services/api/clix/portal/getLoanApplication?id=" + localStorage.getItem('appNumber'),
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }


                $.ajax(settings).done(function (response) {
                    console.log('user profile page');
                    console.log(response);
                    setLoanApp(JSON.parse(response));
                });
                console.log("token in local storage " + localStorage.getItem('token'));


            } catch (e) {
                console.log(e);
                setLoanApp(LoanApp);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div style={{ backgroundColor: 'rgb(245,247,251)' }}>
            <Toolbar />
            <LoansHeader LoanApp={LoanApp} />
            <div style={{ display: 'flex' }}>
                <div>
                    <LoanDetails LoanApp={LoanApp} />
                    <OfferDetails LoanApp={LoanApp} />
                    <KycDetails LoanApp={LoanApp} />
                    <EmployerDetails LoanApp={LoanApp} />
                </div>
                <div>
                    <LoanAgreement LoanApp={LoanApp} />
                </div>
            </div>

        </div>
    );
}

export default UserProfile;