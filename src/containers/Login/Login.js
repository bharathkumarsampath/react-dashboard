import React from 'react';
import $ from 'jquery';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AWS from 'aws-sdk';


const Login = () => {

    let history = useHistory();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const variantIcon = {
        success: CheckCircleIcon,
        warning: WarningIcon,
        error: ErrorIcon,
        info: InfoIcon,
    };

    const useStyles1 = makeStyles(theme => ({
        success: {
            backgroundColor: green[600],
        },
        error: {
            backgroundColor: theme.palette.error.dark,
        },
        info: {
            backgroundColor: theme.palette.primary.main,
        },
        warning: {
            backgroundColor: amber[700],
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing(1),
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
    }));

    function MySnackbarContentWrapper(props) {
        const classes = useStyles1();
        const { className, message, onClose, variant, ...other } = props;
        const Icon = variantIcon[variant];

        return (
            <SnackbarContent
                className={clsx(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        );
    }

    MySnackbarContentWrapper.propTypes = {
        className: PropTypes.string,
        message: PropTypes.string,
        onClose: PropTypes.func,
        variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    };

    const useStyles2 = makeStyles(theme => ({
        margin: {
            margin: theme.spacing(1),
        },
    }));


    const style = {
        border: '1px solid #ccc',
        padding: '13px 10px',
        boxSizing: 'border-box',
        borderRadius: '5px',
        width: '75%',
        height: '15%',
        fontSize: '100%',
        backgroundColor: 'rgb(244,244,244)',
        marginBottom: '3%'
    };
    const classes = useStyles2();
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleClickSuccess = () => {


        setOpenSuccess(true);
        // history.push("/dashboard");
        setTimeout(function () { //Start the timer
            history.push("/dashboard"); //After 1 second, set render to true
        }.bind(this), 1000)
        // navigate('/dashboard')
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
    };
    const handleClickInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenInfo(false);
    };
    function authentication() {

        console.log("authentication function ");

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/services/api/clix/portal/gettoken?username=" + username + "&password=" + password,
            "method": "GET",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        fetch(settings.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            // .then(response => response.json())
            .then(res => res.text())          // convert to plain text
            // .then(text => console.log(" text " + text))
            .then(response => {
                console.log("ajax call starting " + response);
                if (response == "please provide valid credentials") {
                    //handleClick();
                    console.log("please provide valid credentials");
                    handleClick();
                } else if (response == "Please try again later") {
                    console.log("Please try again later");
                    handleClickInfo();
                } else {
                    console.log("logged in " + response);
                    localStorage.setItem('token', response);
                    handleClickSuccess();
                }
            });


        // $.ajax(settings).done(function (response) {
        //     console.log("ajax call starting");
        //     if (response == "please provide valid credentials") {
        //         //handleClick();
        //         console.log("please provide valid credentials");
        //         handleClick();
        //     } else if (response == "Please try again later") {
        //         console.log("Please try again later");
        //         handleClickInfo();
        //     } else {
        //         console.log("logged in " + response);
        //         localStorage.setItem('token', response);
        //         handleClickSuccess();
        //     }
        // });

    }
    return (

        <div style={{ backgroundColor: 'rgb(252,252,252)' }}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    fontSize: '20%'
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="error"
                    className={classes.margin}
                    message="please provide valid credentials"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    fontSize: '20%'
                }}
                open={openSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
            >
                <MySnackbarContentWrapper
                    onClose={handleCloseSuccess}
                    variant="success"
                    className={classes.margin}
                    message="successfully logged in"
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    fontSize: '20%'
                }}
                open={openInfo}
                autoHideDuration={3000}
                onClose={handleCloseInfo}
            >
                <MySnackbarContentWrapper
                    onClose={handleCloseInfo}
                    variant="info"
                    className={classes.margin}
                    message="Please try again later"
                />
            </Snackbar>
            <div style={{
                display: 'block-inline',
                border: '1px solid rgb(231,231,231)',
                marginLeft: '37%',
                marginRight: '37%',
                marginTop: '5%',
                borderRadius: '5px',
                paddingTop: '2%',
                paddingBottom: '4%'
            }}>
                <h3 style={{ textAlign: 'left', marginLeft: '13%', marginBottom: '7%', color: 'rgb(108,108,108)' }}>Sign In</h3>
                <input style={style} type="text" placeholder="Username" onInput={e => setUsername(e.target.value)} /> <br />
                <input style={style} type="password" placeholder="Passsword" onInput={e => setPassword(e.target.value)} /> <br />
                <div style={{ marginTop: '1%', textAlign: 'left', marginLeft: '13%' }}>
                    <a style={{ color: 'rgb(131,195,230)', textDecoration: 'underline', marginLeft: '1%', fontWeight: '500' }}>Forgot Password?</a>
                    <button style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px', backgroundColor: 'rgb(22,139,207)',
                        marginLeft: '37%',
                        color: 'white',
                        padding: '3% 4%',
                        fontSize: '100%',
                        cursor: 'pointer'

                    }} onClick={authentication}>SIGN IN</button>
                </div>
            </div >
        </div>
    );
}

export default Login;