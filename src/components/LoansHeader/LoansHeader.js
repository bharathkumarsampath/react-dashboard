import React, { useState } from 'react';
import Search from '../../components/Search/Search'
import '../../components/Search/Search.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Select from '../../components/Select/Select'
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Loader from '../Spinner/Spinner'


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows['none'],
        padding: theme.spacing(2, 4, 3),
    },
}));

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        borderColor: 'rgb(113,184,62)',
        color: 'rgb(113,184,62)',
        padding: '0.5rem 2.3rem 0.5rem 2.3rem',
        fontWeight: 'bolder',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: 'rgb(113,184,62)',
            borderColor: 'rgb(113,184,62)',
            boxShadow: 'none',
            color: 'white'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgb(113,184,62)',
            borderColor: 'rgb(113,184,62)',
            color: 'white'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const ModalButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color: 'rgb(113,184,62)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: 'rgb(113,184,62)',
            color: 'white',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgb(113,184,62)',
            color: 'white',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const LoansHeader = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectChange = event => {
        setSelectedValue(event.target.value);
    };
    return (
        <div className="toolbar" style={{ display: "flex", marginTop: '0.2rem', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'left', paddingLeft: '2%', paddingTop: '1%', color: 'grey', cursor: 'pointer' }} onClick={history.goBack}>
                <ArrowBackIcon />
            </div>
            <div style={{ paddingLeft: '1%', paddingTop: '1%' }}>
                <Typography variant="body2" gutterBottom style={{ height: '30px', width: '235px', color: '#000000', fontSize: '20px', fontWeight: '600' }}>
                    LAN - MV{props.LoanApp.loanApplicationNumber}
                </Typography>
            </div>
            <div style={{ marginLeft: '47rem' }}>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleOpen}>
                    RE-WORK
                </BootstrapButton>
                <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                    APPROVE
                </BootstrapButton>
            </div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper} style={{ width: '384px', borderRadius: '8px', boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)' }}>
                    <Typography variant="h6" gutterBottom>
                        Re-Work Application
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please select the reason for re-work
                    </Typography>
                    <Select value={selectedValue} handleSelectChange={handleSelectChange} />
                    {(selectedValue == 2) ? (
                        <TextField
                            placeholder="Please specify other reasons"
                            multiline
                            rows="4"
                            rowsMax={10}
                            width={100}
                            variant="outlined"
                            labelWidth={40}
                        />
                    ) : (null)}
                    <br />
                    <ModalButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleClose}>
                        SUBMIT
                    </ModalButton>
                    <ModalButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={handleClose}>
                        CANCEL
                    </ModalButton>
                </div>
            </Modal>

        </div>
    );
}

export default LoansHeader;