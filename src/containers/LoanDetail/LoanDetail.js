import React, { useEffect } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar'
import LoansHeader from '../../components/LoansHeader/LoansHeader'
import LoanAgreement from '../../components/LoanAgreement/LoanAgreement'
import { api, rework, routes } from '../../globals'
import Spinner from '../../components/Loader/Loader'
import ExpansionPanel from '../../components/LoanDetailsExpansion/LoanDetailsExpansion'
import { useHistory } from "react-router-dom"
import LoanDetailPageError from '../../components/LoanDetailPageError/LoanDetailPageError'
import SnackBar from '../../components/Snackbar/SnackBar'
import { unLockApp } from '../../utils'
export const ReloadAppContext = React.createContext([{}, function () { }]);

const UserProfile = (props) => {
    let history = useHistory();
    const [LoanApp, setLoanApp] = React.useState({});
    const [reload, setReload] = React.useState(true);
    const [snackBar, setSnackBar] = React.useState();
    const [snackBarVariant, setSnackBarVariant] = React.useState();
    const [snackBarMessage, setSnackBarMessage] = React.useState();
    const [error, setError] = React.useState();
    const [selfieUrl, setSelfieUrl] = React.useState('');
    const showSnackBar = () => {
        setSnackBar(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };
    async function getReworkReasons() {
        try {
            var settings = {
                "mode": "no-cors",
                "url": api.HOST + "getReworkReasons",
            }
            await fetch(settings.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": localStorage.getItem('token')
                }

            }).then(res => res.json()
            ).then(res => {
                var reasonsArray = res.reworkReasons.split(',');
                for (var x = 0; x < reasonsArray.length; x++) {
                    rework.REASONS[x] = { text: reasonsArray[x], value: x };
                }
            });



        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                var settings = {
                    "mode": "no-cors",
                    "crossDomain": true,
                    "url": api.HOST + "getLoanApplication?loanAppNo=" + props.match.params.loanAppNo + "&agentName=" + localStorage.getItem('agentName'),

                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token'),
                    }

                }).then(res => res.json()
                ).then(res => {
                    if (typeof res.response === "string" && res.response.includes("Application Locked")) {
                        setSnackBarMessage(res.response);
                        setSnackBarVariant("info");
                        showSnackBar();
                        setTimeout(function () { history.push(routes.DASHBOARD); }, 2000);
                    } else if (res.response === "Please provide valid loan application no") {
                        setSnackBarMessage("Please provide valid loan application no");
                        setSnackBarVariant("info");
                        showSnackBar();
                        setTimeout(function () { history.push(routes.DASHBOARD); }, 2000);
                    } else if (res.response === "Exception occurred") {
                        setSnackBarMessage("Exception occurred, try again later");
                        setSnackBarVariant("info");
                        showSnackBar();
                        setTimeout(function () { history.push(routes.DASHBOARD); }, 2000);
                    } else if (res.response === "Either token is invalid or token expired") {
                        setSnackBarMessage("Your Session expired,try signing in again");
                        setSnackBarVariant("info");
                        showSnackBar();
                        unLockApp();
                        localStorage.clear();
                        setTimeout(function () { history.push(routes.HOME); }, 2000);
                    } else {
                        // console.log("response for tables : " + JSON.parse(JSON.stringify(res[0])));
                        setLoanApp(JSON.parse(JSON.stringify(res)));
                    }


                });

            } catch (e) {
                console.log(e);
                setError(true);
            }
        };
        fetchUsers();
        getReworkReasons();
    }, [reload]);

    return (
        <ReloadAppContext.Provider value={[reload, setReload]}>
            <div style={{ backgroundColor: 'rgb(245,247,251)', fontFamily: "Open Sans" }}>
                {
                    (error) ? (<LoanDetailPageError />) : (
                        (LoanApp.loanApplicationNo) ?
                            (<div>
                                <Toolbar />
                                <LoansHeader LoanApp={LoanApp} />
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <ExpansionPanel LoanApp={LoanApp} selfieUrl={selfieUrl} />
                                    </div>
                                    <div>
                                        <LoanAgreement LoanApp={LoanApp} setSelfieUrl={setSelfieUrl} />
                                    </div>
                                </div></div>) :
                            (<Spinner />))
                }
            </div>
            <SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} />
        </ReloadAppContext.Provider>

    );
}

export default UserProfile;