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
import Loader from '../../components/Spinner/Spinner'
const UserProfile = (props) => {

    // const [LoanApp, setLoanApp] = React.useState({});


    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         console.log("props user profile " + JSON.stringify(props.location.state.LoanApp));
    //         try {
    //             var settings = {
    //                 "url": "http://localhost:8080/services/api/clix/portal/getLoanApplication?id=" + localStorage.getItem('appNumber'),
    //                 "method": "GET",
    //                 "headers": {
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                     "token": localStorage.getItem('token')
    //                 }
    //             }


    //             // $.ajax(settings).done(function (response) {
    //             //     console.log('user profile page');
    //             //     console.log(response);
    //             //     setLoanApp(JSON.parse(response));
    //             // });
    //             // console.log("token in local storage " + localStorage.getItem('token'));

    //             await fetch(settings.url, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                     "token": localStorage.getItem('token')
    //                 }

    //             }).then(res => res.json()
    //             ).then(res => {
    //                 setLoanApp(res);
    //                 //setCount(JSON.parse(res.udrsCount));
    //             });

    //         } catch (e) {
    //             console.log(e);
    //             setLoanApp(LoanApp);
    //         }
    //     };
    //     fetchUsers();
    // }, []);
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