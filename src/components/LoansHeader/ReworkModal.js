import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import './LoansHeader.css'
import CheckBox from '../../components/CheckBox/CheckBox'
import { useStyles, ModalButton } from './LoansHeaderStyles'
import { rework, api, state } from '../../globals'
import { ReloadAppContext } from '../../containers/Userprofile/Userprofile'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { unLockApp } from '../../utils'
const ReworkModal = (props) => {
    let history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [otherReasons, setOtherReasons] = React.useState();
    const checkBoxObject = rework.REASONS;
    const [reload, setReload] = React.useContext(ReloadAppContext);

    const handleClose = () => {
        setOpen(false);

    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [checkedItems, setCheckedItems] = React.useState({});

    const handleChange = event => {

        console.log("checkedItems: ", checkedItems);
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
    };


    async function markRework() {
        var remarks = "";
        Object.keys(checkedItems).forEach((key, index) => {
            if (checkedItems[key]) {
                remarks = remarks + key.toString() + ", ";
            }

        })
        if (otherReasons) {
            remarks = remarks + otherReasons;
        } else {
            remarks = remarks.substring(0, remarks.length - 2);
        }
        console.log("remarks : " + remarks);
        if (remarks) {
            handleClose();

            var settings = {
                "mode": "no-cors",
                "crossDomain": true,
                "url": api.HOST + "markRework",
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
                    new_status: state.REWORK,
                    remarks: (props.LoanApp.reworkReason) ? (props.LoanApp.reworkReason + "\n\n" + remarks) : (remarks),
                })
            }).then(res => res.text()
            ).then(res => {
                console.log('mark rework', res);
                if (res === "Success") {
                    props.setSnackBarMessage("Application successfully marked Rework");
                    props.setSnackBarVariant("success");
                    props.showSnackBar();
                    setReload(!reload);
                } else if (res === "Either token is invalid or token expired") {
                    props.setSnackBarMessage("Session Expired,try signing again");
                    props.setSnackBarVariant("warning");
                    props.showSnackBar();
                    unLockApp();
                    localStorage.clear();
                    setTimeout(history.push('/'), 2000);
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
            "url": api.HOST + "approve",
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
                new_status: state.APPROVED
            })
        }).then(res => res.text()
        ).then(res => {
            console.log('mark approve', res);
            if (res === "Success") {
                props.setSnackBarMessage("Application successfully Approved");
                props.setSnackBarVariant("info");
                props.showSnackBar();
                setReload(!reload);
            } else if ("Either token is invalid or token expired") {
                props.setSnackBarMessage("Session Expired,try signing again");
                props.setSnackBarVariant("warning");
                props.showSnackBar();
                unLockApp();
                localStorage.clear();
                setTimeout(history.push('/dashboard'), 2000); //add unlock app function
            } else {
                props.setSnackBarMessage("Failed to approve the application");
                props.setSnackBarVariant("info");
                props.showSnackBar();
            }
        });
    }
    return (
        <div>

            <div>
                {/* <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleOpen}>
                    RE-WORK
                </BootstrapButton> */}
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    className={classes.margin}
                    onClick={handleOpen} style={{ width: '146px', height: '40px' }}>RE-WORK
                            </Button >
                {/* <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={approve}>
                    APPROVE
                </BootstrapButton> */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={approve} style={{ width: '150px', height: '40px' }}>APPROVE
                            </Button >
            </div>
            <div className="displayFlex" style={{ marginTop: '0.2rem', backgroundColor: 'white' }}>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >

                    <div className={classes.paper} >
                        <Typography variant="h6" gutterBottom>
                            Re-Work Application
                    </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please select the reason for re-work
                    </Typography>
                        <div styles={{ height: '200px' }}>
                            {(checkBoxObject) ? (checkBoxObject.map(checkBoxElem => (
                                <CheckBox handleChange={handleChange}
                                    text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value}
                                    checked={checkedItems[checkBoxElem.text]}
                                />
                            ))) : (null)}
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