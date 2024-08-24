import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { globals } from '../../globals';
import { unLockApp, clearLocalStorage } from '../../utils';
import { useHistory } from "react-router-dom";

export default function PennyDropCheckModal(props) {

    let history = useHistory();

    const [isFetching, setIsFetching] = React.useState(false);
    const [pennyDrop, setPennyDrop] = React.useState({});
    const [pennyDropError, setPennyDropError] = React.useState('');

    useEffect(() => {

        const fetchUsers = async () => {
            setIsFetching(true);
            try {
                var settings = {
                    "mode": "no-cors",
                    "url": globals.api.HOST + "getPennyDrop?loanAppNo=" + props.loanApp.loanApplicationNo,
                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.json()
                ).then(res => {
                    if (res.response === "Loan application number is not valid" || res.response === "No successful transaction record found") {
                        console.log("Loan application number is not valid");
                        setPennyDropError(res.response);
                    } else if (res.response === "Either token is invalid or token expired") {
                        console.log("Either token is invalid or token expired");
                        unLockApp(props.loanApp.mvStatus);
                        setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime);
                    } else {
                        setPennyDrop(JSON.parse(res.response));
                    }
                });



            } catch (e) {
                console.log(e);
            }
            setIsFetching(false);


        };
        fetchUsers();
    }, []);


    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Penny Drop Info"}</DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "left", paddingLeft: "25px" }}>
                        {
                            (isFetching) ? ("Loading") : (
                                (pennyDropError) ?
                                    (

                                        pennyDropError
                                    ) : (

                                        <React.Fragment>
                                            <span style={{ textAlign: "left" }}><b>Timestamp:</b> {pennyDrop.dateCreated}</span><br /><br />
                                            <span style={{ textAlign: "left" }}><b>Penny drop id:</b> {pennyDrop.id}</span><br /><br />
                                        </React.Fragment>
                                    )
                            )
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
