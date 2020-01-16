import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import useStyles from './Login-style'
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
                if (response === "please provide valid credentials") {
                    console.log("please provide valid credentials");
                    setError(true);
                } else if (response === "Please try again later") {
                    console.log("Please try again later");
                } else {
                    localStorage.setItem('token', response);
                    localStorage.setItem('agentName', username);
                    navigateToDashboard();
                }
            });

    }
    return (
        <div>
            <AppBar className={classes.appbarColor} elevation={0}>
                <div className={classes.appbarDim} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="50" viewBox="0 0 181 32" alt="clix logo">
                        <g fill="none" fillRule="evenodd">
                            <path fill="#72BA43" d="M29.843 16c0-7.623-6.22-13.843-13.843-13.843C8.378 2.157 2.157 8.377 2.157 16S8.377 29.843 16 29.843c7.658 0 13.843-6.22 13.843-13.843M16 0c8.809 0 16 7.191 16 16 0 8.809-7.191 16-16 16-8.81 0-16-7.155-16-16C0 7.155 7.19 0 16 0" />
                            <path fill="#71BA44" d="M17 14.5c0-.278-.203-.5-.405-.5h-2.149c-.243 0-.446.222-.446.5s.203.5.446.5h2.149c.202 0 .405-.222.405-.5m0-1c0-.278-.203-.5-.405-.5h-2.149c-.243 0-.446.222-.446.5s.203.5.446.5h2.149c.202 0 .405-.222.405-.5m4 1c0-.278-.203-.5-.446-.5h-2.149c-.243 0-.405.222-.405.5s.203.5.405.5h2.149c.243 0 .446-.222.446-.5m0-1.004c0-.276-.203-.496-.446-.496h-2.149c-.243 0-.405.22-.405.496 0 .275.203.496.405.496h2.149c.243.055.446-.166.446-.496m0-.996c0-.278-.203-.5-.446-.5h-2.149c-.243 0-.405.222-.405.5s.203.5.405.5h2.149c.243 0 .446-.222.446-.5m0-1c0-.278-.203-.5-.446-.5h-2.149c-.243 0-.405.222-.405.5s.203.5.405.5h2.149c.243 0 .446-.222.446-.5m4.237 5.08c.61-.243.763-.486.763-.73 0-.365-.229-.527-.229-.527-.19-.243-.763-.324-1.22-.243-.23.04-3.587 1.054-3.587 1.054.076.325.267.852-.306 1.46-.381.365-.991.446-1.754.446s-1.603-.122-2.252-.203c-.19-.04-.8-.121-.8-.121s.419-.203.953-.203c.687-.04 1.221 0 1.564 0 .344.04.84.08 1.069.08.954.042 1.182-.567 1.182-.85 0-.69-.381-.933-1.564-1.014-.763-.081-1.602-.122-2.175-.203-1.106-.122-1.907-.446-2.327-.487-.267-.04-.992-.162-1.679.406C10.777 17.229 7 18.324 7 18.324 7.572 20.27 10.7 21 10.7 21c1.336-1.257 2.824-1.379 4.083-1.46.229 0 2.327 0 4.311.244.382.04.725-.203.725-.203 2.9-1.946 5.418-3 5.418-3M16 3c7.193 0 13 5.807 13 13s-5.807 13-13 13S3 23.193 3 16 8.844 3 16 3" />
                            <path fill="#4D4D4D" d="M40 16h.75v8.298H45V25h-5zM51.5 15.754c-2.25 0-3.667 1.782-3.667 4.246 0 2.435 1.417 4.247 3.667 4.247 2.222 0 3.667-1.812 3.667-4.247 0-2.464-1.445-4.246-3.667-4.246m0-.754c2.708 0 4.5 2.174 4.5 5s-1.792 5-4.5 5c-2.722 0-4.5-2.174-4.5-5s1.778-5 4.5-5M58.174 22.085h4.653l-2.334-5.33-2.32 5.33zm4.915.702h-5.178L56.934 25H56l3.982-9h1.036L65 25h-.933l-.978-2.213zM67.856 17.228V25H67v-9h.87l6.275 7.664V16H75v9h-.84zM77.539 22.84c.625.725 1.644 1.406 3.026 1.406 1.994 0 2.562-1.101 2.562-1.927 0-1.362-1.295-1.74-2.663-2.102-1.528-.42-3.158-.855-3.158-2.637 0-1.58 1.426-2.58 3.187-2.58 1.455 0 2.532.507 3.289 1.362l-.553.61c-.699-.842-1.688-1.219-2.78-1.219-1.295 0-2.27.74-2.27 1.783 0 1.145 1.208 1.478 2.532 1.826 1.572.45 3.289.942 3.289 2.899C84 23.507 83.17 25 80.55 25c-1.6 0-2.808-.638-3.55-1.536l.539-.623zM60.255 8.4l1.382 3.48 1.366-3.48h.464l-1.963 4.858c-.204.503-.526.742-.974.742-.125 0-.298-.025-.4-.058l.07-.396a.902.902 0 0 0 .33.066c.251 0 .424-.107.573-.486l.299-.71L59.8 8.4h.455zm-12.559 0c1.128 0 1.837.928 1.837 2.096 0 1.168-.71 2.104-1.837 2.104-1.112 0-1.83-.936-1.83-2.104 0-1.168.718-2.096 1.83-2.096zm5.058 0c.76 0 1.18.408 1.18 1.332V12.6h-.404V9.825c0-.789-.365-1.026-.908-1.026-.481 0-.978.33-1.219.704V12.6H51V8.502h.403v.62c.272-.357.808-.722 1.35-.722zm4.5 0c1.169 0 1.813.97 1.813 2.12v.117h-3.214c.04.87.597 1.59 1.504 1.59.485 0 .93-.19 1.256-.555l.215.282c-.382.414-.867.646-1.503.646-1.122 0-1.925-.87-1.925-2.104 0-1.16.787-2.096 1.853-2.096zm17.6 0c1.169 0 1.813.97 1.813 2.12v.117h-3.214c.04.87.597 1.59 1.504 1.59.485 0 .93-.19 1.256-.555l.215.282c-.382.414-.867.646-1.503.646-1.122 0-1.925-.87-1.925-2.104 0-1.16.787-2.096 1.853-2.096zm-34.255-.7l1.601 4.063L43.794 7.7h.606v4.9h-.409V8.25l-1.713 4.35h-.156l-1.72-4.35v4.35H40V7.7h.6zm25.538 0l1.726 4.43 1.733-4.43h.47l-1.946 4.9h-.506l-1.947-4.9h.47zm6.001.707V12.6h-.476V8.407h.476zm5.801-.007l1.234 3.565 1.31-3.565h.434l1.31 3.565L83.46 8.4H84l-1.513 4.2h-.482l-1.3-3.591-1.31 3.591h-.482L77.4 8.4h.54zm-30.243.39c-.883 0-1.388.82-1.388 1.706 0 .895.505 1.714 1.388 1.714.899 0 1.396-.82 1.396-1.714 0-.887-.497-1.706-1.396-1.706zm9.55-.017c-.907 0-1.36.828-1.393 1.524h2.792c-.008-.68-.437-1.524-1.4-1.524zm17.6 0c-.907 0-1.36.828-1.393 1.524h2.792c-.008-.68-.437-1.524-1.4-1.524zM71.9 7c.202 0 .367.156.367.347a.359.359 0 0 1-.367.348c-.193 0-.367-.157-.367-.348 0-.19.174-.347.367-.347z" />
                            <g>
                                <path fill="#BAABC7" d="M110.067 1.894l.866.5-16 27.712-.866-.5z" />
                                <path fill="#4D6EB5" d="M146.926 20.358h-6.361a.394.394 0 0 1-.395-.394l-.57-10.41a.394.394 0 0 0-.394-.393h-2.746a.394.394 0 0 0-.395.393v13.898c0 .217.177.394.395.394h8.567c.11 0 .215-.046.288-.127l1.9-2.7a.394.394 0 0 0-.289-.661" />
                                <path fill="#A42382" d="M154.93 9.052h-4.24a.197.197 0 0 0-.154.321c1.163 1.429 5.204 6.778 5.204 6.778.175.277.125.466 0 .705l-4.754 6.79c-.091.13.002.308.162.308h3.892c.056 0 .11-.023.147-.065.586-.66 5.373-6.086 5.391-7.385.018-1.402-4.91-6.751-5.504-7.39a.197.197 0 0 0-.144-.062" />
                                <path fill="#DF1669" d="M175.37 16.851a.512.512 0 0 1 0-.695l4.677-6.135a.513.513 0 0 0-.377-.86h-3.353a.513.513 0 0 0-.377.165l-3.958 4.29a.395.395 0 0 1-.58 0l-3.993-4.328a.39.39 0 0 0-.288-.126h-3.409c-.446 0-.68.53-.376.86l4.677 6.134a.512.512 0 0 1 0 .695l-4.677 6.136a.511.511 0 0 0 .376.859h3.409a.39.39 0 0 0 .288-.126l3.907-4.235a.51.51 0 0 1 .752 0l3.907 4.235c.075.08.18.126.29.126h3.405c.446 0 .68-.531.377-.859l-4.676-6.136z" />
                                <path fill="#1690D0" d="M125.675 12.589h5.729a.394.394 0 0 0 .312-.634l-2.067-2.687a.513.513 0 0 0-.404-.197h-3.653v.001c-5.218.05-9.192 2.724-9.192 7.356 0 4.772 3.97 7.509 9.173 7.509h3.649a.512.512 0 0 0 .404-.198l2.07-2.687a.393.393 0 0 0-.31-.633h-5.828c-2.287 0-4.626-.474-4.626-3.991 0-1.783.542-3.828 4.743-3.84" />
                            </g>
                        </g>
                    </svg>
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