import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import useStyles from './Login-style'
import clixLogo from '../../assets/images/1B.png';
import AppBar from '@material-ui/core/AppBar';
import { Checkbox, Grid, TextField, Typography, FormControlLabel } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import logImage from '../../assets/images/login_bg.png';
import ForgotPasswordModal from './Modal';
import { api } from '../../globals'

const Login = () => {


    let history = useHistory();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const classes = useStyles();

    const navigateToDashboard = () => {
        history.push("/dashboard"); //After 1 second, set render to true
    };

    function authentication() {

        var settings = {
            "mode": "no-cors",
            "async": true,
            "crossDomain": true,
            "url": api.HOST + "gettoken?username=" + username + "&password=" + password,
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
            .then(res => res.text())
            .then(response => {
                console.log("ajax call starting " + response);
                if (response === "please provide valid credentials") {
                    console.log("please provide valid credentials");
                    setError(true);
                } else if (response === "Please try again later") {
                    console.log("Please try again later");
                } else {
                    console.log("logged in " + response);
                    localStorage.setItem('token', response);
                    navigateToDashboard();
                }
            });

    }
    return (
        <div>
            <AppBar className={classes.appbarColor} elevation={0}>
                <div className={classes.appbarDim} >
                    <img src={clixLogo} className={classes.LogoDimension} alt="clix logo" />
                </div>
            </AppBar>

            <div className={classes.bgcolor}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.loginBox}>
                            <Box className={classes.vb}></Box>

                            <Typography component="h3" variant="h5" align="left">
                                Welcome Back !
                    </Typography>
                            <Typography variant="body1" align="left">
                                {'Please sign in to view approve or reject the loan application '}
                            </Typography>

                            <CssBaseline />
                            <Box mt={2}>
                            </Box>
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Sign in
                    </Typography>

                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Email Address"
                                        name="username"
                                        //   onChange= { handleOnchange }
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="UserName"
                                        onChange={e => setUsername(e.target.value)}
                                        error={error}

                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        //   onChange = { handleOnchange }
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        onChange={e => setPassword(e.target.value)}
                                        error={error}
                                    />

                                    <Grid container>
                                        <Grid item xs>
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                        </Grid>
                                        <Grid item className={classes.topmrgn} >

                                            <ForgotPasswordModal />
                                        </Grid>
                                    </Grid>


                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={authentication}>Sign In
                            </Button >
                                </form>
                            </div>
                        </div >
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.mrgnImage}>
                            <img src={logImage} alt="logImage" />
                        </div>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default Login;