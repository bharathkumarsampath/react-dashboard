import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css'
import { Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ApplicationState from '../ApplicationState/ApplicationState'
import { api } from '../../globals'
import { useHistory } from "react-router-dom";

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popupMessage, setPopupMessage] = React.useState("Enter Application ID and click on search or press enter");

    function searchLoanApp() {
        localStorage.setItem('loanAppNo', loanApp.loanApplicationNo);
        history.push('/userprofile');

    }

    const handleClick = event => {
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
                "url": api.HOST + "searchLoanApplication?loanAppNo=" + searchTerm,
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
                if (res) {
                    setLoanApp(res);
                    setPopupMessage(
                        <div style={{ padding: '3% 3% 3% 3%', display: 'flex', color: '#000000' }}>
                            <div style={{ marginRight: '2%', fontWeight: '600' }}>
                                <Typography>MV{res.loanApplicationNo}</Typography>
                            </div>
                            <div style={{ marginRight: '1%', letterSpacing: '0.25px', verticalAlign: 'middle' }}>
                                <Typography>{(res.firstName) ? (res.firstName + " ") : (null) + (res.middleName) ? (res.middleName + " ") : (null) + (res.lastName) ? (res.lastName + " ") : (null)}</Typography>
                            </div>
                            <div style={{ marginRight: '1%', marginLeft: '1%', verticalAlign: 'middle' }}>
                                <ApplicationState state={res.mvStatus} />
                            </div>
                        </div>
                    );
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
            <input type="text" onChange={e => { setSearchTerm(e.target.value); if (e.target.length === 12) { handleClick(); } }} className="searchTerm" placeholder="Search by Loan Application Number" />
            <button type="submit" className="searchButton" onClick={handleClick}>
                <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
            </button>

        </div>


    );
}

export default search;