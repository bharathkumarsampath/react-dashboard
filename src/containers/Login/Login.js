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


const Login = () => {


    let history = useHistory();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const classes = useStyles();

    const navigateToDashboard = () => {
        setTimeout(function () { //Start the timer
            history.push("/dashboard"); //After 1 second, set render to true
        }, 1000)
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
                if (response === "please provide valid credentials") {
                    //handleClick();
                    console.log("please provide valid credentials");
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

            <div className={classes.bgcolor}
            // style={{ backgroundColor: 'rgb(252,252,252)' }}
            >
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

                                    />

                                    <Grid container>
                                        <Grid item xs>
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                        </Grid>
                                        <Grid item className={classes.topmrgn} >
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