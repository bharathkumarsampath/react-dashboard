import React from "react";
import { Dialog, DialogTitle, Link, Typography } from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField'
import { useModal } from 'react-modal-hook';
import Button from '@material-ui/core/Button';
import { globals } from '../../globals'
import SnackBar from '../../components/Snackbar/SnackBar'

const Modal = (props) => {

    const [snackBar, setSnackBar] = React.useState();
    const [snackBarVariant, setSnackBarVariant] = React.useState();
    const [snackBarMessage, setSnackBarMessage] = React.useState();

    function updateUsername(username) {
        localStorage.setItem('username', username)

    }
    const showSnackBar = () => {
        setSnackBar(true);
    };

    const hideSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };
    async function resetPassword() {
        try {
            var settings = {
                "url": globals.api.HOST + "forgotpassword?username=" + localStorage.getItem('username'),
            }
            fetch(settings.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }

            }).then(res => res.text())
                .then(response => {
                    // console.log("res ", JSON.stringify(response));
                    if (String(response) === "Password reset status successful") {
                        console.log("password reset successfull");
                        setSnackBarMessage("Notification to reset password was sent to admin successfully");
                        setSnackBarVariant("success");
                        showSnackBar();

                    } else if (String(response) === "Username entered is not valid") {
                        console.log("Username entered is not valid");
                        setSnackBarMessage("Username entered is not valid");
                        setSnackBarVariant("info");
                        showSnackBar();
                    } else {
                        console.log("Something went wrong please try again later");
                        setSnackBarMessage("Something went wrong please try again later");
                        setSnackBarVariant("warning");
                        showSnackBar();
                    }
                });

        } catch (e) {
            console.log(e);
        }
        hideModal();
    }
    const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
        <div>
            <Dialog open={open} onExited={onExited} className="alignCenter">
                <DialogTitle>Forgot password ?</DialogTitle>

                <DialogContent >
                    <DialogContentText>
                        Enter the Email ID associated with the account.We will send the new password to the below email provided.
            </DialogContentText >
                    <br />
                    <TextField
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="email"
                        style={{ width: '60%' }}
                        onChange={e => updateUsername(e.target.value)}
                    />
                </DialogContent>


                <div>
                    <Button onClick={resetPassword} variant="contained" color="primary" disableRipple style={{ width: '60%', marginTop: '5%' }}>
                        RESET PASSWORD
                    </Button>
                </div>
                <div>
                    <Button onClick={hideModal} variant="outlined" color="primary" disableRipple style={{ width: '60%', marginTop: '5%', marginBottom: '5%' }}>
                        BACK TO LOGIN PAGE
                    </Button>
                </div>


            </Dialog>

        </div>
    ));

    return <React.Fragment><Link onClick={showModal}>Forgot password</Link><SnackBar message={snackBarMessage} variant={snackBarVariant} snackBar={snackBar} showSnackBar={showSnackBar} hideSnackBar={hideSnackBar} /></React.Fragment>;
};

export default Modal;