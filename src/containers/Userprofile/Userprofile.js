import React, { useEffect } from 'react';
import clixLogo from '../../assets/images/clixLogo.png'
import loginImage from '../../assets/images/loginImage.png'
import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme, fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LoginIcon from '@material-ui/icons/KeyboardArrowDownSharp';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UserDetails from '../../components/UserDetails/UserDetails'
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';
const UserProfile = () => {
    //console.log("props " + JSON.stringify(props.history.location.data.loanApplicationNumber));

    const [rows, setRows] = React.useState({});

    const [fetching, setisfetching] = React.useState(false);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // if (localStorage.getItem('token') == null) {
                //     window.location.href = '/';
                // } else {
                // setRows(rows);
                // setisfetching(true);
                // // const response = await axios.get(USER_SERVICE_URL);
                // var settings = {
                //     "url": "http://lstaging2.whizdm.com/loans/services/api/clix/portal/getLoanApplication?id=" + localStorage.getItem('appNumber'),
                //     "method": "GET",
                //     "headers": {
                //         "Content-Type": "application/x-www-form-urlencoded",
                //         "token": localStorage.getItem('token')
                //     }
                // }


                // $.ajax(settings).done(function (response) {
                //     console.log('user profile');
                //     console.log(response);
                //     setRows(JSON.parse(response));
                //     setisfetching(false);
                // });
                // console.log("token in local storage " + localStorage.getItem('token'));
                //}

            } catch (e) {
                console.log(e);
                setRows(rows);
                setisfetching(false);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div>

            <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                    <img src={clixLogo} />
                </div>
                {/* <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search by mobile number or email ID" />
                    <button type="submit" className="searchButton">
                        <SearchIcon style={{ color: 'white', paddingTop: '15%' }} />
                    </button>
                </div> */}
                <img src={loginImage} style={{ height: '60%', paddingTop: '.8%', paddingLeft: '75%' }} />
                <LoginIcon style={{ paddingTop: '2%', color: 'rgb(137,137,137)' }} />

            </div>

            {/* <hr
                style={{
                    color: 'gray'
                }}
            /> */}
            <Divider />
            <div style={{ display: 'flex', color: 'grey' }}>
                <ArrowBackIosIcon style={{ paddingLeft: '2%', paddingTop: '0.9%' }} />
                <h2>Back</h2>
            </div>
            <Divider />
            <Divider />
            <UserDetails />
            <Divider />
            <Grid container>
                <Grid item style={{ backgroundColor: '', width: "100%" }} >
                    <div style={{ marginLeft: "20px", padding: "10px" }}>
                        <h4>Documents</h4>
                    </div>
                </Grid>
            </Grid>
            {/* <DocumentShow /> */}
            <Grid container>
                <Grid item style={{ backgroundColor: '', width: "100%" }} >
                    <div style={{ marginLeft: "20px", padding: "10px" }}>
                        <h4>Comment</h4>
                    </div>
                </Grid>
            </Grid>
            {/* <MessageBox /> */}

        </div>
    );
}

export default UserProfile;