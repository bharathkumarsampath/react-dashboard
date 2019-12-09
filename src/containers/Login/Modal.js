import React from "react";
import { useModal } from "react-modal-hook";
import { Button, Dialog, DialogActions, DialogTitle, Link } from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField'

 
const Modal = () => {
  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited}>
      <DialogTitle>Forgot password ?</DialogTitle>

      <DialogContent>
          <DialogContentText>
          Enter the email associated with the account.we will send new password.
          </DialogContentText>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
    
        <DialogActions>
          <div>
            <Button onClick={hideModal}>RESET PASSWORD</Button>
          </div>
        </DialogActions>
        <DialogActions>
        <div>
          <Link href="#">BACK TO LOGIN PAGE</Link>
          </div> 
        </DialogActions>
          
      
    </Dialog>
  ));
 
  return <Link onClick={showModal}>Forget password</Link>;
};

export default Modal;