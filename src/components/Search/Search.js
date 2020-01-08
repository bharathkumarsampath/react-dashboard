import React, { useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.css'
import { LoanAppContext } from '../../containers/Dashboard/Dashboard'
import { Grid, Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Loader from '../Loader/Loader';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { api } from '../../globals'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const search = () => {


    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [loanApp, setLoanApp] = React.useState({});
    const isFirstRun = useRef(true);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popupMessage, setPopupMessage] = React.useState("Enter Application ID and click on search or press enter");
    const [isFetching, setIsFetching] = React.useState(false);
    const [noResults, setNoResults] = React.useState(false);

    const handleClick = event => {
        setPopupMessage(<div style={{ padding: '3% 90% 3% 3%', display: 'flex' }}>
            <div className={classes.root}>
                <CircularProgress style={{ color: "#6fb934" }} />
            </div>
            <div>
                <Typography className="Searching">Searching...</Typography >
            </div>
        </div >);
        setIsFetching(true);
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
                console.log("search response " + res);
                if (res) {
                    setLoanApp(res);
                    setPopupMessage(
                        <div style={{ padding: '3% 3% 3% 3%', display: 'flex', color: '#000000' }}>
                            <div style={{ marginRight: '2%', fontWeight: '600' }}>
                                <Typography>MV{res.loanApplicationNumber}</Typography>
                            </div>
                            <div style={{ marginRight: '1%', letterSpacing: '0.25px', }}>
                                <Typography>{res.name}</Typography>
                            </div>
                            <div style={{ marginRight: '1%' }}>
                                <Typography>{res.userDataReviewStatus}</Typography>
                            </div>
                        </div>
                    );
                } else {
                    setNoResults(true);
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
        setIsFetching(false);

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
                <div >
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: '/userprofile',
                        state: {
                            LoanApp: loanApp
                        }
                    }}>
                        {popupMessage}
                    </Link>
                </div>
            </Popover>
            <input type="text" onChange={e => { setSearchTerm(e.target.value); if (e.target.length === 12) { handleClick(); } }} className="searchTerm" placeholder="Search by Loan ID, mobile number or email ID" />
            <button type="submit" className="searchButton" onClick={handleClick}>
                <SearchIcon style={{ color: 'white', paddingTop: '14%' }} />
            </button>

        </div>


    );
}

export default search;