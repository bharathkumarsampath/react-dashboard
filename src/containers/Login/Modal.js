import React from "react";
import { Button, Dialog, DialogActions, DialogTitle, Link } from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField'
import { useModal } from 'react-modal-hook';
import { ModalButton } from '../../components/LoansHeader/LoansHeaderStyles'
import { api } from '../../globals'


const Modal = () => {

    const [otherReasons, setOtherReasons] = React.useState();
    async function resetPassword() {
        try {
            var settings = {
                "url": api.HOST + "forgotpassword?username=clix&email=bharaths223@gmail.com",
            }
            fetch(settings.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }

            }).then(res => res.text())
                .then(response => {
                    console.log("res ", JSON.stringify(response));
                    if (String(response) === "Password reset status successfull") {
                        console.log("password reset successfull");
                    } else if (String(response) === "Username entered is not valid") {
                        console.log("Username entered is not valid");
                    } else {
                        console.log("Something went wrong please try again later");
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
                        Enter the Email ID associated with the account.We will send the new password to the email provided.
            </DialogContentText >
                    <TextField
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="email"
                        style={{ width: '60%' }}
                    />
                </DialogContent>


                <div>
                    <ModalButton onClick={resetPassword} variant="contained" color="primary" disableRipple style={{ width: '60%', marginTop: '5%' }}>
                        RESET PASSWORD
                    </ModalButton>
                </div>
                <div>
                    <ModalButton onClick={hideModal} variant="contained" color="primary" disableRipple style={{ width: '60%', marginTop: '5%', marginBottom: '5%' }}>
                        BACK TO LOGIN PAGE
                    </ModalButton>
                </div>


            </Dialog>
        </div>
    ));

    return <Link onClick={showModal}>Forget password</Link>;
};

export default Modal;