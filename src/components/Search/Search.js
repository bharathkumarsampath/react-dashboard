import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css'
import { Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ApplicationState from '../ApplicationState/ApplicationState'
import { globals } from '../../globals'
import { useHistory } from "react-router-dom";
import { ReloadAppContext } from '../../containers/LoanDetail/LoanDetail'
import { unLockApp, clearLocalStorage } from '../../utils';
import SnackBar from '../Snackbar/SnackBar'
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const search = () => {
    let history = useHistory();

    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [loanApp, setLoanApp] = React.useState({});

    const [snackBar, setSnackBar] = React.useState();
    const [snackBarVariant, setSnackBarVariant] = React.useState();
    const [snackBarMessage, setSnackBarMessage] = React.useState();

    const showSnackBar = () => {
        setSnackBar(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popupMessage, setPopupMessage] = React.useState("Enter Application ID and click on search or press enter");

    const [reload, setReload] = React.useContext(ReloadAppContext);

    function searchLoanApp() {
        if (loanApp.loanApplicationNo) {
            if (window.location.pathname.includes(globals.routes.LOANDETAIL)) {
                unLockApp();
                history.push(globals.routes.LOANDETAIL + '/' + loanApp.loanApplicationNo);
                localStorage.setItem('loanAppNo', loanApp.loanApplicationNo);
                setReload(!reload);

            } else {
                localStorage.setItem('loanAppNo', loanApp.loanApplicationNo);
                history.push(globals.routes.LOANDETAIL + '/' + loanApp.loanApplicationNo);

            }
        }
    }
    function keyPress(e) {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }

    const handleClick = event => {
        if (searchTerm) {
            setPopupMessage(<div style={{ padding: '3% 90% 3% 3%', display: 'flex' }}>
                <div className={classes.root}>
                    <CircularProgress style={{ color: "#6fb934" }} />
                </div>
                <div>
                    <Typography className="Searching">Searching...</Typography >
                </div>
            </div >);
            setAnchorEl(event.currentTarget);
            try {


                var settings = {
                    "mode": "no-cors",
                    "url": globals.api.HOST + "searchLoanApplication?loanAppNo=" + searchTerm,
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }
                }
                fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.json()
                ).then(res => {
                    if (res && res.mvStatus !== globals.state.INITIATED) {
                        setLoanApp(res);
                        setPopupMessage(
                            <div style={{ padding: '3% 3% 3% 3%', display: 'flex', color: '#000000', verticalAlign: 'text-bottom' }}>
                                <div style={{ marginRight: '2%', fontWeight: '600' }}>
                                    <Typography>MV{res.loanApplicationNo}</Typography>
                                </div>
                                <div style={{ marginRight: '1%', letterSpacing: '0.25px' }}>
                                    <Typography>{(res.firstName) ? (res.firstName + " ") : (null) + (res.middleName) ? (res.middleName + " ") : (null) + (res.lastName) ? (res.lastName + " ") : (null)}</Typography>
                                </div>
                                <div style={{ marginRight: '1%', marginLeft: '1%' }}>
                                    <ApplicationState state={res.mvStatus} />
                                </div>
                            </div>
                        );
                    } else if (res.response === "Either token is invalid or token expired") {
                        setSnackBarMessage("Session Expired,try signing again");
                        setSnackBarVariant("warning");
                        showSnackBar();
                        unLockApp();
                        setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry);
                    } else {
                        setPopupMessage(
                            <div style={{ padding: '5% 80% 5% 5%', color: '#000000', width: '402px' }}>
                                <Typography> No results found...</Typography>
                            </div>
                        );
                    }
                });

            } catch (e) {
                console.log(e);
            }
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (

        <div className="search" >
            <Popover
                anchorReference="anchorPosition"
                anchorPosition={{ top: 52, left: 1500 }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div onClick={searchLoanApp} style={{ cursor: 'pointer' }}>
                    {popupMessage}
                </div>
            </Popover>
            <input type="text" onKeyDown={keyPress} onChange={e => { setSearchTerm(e.target.value); if (e.target.length === 12) { handleClick(); } }} className="searchTerm" placeholder="Search by Loan Application Number" />
            <button type="submit" className="searchButton" onClick={handleClick}>
                <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
            </button>
            <SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} />
        </div>


    );
}

export default search;