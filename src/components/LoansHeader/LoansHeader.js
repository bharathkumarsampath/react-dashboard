import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import ReworkModal from './ReworkModal'
import ViewReason from '../LoansHeader/Popover'
import { globals } from '../../globals'
import SnackBar from '../Snackbar/SnackBar'
import ApplicationState from '../ApplicationState/ApplicationState'
import { unLockApp } from '../../utils'
// import LoansHeaderStyles from './LoansHeaderStyles'
const LoansHeader = (props) => {
    let history = useHistory();

    const [snackBar, setSnackBar] = React.useState();
    const [snackBarVariant, setSnackBarVariant] = React.useState();
    const [snackBarMessage, setSnackBarMessage] = React.useState();
    var [checkBoxArray, setCheckBoxArray] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const showSnackBar = () => {
        setSnackBar(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };
    function unlockAndNavBack() {
        unLockApp(props.LoanApp.mvStatus);
        history.push(globals.routes.DASHBOARD);
    }
    return (
        <div style={{
            display: 'flex',
            marginTop: '0.2rem',
            backgroundColor: 'white',
            justifyContent: "space-between",
            paddingLeft: '2%'
        }}>

            <div style={{ display: 'flex', paddingTop: '1%', fontFamily: 'Open sans' }}>
                <div style={{ textAlign: 'left', color: 'grey', cursor: 'pointer', marginLeft: '2%', marginTop: '1%' }} onClick={unlockAndNavBack}>
                    <ArrowBackIcon />
                </div>
                <div style={{ marginLeft: '2%', marginTop: '1%' }}>
                    <Typography variant="body2" gutterBottom style={{ height: '30px', width: '235px', color: '#000000', fontSize: '20px', fontWeight: '600' }}>
                        LAN - MV{props.LoanApp.loanApplicationNo}
                    </Typography>

                </div>
                <div style={{ color: 'rgb(92,154,224)', marginLeft: '3%' }}>
                    <ApplicationState state={props.LoanApp.mvStatus} />
                </div>
                <div style={{ color: 'rgb(92,154,224)', cursor: 'pointer', marginLeft: '2%', marginTop: '1.3%', width: '10vw' }}>
                    {
                        (props.LoanApp.mvStatus === globals.state.RE_WORK) ?
                            (<ViewReason reason={props.LoanApp.reworkReason} date={props.LoanApp.reworkDate} />) : (null)

                    }
                </div>
            </div>
            <SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} />
            <div style={{ textAlign: 'right', marginRight: '3vw', paddingTop: '1%' }}>

                {
                    (props.LoanApp.mvStatus === globals.state.PENDING || props.LoanApp.mvStatus === globals.state.RE_SUBMITTED) ?
                        (
                            <ReworkModal LoanApp={props.LoanApp} showSnackBar={showSnackBar} setSnackBarVariant={setSnackBarVariant} setSnackBarMessage={setSnackBarMessage} checkBoxArray={checkBoxArray} setCheckBoxArray={setCheckBoxArray} />
                        ) :
                        (null)
                }
                {/* {
                    (props.LoanApp.mvStatus === globals.state.RE_WORK) ?
                        (
                            <Typography>Rework Date : {props.LoanApp.reworkDate}</Typography>
                        ) :
                        (null)
                }
                {
                    (props.LoanApp.mvStatus === globals.state.APPROVED || props.LoanApp.mvStatus === globals.state.SYSTEM_APPROVED) ?
                        (
                            <Typography >Approved Date : {props.LoanApp.approvedDate}</Typography>
                        ) :
                        (null)
                }
                {
                    (props.LoanApp.mvStatus === globals.state.CANCELLED) ?
                        (
                            <Typography>Cancelled Date : {props.LoanApp.rejectedOrCancelledDate}</Typography>
                        ) :
                        (null)
                }
                {
                    (props.LoanApp.mvStatus === globals.state.REJECTED) ?
                        (
                            <Typography>Rejected Date : {props.LoanApp.rejectedOrCancelledDate}</Typography>
                        ) :
                        (null)
                } */}

            </div>



        </div>
    );
}

export default LoansHeader;