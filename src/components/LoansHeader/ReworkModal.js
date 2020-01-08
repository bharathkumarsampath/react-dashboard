import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import './LoansHeader.css'
import CheckBox from '../../components/CheckBox/CheckBox'
import { useStyles, BootstrapButton, ModalButton } from './LoansHeaderStyles'
import { rework, api } from '../../globals'

const ReworkModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    var [checkBoxArray, setCheckBoxArray] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [otherReasons, setOtherReasons] = React.useState();
    const checkBoxObject = rework.REASONS;


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    async function markRework() {
        var Reasons = rework.REASONS_ARRAY;
        var remarks = "";
        for (var i = 0; i < Reasons.length; i++) {
            remarks = remarks + ((checkBoxArray[i] === 1) ? (Reasons[i] + ", ") : (""));
        }
        if (otherReasons) {
            remarks = remarks + otherReasons;
        } else {
            remarks = remarks.substring(0, remarks.length - 2);
        }
        console.log("remarks : " + remarks);
        handleClose();

        var settings = {
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
            body: JSON.stringify({ remarks: remarks })
        }).then(res => res.json()
        ).then(res => {
            console.log('mark rework', res);

        });

        setOtherReasons("");
        setCheckBoxArray([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return (
        <div>
            <div style={{ marginLeft: '53vw' }}>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleOpen}>
                    RE-WORK
                </BootstrapButton>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                    APPROVE
                </BootstrapButton>
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
                        <div styles={{ height: '200px', overflowY: 'scroll' }}>
                            {checkBoxObject.map(checkBoxElem => (
                                <CheckBox text={checkBoxElem.text} value={checkBoxElem.value} key={checkBoxElem.value} checkBoxArray={checkBoxArray} setCheckBoxArray={setCheckBoxArray} />
                            ))}
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