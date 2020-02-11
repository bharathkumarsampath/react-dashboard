import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { globals } from '../../globals';
import { unLockApp, clearLocalStorage } from '../../utils'
import { useHistory } from "react-router-dom";

export default function NsdlCheckModal(props) {

    let history = useHistory();

    const [isFetching, setIsFetching] = React.useState(false);
    const [nsdlCheck, setNsdlCheck] = React.useState({});
    const [nsdlCheckError, setNsdlCheckError] = React.useState('');

    useEffect(() => {

        const fetchUsers = async () => {
            setIsFetching(true);
            try {
                var settings = {
                    "mode": "no-cors",
                    "url": globals.api.HOST + "getPanStatus?loanAppNo=" + props.loanApp.loanApplicationNo,
                }
                await fetch(settings.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": localStorage.getItem('token')
                    }

                }).then(res => res.json()
                ).then(res => {
                    if (res.response === "Loan Application is not found in clix" || res.response === "NSDL status not approved"
                        || res.response === "Either the pan is not present or its last fetch was more than 30 days") {
                        setNsdlCheckError(res.response);
                    } else if (res.response === "Either token is invalid or token expired") {
                        console.log("Either token is invalid or token expired");
                        unLockApp(props.loanApp.mvStatus);
                        setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry);
                    } else {
                        setNsdlCheck(JSON.parse(res.response));

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
                <DialogTitle id="alert-dialog-title">{"Nsdl Check Info"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "left", paddingLeft: "25px" }}>
                        {
                            (isFetching) ? ("Loading...") : (
                                (nsdlCheckError) ?
                                    (

                                        nsdlCheckError
                                    ) : (

                                        <React.Fragment>
                                            <span style={{ textAlign: "left" }}><b>Timestamp:</b> {nsdlCheck.dateCreated}</span><br /><br />
                                            <span style={{ textAlign: "left" }}><b>NSDL check id:</b> {nsdlCheck.id}</span><br /><br />
                                            <span style={{ textAlign: "left" }}><b>PAN number:</b> {nsdlCheck.panNumber}</span><br /><br />
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
        </div >
    );
}
