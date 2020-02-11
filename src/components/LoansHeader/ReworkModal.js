import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import CheckBox from '../../components/CheckBox/CheckBox'
import { useStyles, ModalButton } from './LoansHeaderStyles'
import { globals } from '../../globals'
import { ReloadAppContext } from '../../containers/LoanDetail/LoanDetail'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { unLockApp, clearLocalStorage } from '../../utils'
const ReworkModal = (props) => {
    let history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [otherReasons, setOtherReasons] = React.useState();
    const checkBoxObject = JSON.parse(localStorage.getItem("reworkReasons") || "[]");
    const [reload, setReload] = React.useContext(ReloadAppContext);

    const handleClose = () => {
        setOpen(false);

    };
    const handleOpen = () => {
        setOpen(true);
        // console.log("checkbox object ", checkBoxObject.length);
    };

    const [checkedItems, setCheckedItems] = React.useState({});

    const handleChange = event => {

        // console.log("checkedItems: ", checkedItems);
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
    };


    async function markRework() {
        var remarks = "";
        Object.keys(checkedItems).forEach((key, index) => {
            if (checkedItems[key]) {
                remarks = remarks + key.toString() + ",";
            }

        })
        if (otherReasons) {
            remarks = remarks + otherReasons;
        } else {
            remarks = remarks.substring(0, remarks.length - 2);
        }
        if (remarks) {
            handleClose();

            var settings = {
                "mode": "no-cors",
                "crossDomain": true,
                "url": globals.api.HOST + "markRework",
            }

            await fetch(settings.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token'),
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    agent_id: localStorage.getItem("agentName"),
                    loan_application_no: props.LoanApp.loanApplicationNo,
                    old_status: props.LoanApp.mvStatus,
                    new_status: globals.state.RE_WORK,
                    remarks: remarks,
                    clix_application_id: props.LoanApp.clixApplicationId
                })
            }).then(res => res.text()
            ).then(res => {
                // console.log('mark rework', res);
                if (res === "Success") {
                    props.setSnackBarMessage("Application successfully marked Rework");
                    props.setSnackBarVariant("success");
                    props.showSnackBar();
                    setReload(!reload);
                    unLockApp(props.LoanApp.mvStatus);
                } else if (res.response === "Either token is invalid or token expired") {
                    props.setSnackBarMessage("Session Expired,try signing again");
                    props.setSnackBarVariant("warning");
                    props.showSnackBar();
                    unLockApp(props.LoanApp.mvStatus);
                    setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry);
                } else {
                    props.setSnackBarMessage("Failed to mark the application as  Rework");
                    props.setSnackBarVariant("info");
                    props.showSnackBar();
                }

            });

            setOtherReasons("");
        }
    }

    async function approve() {

        var settings = {
            "mode": "no-cors",
            "crossDomain": true,
            "url": globals.api.HOST + "approve",
        }

        await fetch(settings.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                agent_id: localStorage.getItem("agentName"),
                loan_application_no: props.LoanApp.loanApplicationNo,
                old_status: props.LoanApp.mvStatus,
                new_status: globals.state.APPROVED,
                clix_application_id: props.LoanApp.clixApplicationId
            })
        }).then(res => res.text()
        ).then(res => {
            if (res === "Success") {
                props.setSnackBarMessage("Application successfully Approved");
                props.setSnackBarVariant("info");
                props.showSnackBar();
                setReload(!reload);
                unLockApp(props.LoanApp.mvStatus);
            } else if (res.response === "Either token is invalid or token expired") {
                props.setSnackBarMessage("Session Expired,try signing again");
                props.setSnackBarVariant("warning");
                props.showSnackBar();
                unLockApp(props.LoanApp.mvStatus);
                setTimeout(function () { clearLocalStorage(); history.push(globals.routes.HOME) }, globals.messageDisplayTime.sessionExpiry); //add unlock app function
            } else {
                props.setSnackBarMessage("Failed to approve the application");
                props.setSnackBarVariant("info");
                props.showSnackBar();
            }

        });

        props.LoanApp.loanApplicationNo = undefined;
    }
    return (
        <div>

            <div>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    className={classes.margin}
                    onClick={handleOpen} style={{ width: '146px', height: '40px' }}>RE-WORK
                            </Button >
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={approve} style={{ width: '150px', height: '40px' }}>APPROVE
                            </Button >
            </div>
            <div style={{ display: 'flex', marginTop: '0.2rem', backgroundColor: 'white' }}>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                    className={classes.reworkModal}
                >

                    <div className={classes.paperone}>
                        <Typography variant="h6" gutterBottom>
                            Re-Work Application
                    </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please select the reason for re-work
                    </Typography>
                        <div styles={{ maxHeight: '200vh' }} >
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {(checkBoxObject) ? (checkBoxObject.slice(0, 8).map(checkBoxElem => (
                                        <CheckBox handleChange={handleChange}
                                            text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value}
                                            checked={checkedItems[checkBoxElem.text]}
                                        />
                                    ))) : (null)}
                                </div>
                                <div>
                                    {(checkBoxObject && checkBoxObject.length > 8) ? (checkBoxObject.slice(8, 16).map(checkBoxElem => (
                                        <CheckBox handleChange={handleChange}
                                            text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value}
                                            checked={checkedItems[checkBoxElem.text]}
                                        />
                                    ))) : (null)}
                                </div>
                                <div>
                                    {(checkBoxObject && checkBoxObject.length > 16) ? (checkBoxObject.slice(16, 25).map(checkBoxElem => (
                                        <CheckBox handleChange={handleChange}
                                            text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value}
                                            checked={checkedItems[checkBoxElem.text]}
                                        />
                                    ))) : (null)}
                                </div>
                            </div>
                            {/* {(checkBoxObject) ? (checkBoxObject.map(checkBoxElem => (
                                <CheckBox handleChange={handleChange}
                                    text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value}
                                    checked={checkedItems[checkBoxElem.text]}
                                />
                            ))) : (null)} */}


                            <div className={classes.textArea}>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows="4"
                                    label="Please specify other reasons if any"
                                    variant="outlined"
                                    onChange={e => setOtherReasons(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <ModalButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={markRework}>
                            SUBMIT
                    </ModalButton>
                        <ModalButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleClose}>
                            CANCEL
                    </ModalButton>
                    </div>
                </Modal>

            </div>

        </div>
    );
}

export default ReworkModal;